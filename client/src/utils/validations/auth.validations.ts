import * as z from 'zod';

const credentialsValidation = z.object({
  login: z
    .string()
    .trim()
    .min(2, 'The minimum login length is 2 characters')
    .max(100, 'The maximum login length is 100 characters'),
  password: z
    .string()
    .trim()
    .min(5, 'The minimum password length is 5 characters')
    .max(100, 'The maximum password length is 100 characters'),
});

export const userBaseInfoValidation = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'The minimum name length is 2 characters')
    .max(100, 'The maximum name length is 100 characters')
    .optional()
    .or(z.literal('').transform((e) => (e === '' ? undefined : e))),
  email: z
    .string()
    .email('You entered the wrong email')
    .trim()
    .max(100, 'the maximum email length is 100 characters')
    .optional()
    .or(z.literal('').transform((e) => (e === '' ? undefined : e))),
  img: z
    .string()
    .trim()
    .optional()
    .or(z.literal('').transform((e) => (e === '' ? undefined : e))),
});

export const signInValidation = credentialsValidation;

export type ISignInFields = z.infer<typeof signInValidation>;

export const signUpValidation = credentialsValidation.and(userBaseInfoValidation);

export type ISignUpFields = z.infer<typeof signUpValidation>;
