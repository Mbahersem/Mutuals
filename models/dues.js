const mongoose = require("mongoose");

const DueSchema = new mongoose.Schema({
    datePay: Date,
    dateDecided: Date,
    amountPay: Number,
    amountDecided: Number,
    mutual: {nameMutual: String},
    member: {emailMember: String, points: Number, status: String},
});

const Due = new mongoose.model("Due", DueSchema);
module.exports = Due;