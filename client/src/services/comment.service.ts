import { ICommentWithUser, ICreateCommentForm } from '@/types/comment.types';
import { IResponseCommentsByUser } from '@/types/responses.types';

import { api, IPaginationArg } from './api';

interface IGetCommentsForPostArg extends IPaginationArg {
  id: string;
}

interface ICreateCommentArg extends ICreateCommentForm {
  id: string;
}

interface IDeleteCommentArg {
  postId: string;
  commentId: string;
}

const commentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query<IResponseCommentsByUser, IGetCommentsForPostArg>({
      query: ({ id, page = 1, limit = 5 }) => ({
        url: `comments/${id}?page=${page}&limit=${limit}`,
      }),
      providesTags: (result, _, arg) =>
        result
          ? [
              ...result.comments.map(({ id }) => ({ type: 'post' as const, id })),
              'post',
              { type: 'post', id: arg.id },
            ]
          : ['comment', { type: 'post', id: arg.id }],
    }),
    createComment: builder.mutation<ICommentWithUser, ICreateCommentArg>({
      query: ({ id, text }) => ({
        url: `comments/${id}`,
        method: 'POST',
        body: {
          text,
        },
      }),
      invalidatesTags: (result, _, arg) =>
        result
          ? [
              { type: 'comment', id: result.id },
              { type: 'post', id: arg.id },
            ]
          : ['comment', { type: 'post', id: arg.id }],
    }),
    deleteComment: builder.mutation<null, IDeleteCommentArg>({
      query: ({ postId, commentId }) => ({
        url: `comments/${postId}/${commentId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, _, arg) =>
        result
          ? [
              { type: 'comment', id: arg.commentId },
              { type: 'post', id: arg.postId },
            ]
          : ['comment', { type: 'post', id: arg.postId }],
    }),
  }),
});

export const { useGetCommentsQuery, useCreateCommentMutation, useDeleteCommentMutation } =
  commentApi;
