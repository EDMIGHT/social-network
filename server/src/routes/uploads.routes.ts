import express from 'express';

import { uploadImg } from '@/controllers/uploads.controllers';
import authentication from '@/middleware/authentication.middleware';
import upload from '@/middleware/upload.middleware';

const router = express.Router({ mergeParams: true });

router.post('/', authentication, upload.single('image'), uploadImg);

export default router;
