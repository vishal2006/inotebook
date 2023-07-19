const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        uppercase: true
    },

    email:{
        type: String,
        required: true,
        lowercase: true
    },

    mobile:{
        type: Number,
        default: 1234567890,
    }
})

const UserModel = mongoose.model('UserModel', UserSchema)

module.exports = UserModel

