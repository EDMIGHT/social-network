import express from 'express';

import { createTag, getAllTags, updateTag } from '@/controllers/tags.controllers';

const router = express.Router();

router.get('/', getAllTags);
router.post('/', createTag);
router.patch('/:id', updateTag);

export default router;
