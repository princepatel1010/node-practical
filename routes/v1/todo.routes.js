const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { todoValidation } = require('../../validations');
const { todoController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .post(auth('createTodo'), validate(todoValidation.createTodo), todoController.createTodo)
  .get(auth('getTodos'), validate(todoValidation.getTodos), todoController.getTodos);

router
  .route('/:todoId')
  .get(auth('getTodo'), validate(todoValidation.getTodo), todoController.getTodo)
  .patch(auth('updateTodo'), validate(todoController.updateTodo), todoController.updateTodo)
  .delete(auth('deleteTodo'), validate(todoController.deleteTodo), todoController.deleteTodo);

router.patch('/:todoId/completed', auth('toggleCompleted'), todoController.toggleCompleted);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: Todo management (Create, Update, Delete, Get)
 */

/**
 * @swagger
 * /todo:
 *   post:
 *     summary: Create a new todo
 *     description: Only users with the 'createTodo' permission can create todos.
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the todo
 *               description:
 *                 type: string
 *                 description: Detailed description of the todo
 *             example:
 *               title: "Buy groceries"
 *               description: "Buy fruits and vegetables from the store"
 *     responses:
 *       "201":
 *         description: Todo created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *   get:
 *     summary: Get all todos
 *     description: Only users with the 'getTodos' permission can retrieve todos.
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Filter todos by title
 *       - in: query
 *         name: completed
 *         schema:
 *           type: boolean
 *         description: Filter todos by completion status
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           description: Maximum number of todos per page
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           description: Page number for pagination
 *     responses:
 *       "200":
 *         description: List of todos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Todo'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 5
 */

/**
 * @swagger
 * /todos/{todoId}:
 *   get:
 *     summary: Get a specific todo
 *     description: Retrieve a todo by its ID. Users must have the 'getTodo' permission.
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: todoId
 *         required: true
 *         schema:
 *           type: string
 *         description: Todo ID
 *     responses:
 *       "200":
 *         description: Todo found successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *   patch:
 *     summary: Update a specific todo
 *     description: Users must have the 'updateTodo' permission to update a todo.
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: todoId
 *         required: true
 *         schema:
 *           type: string
 *         description: Todo ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *             example:
 *               title: "Buy groceries"
 *               description: "Buy fruits, vegetables, and bread"
 *     responses:
 *       "200":
 *         description: Todo updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *   delete:
 *     summary: Delete a specific todo
 *     description: Users must have the 'deleteTodo' permission to delete a todo.
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: todoId
 *         required: true
 *         schema:
 *           type: string
 *         description: Todo ID
 *     responses:
 *       "200":
 *         description: Todo deleted successfully
 */

/**
 * @swagger
 * /todos/{todoId}/completed:
 *   patch:
 *     summary: Toggle the completion status of a todo
 *     description: Change the completion status of a todo. Only users with 'toggleCompleted' permission can perform this action.
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: todoId
 *         required: true
 *         schema:
 *           type: string
 *         description: Todo ID
 *     responses:
 *       "200":
 *         description: Todo completion status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Todo:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the todo
 *         title:
 *           type: string
 *           description: The title of the todo
 *         description:
 *           type: string
 *           description: Detailed description of the todo
 *         completed:
 *           type: boolean
 *           description: Whether the todo has been completed
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: When the todo was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: When the todo was last updated
 *       example:
 *         id: 1
 *         title: "Buy groceries"
 *         description: "Buy fruits, vegetables, and bread"
 *         completed: false
 *         createdAt: "2024-12-01T10:00:00Z"
 *         updatedAt: "2024-12-01T12:00:00Z"
 */
