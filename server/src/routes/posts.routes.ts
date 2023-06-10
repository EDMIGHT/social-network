import express from 'express';

import {
  createPost,
  deletePost,
  getAllPosts,
  getPosts,
  updatePost,
} from '@/controllers/posts.controllers';
import authentication from '@/middleware/authentication.middleware';
import validationHandler from '@/middleware/validationHandler.middleware';
import {
  createPostValidators,
  updatePostValidators,
} from '@/utils/validators/posts.validators';

const router = express.Router({ mergeParams: true });

/**
 * @openapi
 * posts/all:
 *  get:
 *    tags:
 *    - posts 📰
 *    summary: View all posts
 *    parameters:
 *      - in: query
 *        name: tags
 *        required: false
 *        schema:
 *          type: string
 *          example: tag1,tag2
 *        description: Tags to display posts for
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
 *          default: 10
 *        description: the number of posts that will be retrieved when requested
 *      - in: query
 *        name: sort
 *        required: false
 *        schema:
 *          type: string
 *          enum: [title, createdAt, updatedAt, viewsCount]
 *          default: createdAt
 *        description: how posts will be sorted
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
 *              type: object
 *              properties:
 *                posts:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: string
 *                      example: f6bbb9ce-5434-40de-a5f7-535a1e6e62cc
 *                    title:
 *                      type: string
 *                      example: lorem title
 *                    text:
 *                      type: string
 *                      example: lorem text
 *                    img:
 *                      type: string
 *                      example: /uploads/img.jpg
 *                    viewsCount:
 *                      type: number
 *                      example: 10
 *                    createdAt:
 *                      type: string
 *                      format: date-time
 *                      example: 2023-06-08T06:34:26.774Z
 *                    updatedAt:
 *                      type: string
 *                      format: date-time
 *                      example: 2023-08-08T06:34:26.774Z
 *                    userId:
 *                      type: string
 *                      example: 863f78b8-13ee-49c1-925e-dc279f101e6c
 *                    likedById:
 *                      type: string
 *                      example: f6bbb9ce-5434-40de-a5f7-535a1e6e62cc
 *                    tags:
 *                      type: array
 *                      items:
 *                        type: object
 *                        properties:
 *                          id:
 *                            type: string
 *                            example: 549763ed-42f4-43c8-91d4-2eec8af50742
 *                          name:
 *                            type: string
 *                            example: tag for win
 *                currentPage:
 *                  type: number
 *                  example: 1
 *                totalPages:
 *                  type: number
 *                  example: 10
 *      400:
 *        description: Invalid request query
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: invalid request query
 *                query:
 *                  type: object
 *                  properties:
 *                    tags:
 *                      type: string
 *                      example: tag1,tag2
 *                    page:
 *                      type: string
 *                      example: 2
 *                    limit:
 *                      type: string
 *                      example: 10
 *                    order:
 *                      type: string
 *                      example: desc
 *                    sort:
 *                      type: string
 *                      example: createdAt
 *      500:
 *        description: An error occurred on the server side while creating the user
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: 'an error occurred on the server side while fetching all posts, error: error_message'
 *                query:
 *                  type: object
 *                  properties:
 *                    tags:
 *                      type: string
 *                      example: tag1,tag2
 *                    page:
 *                      type: string
 *                      example: 2
 *                    limit:
 *                      type: string
 *                      example: 10
 *                    order:
 *                      type: string
 *                      example: desc
 *                    sort:
 *                      type: string
 *                      example: createdAt
 */
router.get('/all', getAllPosts);

