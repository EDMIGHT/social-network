import express from 'express';

import { getProfile } from '@/controllers/profiles.controllers';

const router = express.Router({ mergeParams: true });

router.get('/:login', getProfile);

export default router;
