import express from 'express';

import authRouter from './auth.routes';
import postsRouter from './posts.routes';
import tagsRouter from './tags.routes';

const router = express.Router({ mergeParams: true });

router.use('/auth', authRouter);
router.use('/posts', postsRouter);
router.use('/tags', tagsRouter);

export default router;
