
const mongoose = require('mongoose');
// const mongoURI = "mongodb://127.0.0.1:27017/inotebook?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.1";


const connectToMongo = async (url) =>{
    try {
        await mongoose.connect(url);
        console.log("connected successfully");
      } catch (error) {
        console.log(error);
      }
}

module.exports = connectToMongo;
