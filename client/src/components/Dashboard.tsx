import React from 'react';

import Menu from '@/components/Menu';
import UserInfo from '@/components/UserInfo';
import { useAppSelector } from '@/hooks/reduxHooks';

const Dashboard: React.FC = () => {
  const { user } = useAppSelector((state) => state.user);

  return (
    <aside className='hidden flex-col gap-2 lg:flex'>
      {user && <UserInfo login={user.login} imgURL={user.img} />}
      <Menu />
    </aside>
  );
};

export default Dashboard;
