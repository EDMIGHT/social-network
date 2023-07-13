import React from 'react';
import { useParams } from 'react-router-dom';

import Typography from '@/components/ui/Typography';
import { useAppSelector } from '@/hooks/reduxHooks';
import { useGetAllPostsQuery } from '@/services/post.service';
import formatTagsForQuery from '@/utils/formatTagsForQuery';

import Posts from './Posts';

const UserPosts: React.FC = () => {
  const { login } = useParams();
  const { tags } = useAppSelector((state) => state.options);

  const tagsQuery = tags && formatTagsForQuery(tags);

  const { data, isSuccess } = useGetAllPostsQuery({
    login: login as string,
    tags: tagsQuery,
  });

  if (isSuccess) {
    return <Posts posts={data?.posts} />;
  }
  return <div> loading</div>;
};

export default UserPosts;
