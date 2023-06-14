import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { PostQuery, ResponseGetAllPost } from '@/types/post.types';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/api/' }),
  endpoints: (builder) => ({
    getAllPosts: builder.query<ResponseGetAllPost, PostQuery>({
      query: ({ tags, page = 1, limit = 20, sort = 'createdAt', order = 'desc' }) => {
        const tagQuery = tags ? `&${tags}` : '';
        return `posts/all?page=${page}&limit=${limit}&sort=${sort}&order=${order}${tagQuery}`;
      },
    }),
  }),
});

export const { useGetAllPostsQuery } = api;
