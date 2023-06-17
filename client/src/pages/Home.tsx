import React from 'react';

import Posts from '@/components/sections/Posts';
import { useGetAllPostsQuery } from '@/services/api';

const Home: React.FC = () => {
  const { isLoading, isError, isSuccess, data } = useGetAllPostsQuery({}, {});

  if (isLoading) return <div>loading</div>;
  if (isError) return <div>error</div>;

  return (
    <div className=''>
      <Posts posts={data?.posts} />
    </div>
  );
};

export default Home;
