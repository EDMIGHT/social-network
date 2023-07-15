import { check, oneOf } from 'express-validator';

export const createPostValidators = [
  oneOf([
    check('text')
      .exists()
      .withMessage('text field is required')
      .isString()
      .withMessage('the minimum post text length is 1 character')
      .trim()
      .isLength({ min: 1 }),
    check('img')
      .exists()
      .withMessage('img field is required')
      .isString()
      .withMessage('wrong path for image, string expected')
      .trim(),
  ]),
  check('tags', 'invalid tag format, string expected').optional().isString().trim(),
];

export const updatePostValidators = [
  check('img')
    .optional()
    .isString()
    .withMessage('wrong path for image, string expected')
    .trim(),
];
