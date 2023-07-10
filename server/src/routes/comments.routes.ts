import express from 'express';

import { createComment, getAllCommentsForPost } from '@/controllers/comments.controllers';
import authentication from '@/middleware/authentication.middleware';

const router = express.Router({ mergeParams: true });

router.get('/:postId', getAllCommentsForPost);
router.post('/:postId', authentication, createComment);

export default router;
