const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MutualSchema = new Schema ({
    name: {type: String},
    creationDate: {type: Date, default: Date.now},
    typeMutual: {type: String},
    helps: [{nameHelp: String, descHelp: String}],
    members: [{emailMember: String, points: Number, status: String}],
});

const Mutual = mongoose.model("Mutual", MutualSchema);

module.exports = Mutual;