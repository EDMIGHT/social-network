import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { PostQuery, ResponsePostsPagination } from '@/types/responses.types';

export const baseQuery = fetchBaseQuery({ baseUrl: 'http://localhost:3001/api/' });

export const api = createApi({
  reducerPath: 'api',
  baseQuery,
  // ! зарефакторить, когда можно будет оставлять endpoints пустым
  endpoints: (builder) => ({
    getAllPosts: builder.query<ResponsePostsPagination, PostQuery>({
      query: ({ tags, page = 1, limit = 20, sort = 'createdAt', order = 'desc' }) => {
        const tagQuery = tags ? `&${tags}` : '';
        return `posts/all?page=${page}&limit=${limit}&sort=${sort}&order=${order}${tagQuery}`;
      },
    }),
  }),
});

export const { useGetAllPostsQuery } = api;
