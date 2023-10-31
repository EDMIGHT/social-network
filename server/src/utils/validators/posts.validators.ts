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
      .withMessage('the maximum post text length is 290 character'),
    check('img')
      .exists()
      .withMessage('img field is required')
      .isString()
      .withMessage('The image must be sent in base64 format')
      .trim(),
  ]),
  check('tags', 'invalid tag format, string expected').optional().isString().trim(),
];

export const updatePostValidators = [
  check('text')
    .optional()
    .isLength({ max: 290 })
    .withMessage('the maximum post text length is 290 character'),
  check('tags', 'invalid tag format, string expected').optional().isString().trim(),
  check('img')
    .optional()
    .isString()
    .withMessage('The image must be sent in base64 format')
    .trim(),
];
