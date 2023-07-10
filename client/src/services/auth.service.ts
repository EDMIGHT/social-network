import { ILoginForm } from '@/components/sections/LoginForm';
import { IResponseAuth, IResponseUser } from '@/types/responses.types';

import { api } from './api';

export interface ILoginQuery {
  data?: IResponseAuth;
  error?: {
    data: {
      message: string;
    };
    status: number;
  };
}

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<ILoginQuery, ILoginForm>({
      query: ({ ...body }) => ({ url: 'auth/login', method: 'POST', body }),
    }),
    authMe: builder.query<IResponseUser, string>({
      query: (accessToken) => ({
        url: 'auth/me',
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }),
    }),
    token: builder.mutation<ILoginQuery, string>({
      query: (refreshToken) => ({ url: 'auth/token', method: 'POST', refreshToken }),
    }),
  }),
});

export const { useLoginMutation, useAuthMeQuery, useTokenMutation } = authApi;
