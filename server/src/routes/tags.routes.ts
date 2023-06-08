import express from 'express';

import { getAllTags } from '@/controllers/tags.controllers';

const router = express.Router();

router.get('/', getAllTags);

export default router;
