const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        minlength: [3, "Username must contain at least 3 characters"],
        maxlength: [16, "Username must be less than 16 characters"],
        required: [true, "Username must be provided"],
        trim: true,
        unique: true
        /* TODO: regular expression for checking login */
    },
    password: {
        type: String,
        minlength: [8, "Password must contain at least 8 characters"],
        required: [true, "Password must be provided"],
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