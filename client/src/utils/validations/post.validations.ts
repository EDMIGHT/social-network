import * as z from 'zod';

const PostBase = z
  .object({
    text: z
      .string()
      .trim()
      .max(280, 'The maximum post length 280 characters')
      .optional()
      .or(z.literal('').transform((e) => (e === '' ? undefined : e))),
    img: z
      .string()
      .trim()
      .optional()
      .or(z.literal('').transform((e) => (e === '' ? undefined : e))),
    tags: z
      .string()
      .trim()
      .optional()
      .or(z.literal('').transform((e) => (e === '' ? undefined : e))),
  })
  .refine((data) => data.text || data.img, {
    message: 'You must add at least some content to create a post (text or image)',
    path: ['text'],
  });

export const createPostValidation = PostBase;

export type ICreatePostFields = z.infer<typeof createPostValidation>;

export const editPostValidation = PostBase;

export type IEditPostFields = z.infer<typeof editPostValidation>;
