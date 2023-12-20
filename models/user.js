const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: [true, "He must have a name."],
    },
    email: {
        type: String,
        required: [true, "An email is necessary !"],
    },
    password: {
        type: String,
        required: [true, "How could he be identified ?"],
    },
    status: {type: String, default: "Member"},
    points: {type: Number, default: 0},
});

const User = mongoose.model("User", UserSchema);

module.exports = User;