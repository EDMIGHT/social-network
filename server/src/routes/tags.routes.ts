import express from 'express';

import { createTag, getAllTags, updateTag } from '@/controllers/tags.controllers';
import authentication from '@/middleware/authentication.middleware';
import { createTagValidators, updateTagValidators } from '@/utils/validators/tags.validators';

const router = express.Router();

router.get('/', getAllTags);
router.post('/', authentication, createTagValidators, createTag);
router.patch('/:id', authentication, updateTagValidators, updateTag);

export default router;
