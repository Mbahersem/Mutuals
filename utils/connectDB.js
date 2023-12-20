const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({path: "../.env"});

mongoose.set("strictQuery", false);

const mongoDB = "mongodb://127.0.0.1:27017/devmsass";

async function connectDB() {
    try {
        await mongoose.connect(mongoDB);
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;