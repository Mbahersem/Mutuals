const mongoose = require("mongoose");

const RefundSchema = new mongoose.Schema({
    amount: Number,
    rate: Number,
    mutual: {nameMutual: String},
    member: {emailMember: String, points: Number, status: String},
});

const Refund = new mongoose.model("Refund", RefundSchema);

module.exports = Refund;