import express from 'express';

import { getLikedPosts, getProfile, toggleFollowUser } from '@/controllers/users.controllers';
import authentication from '@/middleware/authentication.middleware';

const router = express.Router({ mergeParams: true });

router.get('/:login', getProfile);
router.get('/likedPosts/:login', getLikedPosts);
router.get('/followers/:login');

router.post('/follow/:login', authentication, toggleFollowUser);
export default router;
