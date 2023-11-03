import { NextFunction, Request, Response } from 'express';
import { check } from 'express-validator';

export const createPostValidators = [
  check('text')
    .optional()
    .isString()
    .trim()
    .isLength({ min: 1, max: 290 })
    .withMessage('Text length must be between 1 and 290 characters'),
  check('img')
    .optional()
    .isString()
    .withMessage('The image must be sent in base64 format')
    .trim(),
  check('tags')
    .optional()
    .isString()
    .trim()
    .withMessage('Invalid tag format, string expected'),
  (req: Request, res: Response, next: NextFunction): Response | void => {
    if (!req.body.text && !req.body.img) {
      return res.status(400).json({
        message: 'Either text or img field is required',
      });
    }
    next();
  },
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
