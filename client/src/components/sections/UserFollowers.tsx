import { FC } from 'react';
import { useParams } from 'react-router-dom';

import { useGetFollowersQuery } from '@/services/users.service';

import Users from './Users';

const UserFollowers: FC = () => {
  const { login } = useParams();

  const { data, isSuccess } = useGetFollowersQuery({
    login: login as string,
    page: 1,
    limit: 1,
  });

  if (isSuccess && data) {
    return <Users users={data.followers} />;
  }

  return <div>loading</div>;
};

export default UserFollowers;
