import React from 'react';
import { Outlet } from 'react-router-dom';

import Aside from '@/components/Aside';
import Dashboard from '@/components/Dashboard';
import Header from '@/components/Header';

const MainLayout: React.FC = () => {
  return (
    <div className='mx-auto h-screen max-w-screen-xl p-3'>
      <Header />
      <div className='mt-2 grid gap-2 md:grid-cols-layout-md lg:grid-cols-layout-lg'>
        <Dashboard />
        <Outlet />
        <Aside />
      </div>
    </div>
  );
};

export default MainLayout;
