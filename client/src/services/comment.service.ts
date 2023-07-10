import { ICommentWithUser } from '@/types/comment.types';

import { api } from './api';

interface IGetCommentsForPostArg {
  id: string;
}

const commentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCommentsForPost: builder.query<ICommentWithUser[], IGetCommentsForPostArg>({
      query: ({ id }) => ({
        url: `comments/${id}`,
      }),
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'comment' as const, id })), 'comment']
          : ['comment'],
    }),
  }),
});

export const { useGetCommentsForPostQuery } = commentApi;
