const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser");

const jwtSecret = "Thisismysecret";

//Route 1 - create a user using: POST "/api/auth/createuser". Doesn't require Auth i.e. no login required

router.post(
    "/createuser",
    [
        body("email", "Enter a valid email").isEmail(),
        body("name").isLength({ min: 3 }),
        body("password").isLength({ min: 5 }),
    ],
    async (req, res) => {

        let success = false;
        
        //if there are errors return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({success, error: errors.array() });
        }

        // check the user with this email exists already

        try {
            let user = await User.findOne({ email: req.body.email });

            if (user) {
                return res
                    .status(400)
                    .json({success, error: "Sorry a user with this email already exists" });
            }

            const salt = await bcrypt.genSalt(10);
            secPass = await bcrypt.hash(req.body.password, salt);

            user = await User.create({
                name: req.body.name,
                password: secPass,
                email: req.body.email,
            });

            // .then(user => res.json(user)).catch(err=>{
            //     console.log(err),
            //     res.json({error: 'Please enter a unique email', message : err.message})});

            const data = {
                user: {
                    id: user.id,
                },
            };

            const authtoken = jwt.sign(data, jwtSecret);
            success = true;
            res.json({success, authtoken });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
);

//Route 2 - Authenticate a user using: POST "/api/auth/login". Doesn't require Auth i.e. no login required

router.post(
    "/login",
    [
        body("email", "Enter a valid email").isEmail(),
        body("password", "Password cannot be empty").exists(),
    ],
    async (req, res) => {
        let success = false;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }

        const {email, password} = req.body;

        try {
            let user = await User.findOne({ email });
            if (!user) {
                success = false;
                return res.status(400).json({ error: "Enter the valid credentials" });
            }

            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                success = false;
                return res.status(400).json({success, error: "Enter the valid credentials" });
            }

            const data = {
                user: {
                    id: user.id,
                },
            };
            const authtoken = jwt.sign(data, jwtSecret);
            success = true;
            res.json({success, authtoken });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
);

//Route 3 - get logged in user details: POST "/api/auth/getuser". login required

router.post("/getuser",fetchuser, async (req, res) => {
        
    try {
            userId = req.user.id; 
            const user = await User.findById(userId).select("-password");
            res.send(user);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
);

module.exports = router;
