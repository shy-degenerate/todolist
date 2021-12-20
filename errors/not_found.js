const TodoAPIError = require("./todo_api_error");
const { StatusCodes } = require("http-status-codes");

class BadRequest extends TodoAPIError {
    constructor(message) {
        super(message, StatusCodes.NOT_FOUND);
    }
}

module.exports = BadRequest;