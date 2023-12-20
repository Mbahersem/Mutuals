const dotenv = require("dotenv");
dotenv.config({path: "../.env"});

const router = require("express").Router();
const mutualController = require("./mutualsController");

router.get('/mutuals/:name', mutualController.getMutual);

router.get('/mutuals', mutualController.getMutuals);

router.post('/mutuals/creation', mutualController.createMutual);

module.exports = router;