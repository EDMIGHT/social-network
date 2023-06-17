import React from 'react';

import Posts from '@/components/sections/Posts';
import { useAppSelector } from '@/hooks/reduxHooks';
import { useGetAllPostsQuery } from '@/services/api';
import formatTagsForQuery from '@/utils/formatTagsForQuery';

const Home: React.FC = () => {
  const { tags } = useAppSelector((state) => state.options);

  const tagsQuery = tags && formatTagsForQuery(tags);

  const { isLoading, isError, isSuccess, data } = useGetAllPostsQuery({ tags: tagsQuery }, {});

  if (isLoading) return <div>loading</div>;
  if (isError) return <div>error</div>;

  return (
    <div className=''>
      <Posts posts={data?.posts} />
    </div>
  );
};

export default Home;
