import React from 'react';
import { Outlet, useParams } from 'react-router-dom';

import ProfileHeader from '@/components/sections/ProfileHeader';
import { useGetProfileQuery } from '@/services/users.service';

const Profile: React.FC = () => {
  const { login } = useParams();

  const { data, isLoading, isError } = useGetProfileQuery(login as string);

  if (isLoading) return <div>loading</div>;
  if (isError) return <div>error</div>;
  if (!data) return <div>not found</div>;

  return (
    <div className='flex w-full flex-col gap-2'>
      <ProfileHeader {...data} />
      <Outlet />
    </div>
  );
};

export default Profile;
