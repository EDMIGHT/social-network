import express from 'express';
import authentication from 'src/middleware/authentication.middleware';

import {
  createPost,
  deletePost,
  getAllPosts,
  getMyPost,
  updatePost,
} from '@/controllers/posts.controllers';

const router = express.Router({ mergeParams: true });

router.get('/all', getAllPosts);
router.get('/', authentication, getMyPost); // ? возможно лучше сделать для получение своих постов роут /my, вместо /all
router.post('/', authentication, createPost);
router.delete('/:id', authentication, deletePost);
router.patch('/:id', authentication, updatePost);

export default router;
