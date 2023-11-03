import { check } from 'express-validator';

export const createCommentValidators = [
  check('text')
    .isString()
    .trim()
    .isLength({ min: 1, max: 190 })
    .withMessage('Text length must be between 1 and 190 characters'),
];
