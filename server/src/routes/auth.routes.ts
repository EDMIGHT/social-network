import express from 'express';

import { loginUser, registerUser } from '@/controllers/auth.controllers';
import { loginValidators, registerValidators } from '@/utils/validators/auth.validators';

const router = express.Router({ mergeParams: true });

router.post('/register', registerValidators, registerUser);
router.post('/login', loginValidators, loginUser);

export default router;
