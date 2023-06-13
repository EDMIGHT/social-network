import React from 'react';

import Menu from './Menu';
import UserInfo from './UserInfo';

const Dashboard: React.FC = () => {
  return (
    <aside className='flex flex-col gap-2'>
      <UserInfo
        name='Alexey Latyshev'
        login='edmight'
        imgURL='https://i.pinimg.com/564x/41/cf/a1/41cfa1f0553af546e6dd2a3bf70b59ba.jpg'
      />
      <Menu />
    </aside>
  );
};

export default Dashboard;
