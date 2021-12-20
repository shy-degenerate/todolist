const { Unauthorized } = require("../errors");
const asyncWrapper = require("../utils/async_wrapper");
const jwt = require("jsonwebtoken");

function authorize(req, res, next) {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer ")) {
        throw new Unauthorized("Authorization required");
    }
    const token = authorization.split(" ")[1];
    try {
        const { userId }= jwt.verify(token, process.env.JWT_SECRET);
        req.userId = userId;
    } catch (error) {
        throw new Unauthorized("Authorization required");
    }
    next();
}

module.exports = authorize;