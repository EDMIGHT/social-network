import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseQuery = fetchBaseQuery({ baseUrl: 'http://localhost:3001/api/' });

export const api = createApi({
  reducerPath: 'api',
  tagTypes: ['post'],
  baseQuery,
  // ! зарефакторить, когда можно будет оставлять endpoints пустым
  endpoints: (builder) => ({
    instance: builder.query({
      query: () => '/',
    }),
  }),
});
