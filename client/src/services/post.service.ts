import { Post } from '@/types/post.types';
import {
  IBadResponse,
  IResponsePost,
  IResponsePostsPagination,
} from '@/types/responses.types';

import { api } from './api';

type SortPost = 'title' | 'createdAt' | 'updatedAt' | 'viewsCount';

export interface IPostQuery {
  tags?: string;
  page?: number;
  limit?: number;
  sort?: SortPost;
  order?: 'asc' | 'desc';
}

export interface ICreatePostQuery {
  accessToken: string;
  text: string;
  tags: string;
  img?: string;
}

const postApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllPosts: builder.query<IResponsePostsPagination, IPostQuery>({
      query: ({ tags, page = 1, limit = 20, sort = 'createdAt', order = 'desc' }) => {
        const tagQuery = tags ? `&${tags}` : '';
        return `posts/all?page=${page}&limit=${limit}&sort=${sort}&order=${order}${tagQuery}`;
      },
      providesTags: [
        {
          type: 'post',
        },
      ],
    }),
    getPost: builder.query<IResponsePost | IBadResponse, string>({
      query: (id) => `posts/${id}`,
      providesTags: ['post'],
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
      invalidatesTags: [
        {
          type: 'post',
        },
      ],
    }),
    likePost: builder.mutation({
      query: ({ accessToken, id }) => ({
        url: `posts/like/${id}`,
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
        method: 'POST',
      }),
      invalidatesTags: [
        {
          type: 'post',
        },
      ],
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useGetPostQuery,
  useCreatePostMutation,
  useLikePostMutation,
} = postApi;