/**
 * @openapi
 * posts/:userId:
 *  get:
 *    tags:
 *    - posts 📰
 *    summary: Getting posts by a userId
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *          example: 863f78b8-13ee-49c1-925e-dc279f101e6c
 *        description: Tags to display posts for
 *      - in: query
 *        name: tags
 *        required: false
 *        schema:
 *          type: string
 *          example: tag1,tag2
 *        description: Tags to display posts for
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
 *          default: 10
 *        description: the number of posts that will be retrieved when requested
 *      - in: query
 *        name: sort
 *        required: false
 *        schema:
 *          type: string
 *          enum: [title, createdAt, updatedAt, viewsCount]
 *          default: createdAt
 *        description: how posts will be sorted
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
 *              type: object
 *              properties:
 *                posts:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: string
 *                      example: f6bbb9ce-5434-40de-a5f7-535a1e6e62cc
 *                    title:
 *                      type: string
 *                      example: lorem title
 *                    text:
 *                      type: string
 *                      example: lorem text
 *                    img:
 *                      type: string
 *                      example: /uploads/img.jpg
 *                    viewsCount:
 *                      type: number
 *                      example: 10
 *                    createdAt:
 *                      type: string
 *                      format: date-time
 *                      example: 2023-06-08T06:34:26.774Z
 *                    updatedAt:
 *                      type: string
 *                      format: date-time
 *                      example: 2023-08-08T06:34:26.774Z
 *                    userId:
 *                      type: string
 *                      example: 863f78b8-13ee-49c1-925e-dc279f101e6c
 *                    likedById:
 *                      type: string
 *                      example: f6bbb9ce-5434-40de-a5f7-535a1e6e62cc
 *                    tags:
 *                      type: array
 *                      items:
 *                        type: object
 *                        properties:
 *                          id:
 *                            type: string
 *                            example: 549763ed-42f4-43c8-91d4-2eec8af50742
 *                          name:
 *                            type: string
 *                            example: tag for win
 *                currentPage:
 *                  type: number
 *                  example: 1
 *                totalPages:
 *                  type: number
 *                  example: 10
 *      400:
 *        description: Invalid request query
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: invalid request query
 *                query:
 *                  type: object
 *                  properties:
 *                    tags:
 *                      type: string
 *                      example: tag1,tag2
 *                    page:
 *                      type: string
 *                      example: 2
 *                    limit:
 *                      type: string
 *                      example: 10
 *                    order:
 *                      type: string
 *                      example: desc
 *                    sort:
 *                      type: string
 *                      example: createdAt
 *      500:
 *        description: An error occurred on the server side while creating the user
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: 'an error occurred on the server side while fetching all posts, error: error_message'
 *                query:
 *                  type: object
 *                  properties:
 *                    tags:
 *                      type: string
 *                      example: tag1,tag2
 *                    page:
 *                      type: string
 *                      example: 2
 *                    limit:
 *                      type: string
 *                      example: 10
 *                    order:
 *                      type: string
 *                      example: desc
 *                    sort:
 *                      type: string
 *                      example: createdAt
 */
router.get('/:id', getPosts);

/**
 * @openapi
 * posts/:
 *  post:
 *    tags:
 *    - posts 📰
 *    summary: post creation by user
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - title
 *              - text
 *              - tags
 *            properties:
 *              title:
 *                type: string
 *                example: lorem title
 *              text:
 *                type: string
 *                example: lorem text
 *              img:
 *                type: string
 *                example: uploads/img.jpg
 *              tags:
 *                type: string
 *                example: 549763ed-42f4-43c8-91d4-2eec8af50742,549763ed-42f4-43c8-91d4-2eec8af50742
 *    responses:
 *      201:
 *        description: Created post
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: string
 *                  example: 4239092c-e6a6-47dd-a1ce-d7db77a4313a
 *                title:
 *                  type: string
 *                  example: lorem title
 *                text:
 *                  type: string
 *                  example: lorem text
 *                img:
 *                  type: string
 *                  example: uploads/img.jpg
 *                viewsCount:
 *                  type: number
 *                  example: 0
 *                createdAt:
 *                  type: string
 *                  format: date-time
 *                  example: 2023-06-08T06:21:04.385Z
 *                updatedAt:
 *                  type: string
 *                  format: date-time
 *                  example: null
 *                userId:
 *                  type: string
 *                  example: eab14736-c40e-4d99-8dbe-1601af441295
 *                likedById:
 *                  type: string
 *                  example: null
 *      400:
 *        description: Not all tags that were submitted exist
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: 'failed to create post using passed data'
 *                body:
 *                  type: object
 *                  properties:
 *                    title:
 *                      type: string
 *                      example: lorem title
 *                    text:
 *                      type: string
 *                      example: lorem text
 *                    img:
 *                      type: string
 *                      example: uploads/img.jpg
 *                    tags:
 *                      type: string
 *                      example: 549763ed-42f4-43c8-91d4-2eec8af50742,549763ed-42f4-43c8-91d4-2eec8af50742
 *      500:
 *        description: An error occurred on the server side while creating the post
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: an error occurred on the server side while creating post {error_message}
 *                body:
 *                  type: object
 *                  properties:
 *                    title:
 *                      type: string
 *                      example: lorem title
 *                    text:
 *                      type: string
 *                      example: lorem text
 *                    img:
 *                      type: string
 *                      example: uploads/img.jpg
 *                    tags:
 *                      type: string
 *                      example: 549763ed-42f4-43c8-91d4-2eec8af50742,549763ed-42f4-43c8-91d4-2eec8af50742
 */
