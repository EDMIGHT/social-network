import { Tag } from '@/types/tag.types';

import { api } from './api';

interface ICreateTagArg {
  name: string;
  accessToken: string;
}

export const tagsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllTags: builder.query<Tag[], null>({
      query: () => 'tags',
      providesTags: (result) =>
        result ? [...result.map(({ id }) => ({ type: 'tag' as const, id })), 'tag'] : ['tag'],
    }),
    getTagByName: builder.mutation<Tag[], string>({
      query: (name) => `tags?name=${name}`,
      invalidatesTags: (result) =>
        result ? [...result.map(({ id }) => ({ type: 'tag' as const, id })), 'tag'] : ['tag'],
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
