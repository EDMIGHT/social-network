import express from 'express';
import authentication from 'src/middleware/authentication.middleware';

import { allPosts, createPost } from '@/controllers/posts.controllers';

const router = express.Router({ mergeParams: true });

router.get('/all', allPosts); // ? возможно лучше сделать для получение своих постов роут /my, вместо /all
router.post('/', authentication, createPost);

export default router;
