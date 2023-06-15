import { ResponseProfile } from '@/types/responses.types';

import { api } from './api';

const profileApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<ResponseProfile, string>({
      query: (login) => `profiles/${login}`,
    }),
  }),
});

export const { useGetProfileQuery } = profileApi;
