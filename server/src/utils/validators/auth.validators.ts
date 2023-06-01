import { check } from 'express-validator';

export const registerValidators = [
  check('name', 'the minimum name length is 2 characters')
    .optional()
    .trim()
    .isLength({ min: 2 }),
  check('login', 'the minimum login length is 2 characters')
    .optional()
    .trim()
    .isLength({ min: 2 }),
  check('password', 'the minimum password length is 5 characters').trim().isLength({ min: 5 }),
  check('email', 'incorrect email format').trim().isEmail(),
];

export const loginValidators = [
  check('login', 'the minimum login length is 2 characters')
    .optional()
    .trim()
    .isLength({ min: 2 }),
  check('password', 'the minimum password length is 5 characters').trim().isLength({ min: 5 }),
];
