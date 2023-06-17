import { PostQuery, ResponsePostsPagination, ResponseProfile } from '@/types/responses.types';

import { api } from './api';

const profileApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<ResponseProfile, string>({
      query: (login) => `profiles/${login}`,
    }),
    getProfilePosts: builder.query<ResponsePostsPagination, PostQuery & { login: string }>({
      query: ({ login, tags, page = 1, limit = 20, sort = 'createdAt', order = 'desc' }) => {
        const tagQuery = tags ? `&${tags}` : '';
        return `posts/all/${login}?page=${page}&limit=${limit}&sort=${sort}&order=${order}${tagQuery}`;
      },
    }),
  }),
});

export const { useGetProfileQuery, useGetProfilePostsQuery } = profileApi;
