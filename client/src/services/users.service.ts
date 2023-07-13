import { IResponsePostsPagination, IResponseProfile } from '@/types/responses.types';
import { IFollowersWithPagination, IFollowingWithPagination } from '@/types/user.types';

import { api } from './api';
import { IPostQuery } from './post.service';

interface IToggleLikeArg {
  accessToken: string;
  login: string;
}

interface IGetFollowArg {
  login: string;
  page: number;
  limit: number;
}

const profileApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<IResponseProfile, string>({
      query: (login) => `users/${login}`,
      providesTags: ['user', 'post'],
    }),
    getLikedPosts: builder.query<IResponsePostsPagination, IPostQuery & { login: string }>({
      query: ({ login, tags, page = 1, limit = 20, sort = 'createdAt', order = 'desc' }) => {
        const tagQuery = tags ? `&${tags}` : '';
        return `users/likedPosts/${login}?page=${page}&limit=${limit}&sort=${sort}&order=${order}${tagQuery}`;
      },
      providesTags: (result, error, arg) =>
        result
          ? [...result.posts.map(({ id }) => ({ type: 'post' as const, id })), 'post', 'user']
          : ['post', 'user'],
    }),
    getFollowing: builder.query<IFollowingWithPagination, IGetFollowArg>({
      query: ({ login, page = 1, limit = 10 }) => {
        return `users/following/${login}?page=${page}&limit=${limit}`;
      },
      providesTags: (result, error, arg) =>
        result
          ? [...result.following.map(({ id }) => ({ type: 'user' as const, id })), 'user']
          : ['user'],
    }),
    getFollowers: builder.query<IFollowersWithPagination, IGetFollowArg>({
      query: ({ login, page = 1, limit = 10 }) => {
        return `users/followers/${login}?page=${page}&limit=${limit}`;
      },
      providesTags: (result, error, arg) =>
        result
          ? [...result.followers.map(({ id }) => ({ type: 'user' as const, id })), 'user']
          : ['user'],
    }),
    toggleFollow: builder.mutation({
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

export const {
  useGetProfileQuery,
  useGetLikedPostsQuery,
  useGetFollowingQuery,
  useGetFollowersQuery,
  useToggleFollowMutation,
} = profileApi;
