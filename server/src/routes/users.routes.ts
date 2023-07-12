import express from 'express';

import { getLikedPosts, getProfile } from '@/controllers/users.controllers';

const router = express.Router({ mergeParams: true });

router.get('/:login', getProfile);
router.get('/likedPosts/:login', getLikedPosts);
router.get('/followers/:login');

export default router;
