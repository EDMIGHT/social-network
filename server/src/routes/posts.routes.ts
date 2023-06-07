import express from 'express';

import { allPosts } from '@/controllers/posts.controllers';

const router = express.Router({ mergeParams: true });

router.get('/all', allPosts);

export default router;
