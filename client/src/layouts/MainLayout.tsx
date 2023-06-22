import React from 'react';
import { Outlet } from 'react-router-dom';

import Aside from '@/components/sections/Aside';
import Dashboard from '@/components/sections/Dashboard';
import Header from '@/components/sections/Header';

const MainLayout: React.FC = () => {
  return (
    <div className='mx-auto h-screen max-w-screen-xl p-3'>
      <Header />
      <div className='mt-2 grid grid-cols-layout gap-2'>
        <Dashboard />
        <Outlet />
        <Aside />
      </div>
    </div>
  );
};

export default MainLayout;
