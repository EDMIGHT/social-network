import express from 'express';

import { registerUser } from '@/controllers/auth.controllers';
import { registerValidators } from '@/utils/validators/auth.validators';

const router = express.Router({ mergeParams: true });

router.post('/register', registerValidators, registerUser);

export default router;
