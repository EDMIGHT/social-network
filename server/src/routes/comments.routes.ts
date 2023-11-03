import express from 'express';

import {
  createComment,
  deleteComment,
  getAllCommentsForPost,
} from '@/controllers/comments.controllers';
import authentication from '@/middleware/authentication.middleware';
import validationHandler from '@/middleware/validationHandler.middleware';
import { createCommentValidators } from '@/utils/validators/comments.validators';

const router = express.Router({ mergeParams: true });

router.get('/:postId', getAllCommentsForPost);
router.post(
  '/:postId',
  authentication,
  createCommentValidators,
  validationHandler,
  createComment
);
router.delete('/:postId/:commentId', authentication, deleteComment);

export default router;
