const { TodoAPIError } = require("../errors");
const { StatusCodes } = require("http-status-codes");

function errorHandler(error, req, res, next) {
    // TODO: Handling duplicate login error
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);

    let err = {
        success: false,
        message: "Something went wrong",
    };

    if (error instanceof TodoAPIError) {
        err = { success: false, message: error.message };
        res.status(error.statusCode);
    }
    if (error.name === "ValidationError") {
        err = { message: error.name, errors: {} };
        Object.keys(error.errors).forEach((key) => {
            err.errors[key] = error.errors[key].message;
        });
        res.status(StatusCodes.BAD_REQUEST);
    }
    if (error.name === "CastError") {
        err = { message: error.name, errors: {} };
        err.errors[error.path] = `Cannot cast '${error.value}' to ${error.kind}`;
    }
    // Duplicate username
    if (error.code && error.code === 11000) {
        err = { message: "duplicate username", errors: {} };
        err.errors.username = `User ${error.keyValue.username} alread exists`;
    }
    res.json({ ...err });
}

module.exports = errorHandler;