import { IResponseAuth, IResponseUser } from '@/types/responses.types';
import { ISignInFields, ISignUpFields } from '@/utils/validations/auth.validations';

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
    login: builder.mutation<IResponseAuth, ISignInFields>({
      query: ({ ...body }) => ({ url: 'auth/login', method: 'POST', body }),
    }),
    register: builder.mutation<IResponseAuth, ISignUpFields>({
      query: ({ ...body }) => ({ url: 'auth/register', method: 'POST', body }),
    }),
    authMe: builder.mutation<IResponseUser, null>({
      query: () => ({
        url: 'auth/me',
      }),
    }),
    token: builder.mutation<IResponseAuth, string>({
      query: (refreshToken) => ({ url: 'auth/token', method: 'POST', refreshToken }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useAuthMeMutation, useTokenMutation } =
  authApi;
