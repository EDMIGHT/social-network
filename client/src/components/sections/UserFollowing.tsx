import React from 'react';
import { useParams } from 'react-router-dom';

import { useGetFollowingQuery } from '@/services/users.service';

import Users from './Users';

const UserFollowing: React.FC = () => {
  const { login } = useParams();

  const { data, isSuccess } = useGetFollowingQuery({
    login: login as string,
    page: 1,
    limit: 1,
  });

  if (isSuccess && data) {
    return <Users users={data.following} />;
  }

  return <div>loading</div>;
};

export default UserFollowing;
