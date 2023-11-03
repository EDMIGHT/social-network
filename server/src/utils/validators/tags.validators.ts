import { check } from 'express-validator';

export const createTagValidators = [
  check('name')
    .isString()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Name length must be between 1 and 100 characters'),
];

export const updateTagValidators = [
  check('name')
    .isString()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Name length must be between 1 and 100 characters'),
];
