import React from 'react';
import { Outlet } from 'react-router-dom';

import Dashboard from '@/components/sections/Dashboard';
import Header from '@/components/sections/Header';

const MainLayout: React.FC = () => {
  return (
    <div className='mx-auto h-screen max-w-screen-xl p-3'>
      <Header />
      <div className='mt-2 grid grid-cols-layout grid-rows-layout gap-2'>
        <Dashboard />
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
