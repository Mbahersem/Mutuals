const Mutual = require("../models/mutual");
const User = require("../models/users");

exports.createMutual = async (req, res, next) => {
    const mutualExist = await Mutual.exists({name: req.body.name});
    try {
        const user = await User.findOneAndUpdate({email: req.body.emailUser}, {status: "Admin"}, {new: true});
        console.log(user);
        const toPush = {
            emailMember: user.email,
            points: user.points,
            status: user.status,
        };
        const filter = {name: req.body.name};
        
        if(mutualExist) {
            res.status(403).json({msg: "There is already a mutual named like that"});
        } else {
            const mutual = new Mutual({
                name: req.body.name,
                type: req.body.type,
                helps: req.body.helps,
            });
            
            mutual.save();
            
            const mutual2 = await Mutual.findOneAndUpdate(filter, {
                $push: {members: toPush},
            });
            console.log(mutual2);
            res.status(201).json(mutual2);
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

exports.deleteMember = async (req, res, next) => {
    const user = await User.findOne({email: req.body.emailUser});
    const filter = {name: req.params.name};

    try {
        const mutual = await Mutual.findOneAndUpdate(filter, {
            $pop: {members: user},
        });
    } catch (err) {
        next(err);
    }
}

exports.addMember = async (req, res, next) => {
    const user = await User.findOne({email: req.body.emailUser});
    console.log(req.body.emailUser);
    console.log(user);
    const toPush = {
        emailMember: user.email,
        points: user.points,
        status: user.status,
    };
    const filter = {name: req.params.name};
    
    try {
        const mutual = await Mutual.findOneAndUpdate(filter, {
            $push: {members: toPush},
        });
        console.log(mutual);

        res.status(200).json(mutual);
    } catch(err) {
        next(err);
    }
}

exports.getAdmins = async (req, res, next) => {
    try {
        const mutual = await Mutual.findOne({name: req.params.name});
        const admins = await mutual.getAdmins();
        res.status(200).json(admins);
    } catch(err) {
        next(err);
    }
}

exports.isPackage = async (req, res, next) => {
    try {
        const mutual = await Mutual.findOne({name: req.params.name});
        const val = mutual.isPackage();
        res.status(200).json({msg: val});
    } catch(err) {
        next(err);
    }
}

exports.getNumberOfMutuals = async (req, res, next) => {
    try {
        const count = await Mutual.countMutuals();
        if(count) {
            res.status(200).json({msg: count});
        }
        res.status(500).json({msg: "Problem with the server"});
    } catch(err) {
        next(err);
    }
}

exports.deleteMutual = async (req, res, next) => {
    try {
        await Mutual.deleteOne({name: req.params.name});
        res.status(200).json({msg: "Deleted !"});
    } catch(err) {
        next(err);
    }
}