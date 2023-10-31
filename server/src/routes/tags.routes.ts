import express from 'express';

import { createTag, getAllTags, updateTag } from '@/controllers/tags.controllers';
import authentication from '@/middleware/authentication.middleware';
import validationHandler from '@/middleware/validationHandler.middleware';
import { createTagValidators, updateTagValidators } from '@/utils/validators/tags.validators';

const router = express.Router();

/**
 * @openapi
 * /tags:
 *  get:
 *    tags:
 *    - tags 📑
 *    summary: Getting all tags
 *    parameters:
 *      - in: query
 *        name: name
 *        required: false
 *        schema:
 *          type: string
 *          example: lorem
 *        description: To get tags that have this word in their name
 *      - in: query
 *        name: page
 *        required: false
 *        schema:
 *          type: number
 *          default: 1
 *        description: current page
 *      - in: query
 *        name: limit
 *        required: false
 *        schema:
 *          type: number
 *          default: 20
 *        description: the number of posts that will be retrieved when requested
 *      - in: query
 *        name: order
 *        required: false
 *        schema:
 *          type: string
 *          enum: [asc, desc]
 *          default: desc
 *        description: in what order will the posts be
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  id:
 *                    type: string
 *                    example: 4b920567-cf65-485a-b71c-158de4d548d5
 *                  name:
 *                    type: string
 *                    example: test name
 *      500:
 *        description: an error occurred on the server side while fetching tags, error ${error_message}
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: an error occurred on the server side while fetching tags, error ${error_message}
 *                query:
 *                  type: object
 *                  properties:
 *                    name:
 *                      type: string
 *                      example: lorem
 *                    page:
 *                      type: string
 *                      example: 2
 *                    limit:
 *                      type: string
 *                      example: 10
 *                    order:
 *                      type: string
 *                      example: desc
 */
router.get('/', getAllTags);

/**
 * @openapi
 * /tags:
 *  post:
 *    tags:
 *    - tags 📑
 *    summary: Create a tag
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - name
 *            properties:
 *              name:
 *                type: string
 *                example: lorem tag
 *    responses:
 *      201:
 *        description: Created
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: string
 *                  example: 8c54f521-9fa7-4161-8464-82e69625c318
 *                name:
 *                  type: string
 *                  example: lorem tag
 *      409:
 *        description: A tag with the same name already exists
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: tag named 'lorem tag' already exists
 *                body:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: string
 *                      example: 8c54f521-9fa7-4161-8464-82e69625c318
 *                    name:
 *                      type: string
 *                      example: lorem tag
 *      500:
 *        description: an error occurred on the server side while fetching tags, error ${error_message}
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: an error occurred on the north side when creating a tag based on the passed body, error ${error_message}
 *                body:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: string
 *                      example: 8c54f521-9fa7-4161-8464-82e69625c318
 *                    name:
 *                      type: string
 *                      example: lorem tag
 */
router.post('/', authentication, createTagValidators, validationHandler, createTag);

/**
 * @openapi
 * /tags/:id:
 *  patch:
 *    tags:
 *    - tags 📑
 *    summary: Update a tag
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *          example: 863f78b8-13ee-49c1-925e-dc279f101e6c
 *        description: the id of the tag to be updated
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: new lorem tag
 *    responses:
 *      200:
 *        description: The tag has been updated
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: string
 *                  example: 8c54f521-9fa7-4161-8464-82e69625c318
 *                name:
 *                  type: string
 *                  example: new lorem text
 *      404:
 *        description: Tag with this name does not exist
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: tag with id = 863f78b8-13ee-49c1-925e-dc279f101e6c does not exist
 *                id:
 *                  type: string
 *                  example: 863f78b8-13ee-49c1-925e-dc279f101e6c
 *      500:
 *        description: server error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: an error occurred while updating the tag on the server side, error ${error_message}
 *                id:
 *                  type: string
 *                  example: 863f78b8-13ee-49c1-925e-dc279f101e6c
 *                body:
 *                  type: object
 *                  properties:
 *                    name:
 *                      type: string
 *                      example: new lorem tag
 */
router.patch('/:id', authentication, updateTagValidators, validationHandler, updateTag);

export default router;
