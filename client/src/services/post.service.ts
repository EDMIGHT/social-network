import { Post } from '@/types/post.types';
import { IResponsePost, IResponsePostsPagination } from '@/types/responses.types';

import { api, IPaginationArg } from './api';

type SortPost = 'title' | 'createdAt' | 'updatedAt' | 'viewsCount';

export interface IPostQuery extends IPaginationArg {
  login?: string;
  tags?: string;
  sort?: SortPost;
  order?: 'asc' | 'desc';
}

export interface ICreatePostQuery {
  accessToken: string;
  text: string;
  tags?: string;
  img: string | null;
}

export interface IDeletePostQuery {
  id: string;
  accessToken: string;
}

const postApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllPosts: builder.query<IResponsePostsPagination, IPostQuery>({
      query: ({ tags, page = 1, limit = 10, sort = 'createdAt', order = 'desc', login }) => {
        const tagQuery = tags ? `&${tags}` : '';
        const loginQuery = login ? `/${login}` : '';
        return `posts/all${loginQuery}?page=${page}&limit=${limit}&sort=${sort}&order=${order}${tagQuery}`;
      },
      providesTags: (result, error, arg) =>
        result
          ? [...result.posts.map(({ id }) => ({ type: 'post' as const, id })), 'post']
          : ['post'],
    }),
    getPost: builder.query<IResponsePost, string>({
      query: (id) => `posts/${id}`,
      providesTags: (result, error, arg) =>
        result ? [{ type: 'post', id: result.id }] : ['post'],
    }),
    createPost: builder.mutation<Post, ICreatePostQuery>({
      query: ({ accessToken, ...body }) => ({
        url: 'posts',
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
        method: 'POST',
        body,
      }),
      // invalidatesTags: (result, error, arg) =>
      //   result ? [{ type: 'post', id: result.id }] : ['post'],
      invalidatesTags: ['post'],
    }),
    deletePost: builder.mutation<null, IDeletePostQuery>({
      query: ({ id, accessToken }) => ({
        url: `posts/${id}`,
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }),
      invalidatesTags: (result, error, arg) =>
        result ? [{ type: 'post', id: arg.id }] : ['post'],
    }),
    updatePost: builder.mutation({
      query: ({ accessToken, id, ...body }) => ({
        url: `posts/${id}`,
        method: 'PATCH',
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
        body,
      }),
      invalidatesTags: (result, error, arg) =>
        result ? [{ type: 'post', id: arg.id }] : ['post'],
    }),
    likePost: builder.mutation({
      query: ({ accessToken, id }) => ({
        url: `posts/like/${id}`,
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
        method: 'POST',
      }),
      invalidatesTags: (result, error, arg) =>
        result ? [{ type: 'post', id: arg.id }, 'user'] : ['post', 'user'],
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useGetPostQuery,
  useCreatePostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
  useLikePostMutation,
} = postApi;
