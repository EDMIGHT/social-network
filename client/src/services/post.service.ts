import { CreatePostQuery, Post } from '@/types/post.types';
import { PostQuery, ResponsePostsPagination } from '@/types/responses.types';

import { api } from './api';

const postApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllPosts: builder.query<ResponsePostsPagination, PostQuery>({
      query: ({ tags, page = 1, limit = 20, sort = 'createdAt', order = 'desc' }) => {
        const tagQuery = tags ? `&${tags}` : '';
        return `posts/all?page=${page}&limit=${limit}&sort=${sort}&order=${order}${tagQuery}`;
      },
      providesTags: (result, error) => [
        {
          type: 'post',
        },
      ],
    }),
    createPost: builder.mutation<Post, CreatePostQuery>({
      query: ({ accessToken, ...body }) => ({
        url: 'posts',
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
        method: 'POST',
        body,
      }),
      invalidatesTags: () => [
        {
          type: 'post',
        },
      ],
    }),
  }),
});

export const { useGetAllPostsQuery, useCreatePostMutation } = postApi;
