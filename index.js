const express = require("express");
const connectDB = require("./utils/connectDB");
const mutualRouter = require("./api/mutuals.route");
const errorHandler = require("./middlewares/error");

const app = express();

connectDB();

app.use(errorHandler);

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'content-type, authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT');
    res.setHeader('Control-Origin-Opener-Policy', 'same-origin-allow-popups');
    next();
});

app.use(express.json());

app.use('/api', mutualRouter);

app.listen(5002, console.log("Server started on port 5002"));

module.exports = app;
