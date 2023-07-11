import { ICommentWithUser, ICreateCommentForm } from '@/types/comment.types';

import { api } from './api';

interface IGetCommentsForPostArg {
  id: string;
}

interface ICreateCommentArg extends ICreateCommentForm {
  id: string;
  accessToken: string;
}

const commentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query<ICommentWithUser[], IGetCommentsForPostArg>({
      query: ({ id }) => ({
        url: `comments/${id}`,
      }),
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'post' as const, id })),
              'post',
              { type: 'post', id: arg.id },
            ]
          : ['comment', { type: 'post', id: arg.id }],
    }),
    createComment: builder.mutation<ICommentWithUser, ICreateCommentArg>({
      query: ({ id, accessToken, text }) => ({
        url: `comments/${id}`,
        method: 'POST',
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
        body: {
          text,
        },
      }),
      invalidatesTags: (result, error, arg) =>
        result
          ? [
              { type: 'comment', id: result.id },
              { type: 'post', id: arg.id },
            ]
          : ['comment', { type: 'post', id: arg.id }],
    }),
  }),
});

export const { useGetCommentsQuery, useCreateCommentMutation } = commentApi;
