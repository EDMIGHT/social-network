import { IResponsePostsPagination, IResponseProfile } from '@/types/responses.types';

import { api } from './api';
import { IPostQuery } from './post.service';

interface IToggleLikeArg {
  accessToken: string;
  login: string;
}

const profileApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<IResponseProfile, string>({
      query: (login) => `users/${login}`,
      providesTags: ['user'],
    }),
    getLikedPosts: builder.query<IResponsePostsPagination, IPostQuery & { login: string }>({
      query: ({ login, tags, page = 1, limit = 20, sort = 'createdAt', order = 'desc' }) => {
        const tagQuery = tags ? `&${tags}` : '';
        return `users/likedPosts/${login}?page=${page}&limit=${limit}&sort=${sort}&order=${order}${tagQuery}`;
      },
    }),
    toggleLike: builder.mutation({
      query: ({ accessToken, login }: IToggleLikeArg) => {
        return {
          url: `users/follow/${login}`,
          method: 'POST',
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      invalidatesTags: ['user'],
    }),
  }),
});

export const { useGetProfileQuery, useGetLikedPostsQuery, useToggleLikeMutation } = profileApi;
