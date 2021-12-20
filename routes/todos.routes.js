const express = require("express");
const router = express.Router();

const { getTodos, getTodo, createTodo, deleteTodo, updateTodo } = require("../controllers/todos");

router
    .route("/")
    .get(getTodos)
    .post(createTodo);

router
    .route("/:id")
    .get(getTodo)
    .patch(updateTodo)
    .delete(deleteTodo);

module.exports = router;