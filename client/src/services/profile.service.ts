import { ResponsePostsPagination, ResponseProfile } from '@/types/responses.types';

import { api } from './api';

const profileApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<ResponseProfile, string>({
      query: (login) => `profiles/${login}`,
    }),
    getProfilePosts: builder.query<ResponsePostsPagination, string>({
      query: (login) => `posts/all/${login}`,
    }),
  }),
});

export const { useGetProfileQuery, useGetProfilePostsQuery } = profileApi;
