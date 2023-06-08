import express from 'express';

import { createTag, getAllTags } from '@/controllers/tags.controllers';

const router = express.Router();

router.get('/', getAllTags);
router.post('/', createTag);

export default router;
