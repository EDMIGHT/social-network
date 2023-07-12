import { Tag } from '@/types/tag.types';

import { api } from './api';

export const tagsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllTags: builder.query<Tag[], null>({
      query: () => 'tags',
    }),
    getTagByName: builder.mutation<Tag[], string>({
      query: (name) => `tags?name=${name}`,
    }),
  }),
});

export const { useGetAllTagsQuery, useGetTagByNameMutation } = tagsApi;
