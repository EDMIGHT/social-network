import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL || 'http://localhost:3001/api/';

export const baseQuery = fetchBaseQuery({ baseUrl: BASE_API_URL });

export interface IPagination {
  currentPage: number;
  totalPages: number;
}
export interface IPaginationArg {
  page?: number;
  limit?: number;
}

export const api = createApi({
  reducerPath: 'api',
  tagTypes: ['post', 'comment', 'user', 'tag'],
  baseQuery,
  // TODO зарефакторить, когда можно будет оставлять endpoints пустым
  endpoints: (builder) => ({
    instance: builder.query({
      query: () => '/',
    }),
  }),
});
