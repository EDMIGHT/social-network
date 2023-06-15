import React from 'react';
import { useParams } from 'react-router-dom';

import ProfileHeader from '@/components/sections/ProfileHeader';
import { useGetProfileQuery } from '@/store/api/profile.api';

const Profile: React.FC = () => {
  const { login } = useParams();

  const { data, isLoading, isError } = useGetProfileQuery(login as string);

  if (isLoading) return <div>loading</div>;
  if (isError) return <div>error</div>;
  if (!data) return <div>not found</div>;

  return (
    <div>
      <ProfileHeader {...data} />
    </div>
  );
};

export default Profile;
