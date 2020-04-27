const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    active: Boolean,
    fullName: String,
    nickName: String,
    password: String,
});

module.exports = mongoose.model("User", UserSchema);