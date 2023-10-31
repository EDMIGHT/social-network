import { check } from 'express-validator';

export const createTagValidators = [
  check('name', 'the minimum tag name length is 1 character')
    .isString()
    .trim()
    .isLength({ min: 1 }),
];

export const updateTagValidators = [
  check('name', 'the minimum tag name length is 1 character')
    .isString()
    .trim()
    .isLength({ min: 1 }),
];
