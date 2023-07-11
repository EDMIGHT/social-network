import { IResponsePostsPagination, IResponseProfile } from '@/types/responses.types';

import { api } from './api';
import { IPostQuery } from './post.service';

const profileApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<IResponseProfile, string>({
      query: (login) => `profiles/${login}`,
    }),
    getProfilePosts: builder.query<IResponsePostsPagination, IPostQuery & { login: string }>({
      query: ({ login, tags, page = 1, limit = 20, sort = 'createdAt', order = 'desc' }) => {
        const tagQuery = tags ? `&${tags}` : '';
        return `posts/all/${login}?page=${page}&limit=${limit}&sort=${sort}&order=${order}${tagQuery}`;
      },
    }),
  }),
});

export const { useGetProfileQuery, useGetProfilePostsQuery } = profileApi;
