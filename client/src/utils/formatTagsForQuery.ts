import { Tag } from '@/types/tag.types';

const formatTagsForQuery = (tags: Tag[]) => {
  return `tags=${tags.reduce((query, tag) => `${query}${tag.name},`, '').slice(0, -1)}`;
};

export default formatTagsForQuery;
