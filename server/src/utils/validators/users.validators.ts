import { check, oneOf } from 'express-validator';

export const updateUserValidators = [
  oneOf([
    check('name')
      .exists()
      .withMessage('text field is required')
      .isString()
      .isLength({ min: 2 })
      .withMessage('the minimum name length is 2 character')
      .isLength({ max: 100 })
      .withMessage('the maximum name length is 100 character'),
    check('email')
      .exists()
      .withMessage('email field is required')
      .isString()
      .isLength({ min: 5 })
      .withMessage('the minimum email length is 5 character')
      .isLength({ max: 100 })
      .withMessage('the maximum email length is 100 character'),
    check('img')
      .exists()
      .withMessage('img field is required')
      .isString()
      .withMessage('wrong path for image, string expected')
      .trim(),
  ]),
];
