import express from 'express';

import authRouter from './auth.routes';
import commentsRouter from './comments.routes';
import postsRouter from './posts.routes';
import tagsRouter from './tags.routes';
import usersRouter from './users.routes';

const router = express.Router({ mergeParams: true });

router.use('/users', usersRouter);
router.use('/auth', authRouter);
router.use('/posts', postsRouter);
router.use('/tags', tagsRouter);
router.use('/comments', commentsRouter);

export default router;