router.post('/', authentication, createPostValidators, validationHandler, createPost);

/**
 * @openapi
 * posts/:id:
 *  delete:
 *    tags:
 *    - posts 📰
 *    summary: Deleting a post by id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *          example: 863f78b8-13ee-49c1-925e-dc279f101e6c
 *        description: the id of the post to be deleted
 *    responses:
 *      200:
 *        description: The post has been deleted
 *        content:
 *          application/json:
 *            schema:
 *              type: string
 *              example: null
 *      404:
 *        description: Post with this id does not exist
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: post with id = 863f78b8-13ee-49c1-925e-dc279f101e6c does not exist or has already been deleted
 *                id:
 *                  type: string
 *                  example: 863f78b8-13ee-49c1-925e-dc279f101e6c
 *      500:
 *        description: An error occurred on the server side while deleting the post
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: an error occurred on the server side while deleting the post {error_message}
 *                id:
 *                  type: string
 *                  example: 863f78b8-13ee-49c1-925e-dc279f101e6c
 */
router.delete('/:id', authentication, deletePost);

/**
 * @openapi
 * posts/:id:
 *  patch:
 *    tags:
 *    - posts 📰
 *    summary: Post update
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *          example: 863f78b8-13ee-49c1-925e-dc279f101e6c
 *        description: the id of the post to be updated
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              title:
 *                type: string
 *                example: lorem title
 *              text:
 *                type: string
 *                example: lorem text
 *              img:
 *                type: string
 *                example: uploads/img.jpg
 *              viewsCount:
 *                  type: number
 *                  example: 1
 *              updatedAt:
 *                  type: string
 *                  format: date-time
 *                  example: 2023-06-09T08:36:47.171Z
 *              likedById:
 *                  type: string
 *                  example: 863f78b8-13ee-49c1-925e-dc279f101e6c
 *    responses:
 *      200:
 *        description: The post has been updated
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: string
 *                  example: 4239092c-e6a6-47dd-a1ce-d7db77a4313a
 *                title:
 *                  type: string
 *                  example: lorem title
 *                text:
 *                  type: string
 *                  example: lorem text
 *                img:
 *                  type: string
 *                  example: uploads/img.jpg
 *                viewsCount:
 *                  type: number
 *                  example: 1
 *                createdAt:
 *                  type: string
 *                  format: date-time
 *                  example: 2023-06-08T06:21:04.385Z
 *                updatedAt:
 *                  type: string
 *                  format: date-time
 *                  example: 2023-06-09T08:36:47.171Z
 *                userId:
 *                  type: string
 *                  example: eab14736-c40e-4d99-8dbe-1601af441295
 *                likedById:
 *                  type: string
 *                  example: 863f78b8-13ee-49c1-925e-dc279f101e6c
 *      404:
 *        description: Post with this id does not exist
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: post with id = 863f78b8-13ee-49c1-925e-dc279f101e6c does not exist
 *                id:
 *                  type: string
 *                  example: 863f78b8-13ee-49c1-925e-dc279f101e6c
 *      500:
 *        description: An error occurred on the server side while updating the post
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: an error occurred on the server side while updating the post {error_message}
 *                id:
 *                  type: string
 *                  example: 863f78b8-13ee-49c1-925e-dc279f101e6c
 */
router.patch('/:id', authentication, updatePostValidators, validationHandler, updatePost);

export default router;
