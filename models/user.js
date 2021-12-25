const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        minlength: [3, "username must contain at least 3 characters"],
        maxlength: [16, "username must be less than 16 characters"],
        required: [true, "username must be provided"],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        minlength: [8, "password must contain at least 8 characters"],
        required: [true, "password must be provided"],
    }
});

UserSchema.methods.generateJWT = function () {
    return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME
    });
};

UserSchema.methods.comparePasswords = function (password) {
    return bcrypt.compare(password, this.password);
};

UserSchema.pre("save", async function () {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
});


module.exports = mongoose.model("User", UserSchema);