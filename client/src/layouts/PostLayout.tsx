import React from 'react';
import { Outlet } from 'react-router-dom';

const PostLayout: React.FC = () => {
  return (
    <div className='mx-auto h-screen max-w-screen-xl p-3'>
      <Outlet />
    </div>
  );
};

export default PostLayout;
