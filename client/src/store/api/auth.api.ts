import { ILoginForm } from '@/components/sections/LoginForm';
import { ResponseAuth, ResponseUser } from '@/types/user.types';

import { api } from './api';

export interface ILoginQuery {
  data?: ResponseAuth;
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
    authMe: builder.query<ResponseUser, string>({
      query: (accessToken) => ({
        url: 'auth/me',
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }),
    }),
  }),
});

export const { useLoginMutation, useAuthMeQuery } = authApi;
