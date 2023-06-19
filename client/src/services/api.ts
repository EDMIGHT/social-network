import { FetchArgs } from '@reduxjs/toolkit/dist/query/fetchBaseQuery';
import { BaseQueryFn, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import useLocalStorage from '@/hooks/useLocalStorage';
import { PostQuery, ResponsePostsPagination } from '@/types/responses.types';

export const baseQuery = fetchBaseQuery({ baseUrl: 'http://localhost:3001/api/' });

// const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, any> = async (
//   args,
//   api,
//   extraOptions
// ) => {
//   let result = await baseQuery(args, api, extraOptions);

//   if (result.error && result.error.status === 401) {
//     // попытка получить новый токен
//     const refreshResult = await baseQuery(
//       {
//         url: '/auth/token',
//         method: 'POST',
//         body: { refreshToken: localStorage.getItem('refreshToken') },
//       },
//       api,
//       extraOptions
//     );

//     if (refreshResult.data) {
//       // сохранение нового токена
//       localStorage.setItem('accessToken', refreshResult.data.accessToken);
//       localStorage.setItem('refreshToken', refreshResult.data.refreshToken);

//       // повторный запрос с новым access токеном
//       result = await baseQuery(args, api, extraOptions);
//     } else {
//       // обработка ошибки обновления токена
//     }
//   }

//   return result;
// };

export const api = createApi({
  reducerPath: 'api',
  // baseQuery: baseQueryWithReauth,
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
