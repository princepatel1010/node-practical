const { status } = require('http-status');
const { Todo } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a todo
 * @param {Object} todoBody
 * @returns {Promise<Todo>}
 */
const createTodo = async (todoBody, userId) => {
  todoBody.user = userId;
  return Todo.create(todoBody);
};

/**
 * Query for todos
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryTodos = async (filter, options) => {
  const todos = await Todo.paginate(filter, options);
  return todos;
};

/**
 * Get todo by id
 * @param {ObjectId} id
 * @returns {Promise<Todo>}
 */
const getTodoById = async (id) => {
  return Todo.findById(id);
};

/**
 * Update user by id
 * @param {ObjectId} todoId
 * @param {Object} updateBody
 * @returns {Promise<Todo>}
 */
const updateTodoById = async (todoId, updateBody) => {
  const todo = await getTodoById(todoId);
  if (!todo) {
    throw new ApiError(status.NOT_FOUND, 'Todo not found');
  }
  Object.assign(todo, updateBody);
  await todo.save();
  return todo;
};

/**
 * Update user by id
 * @param {ObjectId} todoId
 * @param {Object} updateBody
 * @returns {Promise<Todo>}
 */
const toggleTodoCompletedById = async (todoId) => {
  const todo = await getTodoById(todoId);
  if (!todo) {
    throw new ApiError(status.NOT_FOUND, 'Todo not found');
  }
  todo.completed = !todo.completed;
  await todo.save();
  return todo;
};

/**
 * Delete user by id
 * @param {ObjectId} todoId
 * @returns {Promise<Todo>}
 */
const deleteTodoById = async (todoId) => {
  const todo = await getTodoById(todoId);
  if (!todo) {
    throw new ApiError(status.NOT_FOUND, 'Todo not found');
  }
  await Todo.deleteOne({ _id: todoId });
  return todo;
};

module.exports = {
  createTodo,
  queryTodos,
  getTodoById,
  updateTodoById,
  toggleTodoCompletedById,
  deleteTodoById,
};
