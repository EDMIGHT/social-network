import express from 'express';

import {
  getFollowers,
  getFollowing,
  getLikedPosts,
  getProfile,
  searchUsers,
  toggleFollowUser,
} from '@/controllers/users.controllers';
import authentication from '@/middleware/authentication.middleware';

const router = express.Router({ mergeParams: true });

router.get('/', searchUsers);
router.get('/:login', getProfile);
router.get('/likedPosts/:login', getLikedPosts);
router.get('/followers/:login', getFollowers);
router.get('/following/:login', getFollowing);

router.post('/follow/:login', authentication, toggleFollowUser);

export default router;
