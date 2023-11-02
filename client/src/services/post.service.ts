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
  text?: string;
  tags?: string;
  img?: string;
}

export interface IDeletePostQuery {
  id: string;
}

const postApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllPosts: builder.query<IResponsePostsPagination, IPostQuery>({
      query: ({ tags, page = 1, limit = 10, sort = 'createdAt', order = 'desc', login }) => {
        const tagQuery = tags ? `&${tags}` : '';
        const loginQuery = login ? `/${login}` : '';
        return `posts/all${loginQuery}?page=${page}&limit=${limit}&sort=${sort}&order=${order}${tagQuery}`;
      },
      providesTags: (result) =>
        result
          ? [...result.posts.map(({ id }) => ({ type: 'post' as const, id })), 'post']
          : ['post'],
    }),
    getPost: builder.query<IResponsePost, string>({
      query: (id) => `posts/${id}`,
      providesTags: (result) => (result ? [{ type: 'post', id: result.id }] : ['post']),
    }),
    createPost: builder.mutation<Post, ICreatePostQuery>({
      query: ({ ...body }) => ({
        url: 'posts',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['post'],
    }),
    deletePost: builder.mutation<null, IDeletePostQuery>({
      query: ({ id }) => ({
        url: `posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, _, arg) =>
        result ? [{ type: 'post', id: arg.id }] : ['post'],
    }),
    updatePost: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `posts/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (result, _, arg) =>
        result ? [{ type: 'post', id: arg.id }] : ['post'],
    }),
    likePost: builder.mutation({
      query: ({ id }) => ({
        url: `posts/like/${id}`,
        method: 'POST',
      }),
      invalidatesTags: (result, _, arg) =>
        result ? [{ type: 'post', id: arg.id }, 'user'] : ['post', 'user'],
    }),
    increaseViewPost: builder.mutation({
      query: ({ id }) => ({
        url: `posts/view/${id}`,
        method: 'POST',
      }),
      invalidatesTags: (result, _, arg) =>
        result ? [{ type: 'post', id: arg.id }] : ['post'],
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
  useIncreaseViewPostMutation,
} = postApi;
