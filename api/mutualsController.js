const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Mutual = require("../models/mutual");
const User = require("../models/user");
dotenv.config({path: "../.env"});

exports.createMutual = async (req, res, next) => {
    const mutualExist = await Mutual.exists({name: req.body.name});
    try {
        if(mutualExist) {
            res.status(403).json({msg: "There is already a mutual named like that"});
        } else {
            const mutual = new Mutual({
                name: req.body.name,
                type: req.body.type,
                helps: req.body.helps,
            });

            mutual.save();

            res.status(201).json(mutual);
        }
    } catch(err) {
        next(err);
    }
}

exports.getMutual = async (req, res, next) => {
    const mutual = await Mutual.findOne({name: req.params.name});
    try {
        if(mutual) {
            res.status(200).json(mutual);
        } else {
            res.status(404).json({msg: "There is no mutual with this name"});
        }
    } catch(err) {
        next(err);
    }
}

exports.getMutuals = async (req, res, next) => {
    const mutuals = await Mutual.find();
    try {
        if(mutuals.length >= 1) {
            res.status(200).json(mutuals);
        } else {
            res.status(404).json({msg: "No mutuals"});
        }
    } catch(err) {
        next(err);
    }
}