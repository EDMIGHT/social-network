import { check, oneOf } from 'express-validator';

export const createPostValidators = [
  oneOf([
    check('text')
      .exists()
      .withMessage('text field is required')
      .isString()
      .trim()
      .isLength({ min: 1 })
      .withMessage('the minimum post text length is 1 character')
      .isLength({ max: 290 })
      .withMessage('the maximum post text length is 280 character'),
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
  check('text')
    .optional()
    .isLength({ max: 290 })
    .withMessage('the maximum post text length is 280 character'),
  check('tags', 'invalid tag format, string expected').optional().isString().trim(),
  check('img')
    .optional()
    .trim()
    .isString()
    .withMessage('wrong path for image, string expected'),
];
