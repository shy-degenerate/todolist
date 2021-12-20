const TodoAPIError = require("./todo_api_error");
const { StatusCodes } = require("http-status-codes");

class Unauthorized extends TodoAPIError {
    constructor(message) {
        super(message, StatusCodes.UNAUTHORIZED);
    }
}

module.exports = Unauthorized;