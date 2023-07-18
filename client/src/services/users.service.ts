import { IUpdateUserForm } from '@/components/sections/ProfileHeaderForm';
import { IResponsePostsPagination, IResponseProfile } from '@/types/responses.types';
import {
  IFollowersWithPagination,
  IFollowingWithPagination,
  IJoinedUsersWithPagination,
} from '@/types/user.types';

import { api, IAuthentication, IPaginationArg } from './api';
import { IPostQuery } from './post.service';

interface IToggleLikeArg extends IAuthentication {
  login: string;
}

interface IGetFollowArg extends IPaginationArg {
  login: string;
}
interface ISearchUsersByLoginArg extends IPaginationArg {
  login: string;
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
      providesTags: (result) =>
        result
          ? [...result.posts.map(({ id }) => ({ type: 'post' as const, id })), 'post', 'user']
          : ['post', 'user'],
    }),
    getFollowing: builder.query<IFollowingWithPagination, IGetFollowArg>({
      query: ({ login, page = 1, limit = 10 }) => {
        return `users/following/${login}?page=${page}&limit=${limit}`;
      },
      providesTags: (result) =>
        result
          ? [...result.following.map(({ id }) => ({ type: 'user' as const, id })), 'user']
          : ['user'],
    }),
    getFollowers: builder.query<IFollowersWithPagination, IGetFollowArg>({
      query: ({ login, page = 1, limit = 10 }) => {
        return `users/followers/${login}?page=${page}&limit=${limit}`;
      },
      providesTags: (result) =>
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
    searchUserByLogin: builder.mutation<IJoinedUsersWithPagination, ISearchUsersByLoginArg>({
      query: ({ login, page = 1, limit = 10 }) =>
        `users?login=${login}&page=${page}&limit=${limit}`,
    }),
    updateProfile: builder.mutation<IResponseProfile, IUpdateUserForm & IAuthentication>({
      query: ({ email, img, name, accessToken }) => ({
        url: 'users',
        method: 'PATCH',
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
        body: {
          email,
          img,
          name,
        },
      }),
      invalidatesTags: ['user', 'post'],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useGetLikedPostsQuery,
  useGetFollowingQuery,
  useGetFollowersQuery,
  useToggleFollowMutation,
  useSearchUserByLoginMutation,
  useUpdateProfileMutation,
} = profileApi;
