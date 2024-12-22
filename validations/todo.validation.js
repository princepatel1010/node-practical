const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createTodo = {
  body: Joi.object().keys({
    title: Joi.string().min(1).max(100).required(),
    description: Joi.string().required(),
  }),
};

const getTodos = {
  query: Joi.object().keys({
    title: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getTodo = {
  params: Joi.object().keys({
    todoId: Joi.string().custom(objectId),
  }),
};

const updateTodo = {
  params: Joi.object().keys({
    todoId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    title: Joi.string().min(1).max(100).required(),
    description: Joi.string().required(),
  }),
};

const toggleCompleted = {
  params: Joi.object().keys({
    todoId: Joi.required().custom(objectId),
  }),
};

const deleteTodo = {
  params: Joi.object().keys({
    todoId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createTodo,
  getTodos,
  getTodo,
  updateTodo,
  toggleCompleted,
  deleteTodo,
};
