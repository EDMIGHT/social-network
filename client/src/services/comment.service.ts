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
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'comment' as const, id })), 'comment']
          : ['comment'],
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
      // invalidatesTags: (result, error, arg) => [{ type: 'comment', id: result.id }],
      invalidatesTags: ['comment'],
    }),
  }),
});

export const { useGetCommentsQuery, useCreateCommentMutation } = commentApi;
