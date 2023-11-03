import * as z from 'zod';

export const createTagValidation = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'The minimum text length 1 character')
    .max(190, 'The maximum text length 190 characters'),
});

export type ICreateTagFields = z.infer<typeof createTagValidation>;
