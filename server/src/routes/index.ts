import express from 'express';

import authRouter from './auth.routes';
import postsRouter from './posts.routes';

const router = express.Router({ mergeParams: true });

router.use('/auth', authRouter);
router.use('/posts', postsRouter);

export default router;
