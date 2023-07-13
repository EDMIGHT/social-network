import React from 'react';
import { Outlet } from 'react-router-dom';

import ProfileHeader from '@/components/sections/ProfileHeader';

const Profile: React.FC = () => {
  return (
    <div className='flex w-full flex-col gap-2'>
      <ProfileHeader />
      <Outlet />
    </div>
  );
};

export default Profile;
