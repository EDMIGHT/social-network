import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from '@/components/sections/Header';

const MainLayout: React.FC = () => {
  return (
    <div className='mx-auto grid h-screen max-w-screen-xl grid-rows-layout p-3'>
      <Header />
      <Outlet />
    </div>
  );
};

export default MainLayout;
