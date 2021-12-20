const { NotFound } = require("../errors");

function notFound(req, res) {
    res.status(404).json({ msg: "this route not exist" });
}

module.exports = notFound;