import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

import { logOutThunk } from '@/store/actions/auth.actions';
import { setUserData } from '@/store/slices/user.slice';
import { RootState } from '@/store/store';
import { IResponseAuth } from '@/types/responses.types';

export interface IPagination {
  currentPage: number;
  totalPages: number;
}
export interface IPaginationArg {
  page?: number;
  limit?: number;
}

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

export const baseQuery = fetchBaseQuery({
  baseUrl: BASE_API_URL,
  prepareHeaders: (headers, { getState }) => {
    const { accessToken } = (getState() as RootState).user;
    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const { refreshToken } = (api.getState() as RootState).user;
    const refreshResult = await baseQuery(
      {
        url: '/auth/token',
        method: 'POST',
        body: { refreshToken },
      },
      api,
      extraOptions
    );

    if (refreshResult?.data) {
      api.dispatch(setUserData(refreshResult.data as IResponseAuth));

      result = await baseQuery(args, api, extraOptions); // retry the original query with new access token
    } else {
      api.dispatch(logOutThunk());
    }
  }

  return result;
};

export const api = createApi({
  reducerPath: 'api',
  tagTypes: ['post', 'comment', 'user', 'tag'],
  baseQuery: baseQueryWithReauth,
  // TODO refactor when it will be possible to leave endpoints empty
  endpoints: (builder) => ({
    instance: builder.query({
      query: () => '/',
    }),
  }),
});
