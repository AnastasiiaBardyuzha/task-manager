import express from 'express';
import { login, registerUser } from '../controllers/authController.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *        type: object
 *        required:
 *          - description
 *        properties:
 *          userName:
 *             type: string
 *             description: users name
 *             required: true
 *          email:
 *             type: string
 *             description: users email
 *             required: true
 *          role:
 *              type: string
 *              default: 'user'
 *              description: Users role
 *        example:
 *          userName: "John_Dou"
 *          email: "test@test.com"
 *          role: "user"
*/


/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authorization
*/

/**
 * @openapi
 * '/api/auth/register':
 *  post:
 *     tags: [Auth]
 *     summary: register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *             password: 
 *               type: string
 *               required: true
 *               description: User's password
 *           example:
 *             userName: "John_Dou"
 *             email: "test@test.com"
 *             role: "user"
 *             password: "*****"
 *     responses:
 *       201:
 *         description: Success
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *              id:
 *                type: string
 *                description: Generated Id
 *       400:
 *         description: Bad request
 */

router.post('/auth/register', registerUser);

/**
 * @openapi
 * '/api/auth/login':
 *  post:
 *     tags: [Auth]
 *     summary: login user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: users email
 *                 required: true
 *               password: 
 *                 type: string
 *                 required: true
 *                 description: User's password
 *     responses:
 *       201:
 *         description: Success
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *              id:
 *                type: string
 *                description: Generated Id
 *       403:
 *         description: Invalid password or email
 *       404:
 *         description: User Not found
 *       400:
 *         description: Bad request
 */
router.post('/auth/login', login);

export default router;
