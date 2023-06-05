import express from 'express';

import { loginUser, registerUser } from '@/controllers/auth.controllers';
import { loginValidators, registerValidators } from '@/utils/validators/auth.validators';

const router = express.Router({ mergeParams: true });

/**
 * @openapi
 * '/register':
 *  post:
 *    tags:
 *    - auth 🚪
 *    summary: User registration
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - login
 *              - password
 *            properties:
 *              login:
 *                type: string
 *                example: testLogin
 *              password:
 *                type: string
 *                example: testPassword
 *    responses:
 *      201:
 *        description: Created
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                user:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: string
 *                    login:
 *                      type: string
 *                    img:
 *                      type: string
 *                    name:
 *                      type: string
 *                    email:
 *                      type: string
 *                    createdAt:
 *                      type: string
 *                      format: date-time
 *                accessToken:
 *                  type: string
 *      400:
 *        description: Invalid request body
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: 'Invalid request body'
 *      409:
 *        description: User with this login already exists
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: 'User with this login already exists'
 *      500:
 *        description: An error occurred on the server side while creating the user
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: 'an error occurred on the server side while creating the user'
 */
router.post('/register', registerValidators, registerUser);

/**
 * @openapi
 * '/login':
 *  post:
 *    tags:
 *    - auth 🚪
 *    summary: User login
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - login
 *              - password
 *            properties:
 *              login:
 *                type: string
 *                example: testLogin
 *              password:
 *                type: string
 *                example: testPassword
 *    responses:
 *      201:
 *        description: Created
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                user:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: string
 *                    login:
 *                      type: string
 *                    img:
 *                      type: string
 *                    name:
 *                      type: string
 *                    email:
 *                      type: string
 *                    createdAt:
 *                      type: string
 *                      format: date-time
 *                accessToken:
 *                  type: string
 *      400:
 *        description: Invalid request body
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: 'Invalid request body'
 *      401:
 *        description: User with this login does not exist
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: 'incorrect password'
 *      500:
 *        description: An error occurred while authorizing the user on the server side
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: 'an error occurred while authorizing the user on the server side'
 */
router.post('/login', loginValidators, loginUser);

export default router;
