import { ILoginForm } from '@/components/sections/LoginForm';
import { ResponseAuth } from '@/types/user.types';

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
      query: ({ ...body }) => ({ url: '/auth/login', method: 'POST', body }),
      // transformErrorResponse: (response: { status: string | number }, meta, arg) =>
      //   response.status,
    }),
  }),
});

export const {
  useLoginMutation,
  endpoints: { login },
} = authApi;
