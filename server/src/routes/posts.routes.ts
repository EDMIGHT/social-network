import express from 'express';

import {
  createPost,
  deletePost,
  getAllPosts,
  getMyPost,
  updatePost,
} from '@/controllers/posts.controllers';
import authentication from '@/middleware/authentication.middleware';
import {
  createPostValidators,
  updatePostValidators,
} from '@/utils/validators/posts.validators';

const router = express.Router({ mergeParams: true });

router.get('/all', getAllPosts);
router.get('/', authentication, getMyPost);
router.post('/', authentication, createPostValidators, createPost);
router.delete('/:id', authentication, deletePost);
router.patch('/:id', authentication, updatePostValidators, updatePost);

export default router;
