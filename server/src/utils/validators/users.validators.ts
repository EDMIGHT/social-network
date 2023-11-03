import { check } from 'express-validator';

export const updateUserValidators = [
  check('name')
    .optional()
    .isString()
    .trim()
    .isLength({ min: 2 })
    .withMessage('the minimum name length is 2 character')
    .isLength({ max: 100 })
    .withMessage('the maximum name length is 100 character'),
  check('email')
    .optional()
    .isString()
    .trim()
    .isLength({ min: 5 })
    .withMessage('the minimum email length is 5 character')
    .isLength({ max: 100 })
    .withMessage('the maximum email length is 100 character'),
  check('img')
    .optional()
    .isString()
    .withMessage('wrong path for image, string expected')
    .trim(),
];
