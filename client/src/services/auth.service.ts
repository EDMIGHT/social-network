import { ISignInForm } from '@/components/form/SignInForm';
import { ISignUpForm } from '@/components/form/SignUpForm';
import { IResponseAuth, IResponseUser } from '@/types/responses.types';

import { api } from './api';

export interface IAuthQuery {
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
    login: builder.mutation<IAuthQuery, ISignInForm>({
      query: ({ ...body }) => ({ url: 'auth/login', method: 'POST', body }),
    }),
    register: builder.mutation<IAuthQuery, ISignUpForm>({
      query: ({ ...body }) => ({ url: 'auth/register', method: 'POST', body }),
    }),
    authMe: builder.mutation<IResponseUser, null>({
      query: () => ({
        url: 'auth/me',
      }),
    }),
    token: builder.mutation<IAuthQuery, string>({
      query: (refreshToken) => ({ url: 'auth/token', method: 'POST', refreshToken }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useAuthMeMutation, useTokenMutation } =
  authApi;
