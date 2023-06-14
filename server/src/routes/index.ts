import express from 'express';

import authRouter from './auth.routes';
import postsRouter from './posts.routes';
import profilesRouter from './profiles.routes';
import tagsRouter from './tags.routes';
import uploadsRouter from './uploads.routes';

const router = express.Router({ mergeParams: true });

router.use('/profiles', profilesRouter);
router.use('/auth', authRouter);
router.use('/posts', postsRouter);
router.use('/tags', tagsRouter);
router.use('/uploads', uploadsRouter);

export default router;
