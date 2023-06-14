import React from 'react';

import { useAppSelector } from '@/hooks/reduxHooks';

import Menu from './Menu';
import UserInfo from './UserInfo';

const Dashboard: React.FC = () => {
  const user = useAppSelector((state) => state.user.user);

  return (
    <aside className='flex flex-col gap-2'>
      {user && <UserInfo name={user.name} login={user.login} imgURL={user.img} />}
      <Menu />
    </aside>
  );
};

export default Dashboard;
