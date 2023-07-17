import express from 'express';

import {
  getFollowers,
  getFollowing,
  getLikedPosts,
  getProfile,
  searchUsers,
  toggleFollowUser,
  updateUser,
} from '@/controllers/users.controllers';
import authentication from '@/middleware/authentication.middleware';
import validationHandler from '@/middleware/validationHandler.middleware';
import { updateUserValidators } from '@/utils/validators/users.validators';

const router = express.Router({ mergeParams: true });

router.get('/', searchUsers);
router.get('/:login', getProfile);
router.get('/likedPosts/:login', getLikedPosts);
router.get('/followers/:login', getFollowers);
router.get('/following/:login', getFollowing);

router.post('/follow/:login', authentication, toggleFollowUser);

router.patch('/', authentication, updateUserValidators, validationHandler, updateUser);

export default router;
