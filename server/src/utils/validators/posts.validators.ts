import { check } from 'express-validator';

export const createPostValidators = [
  check('text', 'the minimum post text length is 1 character')
    .isString()
    .trim()
    .isLength({ min: 1 }),
  // check('tags', 'invalid tag format, string expected').isString().trim(),
  check('img', 'wrong path for image, , string expected').optional().isString(),
];

export const updatePostValidators = [
  check('text', 'the minimum post text length is 1 character')
    .optional()
    .isString()
    .trim()
    .isLength({ min: 1 }),
  // check('tags', 'invalid tag format, string expected').optional().isString(),
  check('img', 'wrong path for image, , string expected').optional().isString(),
];
