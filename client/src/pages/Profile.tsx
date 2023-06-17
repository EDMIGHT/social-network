import React from 'react';
import { useParams } from 'react-router-dom';

import Posts from '@/components/sections/Posts';
import ProfileHeader from '@/components/sections/ProfileHeader';
import { useGetProfilePostsQuery, useGetProfileQuery } from '@/services/profile.service';

const Profile: React.FC = () => {
  const { login } = useParams();

  const { data, isLoading, isError } = useGetProfileQuery(login as string);
  const {
    data: postsData,
    isLoading: isPostsLoading,
    isError: isPostsError,
  } = useGetProfilePostsQuery(login as string);

  if (isLoading && isPostsLoading) return <div>loading</div>;
  if (isError && isPostsError) return <div>error</div>;
  if (!data || !postsData) return <div>not found</div>;

  return (
    <div className='flex w-full flex-col gap-2'>
      <ProfileHeader {...data} />
      <Posts posts={postsData?.posts} />
    </div>
  );
};

export default Profile;
