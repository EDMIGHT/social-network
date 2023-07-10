import express from 'express';

import { getAllComments } from '@/controllers/comments.controllers';

const router = express.Router({ mergeParams: true });

router.get('/', getAllComments);

export default router;
