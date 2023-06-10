import express from 'express';

import { uploadImg } from '@/controllers/uploads.controllers';
import authentication from '@/middleware/authentication.middleware';
import upload from '@/middleware/upload.middleware';

const router = express.Router({ mergeParams: true });

/**
 * @openapi
 * uploads/:
 *  post:
 *    tags:
 *    - uploads 🔃
 *    summary: uploading an image to the server
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            properties:
 *              image:
 *                type: string
 *                format: binary
 *    responses:
 *      200:
 *        description: success upload
 *      400:
 *        description: bad request
 */
router.post('/', authentication, upload.single('image'), uploadImg);

export default router;
