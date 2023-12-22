const dotenv = require("dotenv");
dotenv.config({path: "../.env"});

const router = require("express").Router();
const mutualController = require("./mutualsController");

router.get('/mutuals/:name', mutualController.getMutual);

router.get('/mutuals', mutualController.getMutuals);

router.get('/mutuals/:name/admins', mutualController.getAdmins);

router.get('/mutuals/:name/package', mutualController.isPackage);

router.get('/mutuals/total', mutualController.getNumberOfMutuals);

router.post('/mutuals/creation', mutualController.createMutual);

router.put('/mutuals/:name/add', mutualController.addMember);

router.delete('/mutuals/:name/delete', mutualController.deleteMutual);

module.exports = router;