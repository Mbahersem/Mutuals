const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({path: "../.env"});

mongoose.set("strictQuery", false);

const mongoDB = process.env.MONGODB_URI_DEV;

async function connectDB() {
    try {
        await mongoose.connect(mongoDB);
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;