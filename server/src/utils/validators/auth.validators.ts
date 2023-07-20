import { check } from 'express-validator';

export const registerValidators = [
  check('name')
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage('The minimum name length is 2 characters')
    .isLength({ max: 100 })
    .withMessage('The maximum name length is 100 characters'),
  check('login')
    .trim()
    .isLength({ min: 2 })
    .withMessage('The minimum login length is 2 characters')
    .isLength({ max: 100 })
    .withMessage('The maximum login length is 100 characters'),
  check('password')
    .trim()
    .isLength({ min: 5 })
    .withMessage('The minimum password length is 5 characters')
    .isLength({ max: 100 })
    .withMessage('The maximum password length is 100 characters'),
  check('img')
    .isString()
    .withMessage('img must be a string')
    .trim()
    .isLength({ max: 190 })
    .withMessage('The maximum img length is 190 characters'),
  check('email')
    .optional()
    .trim()
    .isEmail()
    .withMessage('Incorrect email format')
    .isLength({ max: 100 })
    .withMessage('The maximum email length is 100 characters'),
];

export const loginValidators = [
  check('login')
    .trim()
    .isLength({ min: 2 })
    .withMessage('The minimum login length is 2 characters')
    .isLength({ max: 100 })
    .withMessage('The maximum login length is 100 characters'),
  check('password')
    .trim()
    .isLength({ min: 5 })
    .withMessage('The minimum password length is 5 characters')
    .isLength({ max: 100 })
    .withMessage('The maximum password length is 100 characters'),
];
