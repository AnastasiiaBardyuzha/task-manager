import express from 'express';
import {
    getTask,
    getTasksByUserId,
    createTask,
    updateTask,
    deleteTask,
    getAllTasks,
} from '../controllers/taskController.js';
import checkAuth from '../middlewares/checkAuth.js';
import checkAdmin from '../middlewares/checkAdmin.js';

const router = express.Router();

//middleware
router.use(checkAuth);

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *        type: object
 *        required:
 *          - description
 *        properties:
 *          id:
 *            type: string
 *          description:
 *             type: string
 *             description: Task description
 *          completed:
 *             type: boolean
 *             default: false
 *          createdBy:
 *             type: string
 *             description: id creator user
 *        example:
 *          id: k66h4k3n
 *          description: "buy"
 *          completed: false
 *          createdBy: rt56493hsrdf
 * 
 *   parameters:
 *     idParam:
 *       in: path
 *       name: id
 *       schema: 
 *         type: string
 *       required: true
 *       description: Task id
*/

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: tasks management
*/

/**
 * @openapi
 * '/api/task':
 *  post:
 *     tags: [Tasks]
 *     summary: Create a task
 *     security:
 *      - basicAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              description:
 *                type: string
 *                default: Buy a book
 *     responses:
 *      201:
 *        description: Created
 *      400:
 *        description: Bad Request
 */

router.post('/task', createTask);

/**
 * @openapi
 * '/api/tasks':
 *  get:
 *     tags: [Tasks]
 *     summary: Get user tasks
 *     security:
 *       - basicAuth: []
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Task'
 *       400:
 *         description: Bad request
 */

router.get('/tasks', getTasksByUserId);

/**
 * @openapi
 * '/api/tasks/all':
 *  get:
 *     tags: [Tasks]
 *     summary: Get all tasks (admin role)
 *     security:
 *       - basicAuth: []
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Task'
 *       401:
 *         description: Invalid authorization
 *       403:
 *         description: User don't have permissions
 *       400:
 *         description: Bad request
 */

router.get('/tasks/all', checkAdmin, getAllTasks);


/**
 * @openapi
 * '/api/task/{id}':
 *  get:
 *     tags: [Tasks]
 *     summary: Get task by Id
 *     security:
 *       - basicAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/idParam'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Task'
 *       400:
 *         description: Failed to update task
 *       404:
 *         description: Book not found
 */

router.get('/task/:id', getTask);

/**
 * @openapi
 * '/api/task/{id}':
 *  put:
 *     tags: [Tasks]
 *     summary: Update task by Id
 *     security:
 *       - basicAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/idParam'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              description:
 *                type: string
 *                default: Buy a book
 *              completed:
 *                type: boolean
 *                default: false
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Task'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Book not found
 */

router.put('/task/:id', updateTask);

/**
 * @openapi
 * '/api/task/{id}':
 *  delete:
 *     tags: [Tasks]
 *     summary: Delete task by Id
 *     security:
 *       - basicAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/idParam'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *            schema:
 *              type: string
 *              description: Task was successfully deleted
 *       400:
 *         description: Bad request
 *       404:
 *         description: Book not found
 */

router.delete('/task/:id', deleteTask);

export default router;
