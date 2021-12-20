const asyncWrapper = require("../utils/async_wrapper");
const { StatusCodes } = require("http-status-codes");
const Todo = require("../models/todo");
const { NotFound } = require("../errors");

/* GET /api/v1/todos */
const getTodos = asyncWrapper(async function (req, res) {
    let todos = await Todo.find({ author: req.userId });

    todos = todos.map((item) => {
        const { text, completed, id } = item;
        return { text, completed, id };
    });

    res.status(StatusCodes.OK).json({ success: true, todos });
});

/* GET /api/v1/todos/:id */
const getTodo = asyncWrapper(async function (req, res) {
    req.body.author = req.userId;
    let todo = await Todo.findOne({ author: req.body.author, _id: req.params.id });

    if (!todo) {
        throw new NotFound(`There is no todo by id ${req.params.id}`);
    }
    todo = { 
        text: todo.text,
        completed: todo.completed,
        id: todo.id 
    };
    res.status(StatusCodes.OK).json({ success: true, todo });    
});

/* POST /api/v1/todos */
const createTodo = asyncWrapper(async function (req, res) {
    req.body.author = req.userId;
    await Todo.create({ ...req.body });

    res.status(StatusCodes.CREATED).json({ success: true });
});

/* PATCH /api/v1/todos/:id */
const updateTodo = asyncWrapper(async function (req, res) {
    req.body.author = req.userId;
    const todo = await Todo.findOneAndUpdate({ author: req.body.author, _id: req.params.id }, { ...req.body }, {
        runValidators: true
    });

    if (!todo) {
        throw new NotFound(`There is no todo by id ${req.params.id}`); 
    }
    res.status(StatusCodes.OK).json({ success: true });
});

/* DELETE /api/v1/todos/:id */
const deleteTodo = asyncWrapper(async function (req, res) {
    req.body.author = req.userId;
    const todo = await Todo.findOneAndDelete({ _id: req.params.id, author: req.body.author });

    if (!todo) {
        throw new NotFound(`There is no todo by id ${req.params.id}`);
    }
    res.status(StatusCodes.OK).json({ success: true });
});

module.exports = {
    getTodos,
    getTodo,
    createTodo,
    updateTodo,
    deleteTodo
};