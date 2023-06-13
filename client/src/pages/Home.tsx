import React from 'react';

import Posts from '@/components/sections/Posts';
import { useGetAllPostsQuery } from '@/store/api/api';

const Home: React.FC = () => {
  return (
    <div className=''>
      <Posts />
    </div>
  );
};

export default Home;
