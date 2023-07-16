import { IResponseTagsWithPagination } from '@/types/responses.types';
import { Tag } from '@/types/tag.types';

import { api, IPaginationArg } from './api';

interface ICreateTagArg {
  name: string;
  accessToken: string;
}

interface IGetAllTags extends IPaginationArg {
  name?: string;
  sort?: string;
  order?: 'asc' | 'desc';
}

export const tagsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllTags: builder.query<IResponseTagsWithPagination, IGetAllTags>({
      query: ({ page = 1, limit = 40, name, order = 'asc', sort = 'name' }) =>
        `tags?page=${page}&limit=${limit}&sort=${sort}&order=${order}&name=${name}`,
      providesTags: (result) =>
        result
          ? [...result.tags.map(({ id }) => ({ type: 'tag' as const, id })), 'tag']
          : ['tag'],
    }),
    getTagByName: builder.mutation<IResponseTagsWithPagination, string>({
      query: (name) => `tags?name=${name}`,
      invalidatesTags: (result) =>
        result
          ? [...result.tags.map(({ id }) => ({ type: 'tag' as const, id })), 'tag']
          : ['tag'],
    }),
    createTag: builder.mutation<Tag, ICreateTagArg>({
      query: ({ name, accessToken }) => ({
        url: 'tags',
        method: 'POST',
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
        body: {
          name,
        },
      }),
      invalidatesTags: ['tag'],
    }),
  }),
});

export const { useGetAllTagsQuery, useGetTagByNameMutation, useCreateTagMutation } = tagsApi;
