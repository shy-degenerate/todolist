const asyncWrapper = require("../utils/async_wrapper");
const { StatusCodes } = require("http-status-codes");
const { Unauthorized } = require("../errors");
const User = require("../models/user");

/* POST /api/v1/auth/login */
const login = asyncWrapper(async function (req, res) {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !await user.comparePasswords(password)) {
        throw new Unauthorized(`Incorrect credentials`);
    }
    const token = user.generateJWT();

    res.status(StatusCodes.CREATED).json({ success: true, token });
});

/* POST /api/v1/auth/register */
const register = asyncWrapper(async function register(req, res) {
    const user = await User.create(req.body);
    const token = user.generateJWT();

    res.status(StatusCodes.CREATED).json({ success: true, token });
});

module.exports = {
    register,
    login
};