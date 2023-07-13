import React from 'react';

import CreatePost from '@/components/sections/CreatePost';
import Posts from '@/components/sections/Posts';
import { useAppSelector } from '@/hooks/reduxHooks';
import { useGetAllPostsQuery } from '@/services/post.service';
import formatTagsForQuery from '@/utils/formatTagsForQuery';

const Home: React.FC = () => {
  const { tags } = useAppSelector((state) => state.options);

  const tagsQuery = tags && formatTagsForQuery(tags);

  const { isLoading, isError, data } = useGetAllPostsQuery({ tags: tagsQuery });

  if (isLoading) return <div>loading</div>;
  if (isError) return <div>error</div>;

  return (
    <div className='flex flex-col gap-2'>
      <CreatePost />
      <Posts posts={data?.posts} />
    </div>
  );
};

export default Home;
