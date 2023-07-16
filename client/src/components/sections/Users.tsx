import { useAutoAnimate } from '@formkit/auto-animate/react';
import React from 'react';

import { IJoinedUser } from '@/types/user.types';

import User from './User';
import UsersEmpty from './UsersEmpty';

interface UsersProps {
  users: IJoinedUser[];
  onClickUser?: any;
}

const Users: React.FC<UsersProps> = ({ users, onClickUser }) => {
  const [parent] = useAutoAnimate();

  const elementsUsers =
    users.length > 0 ? (
      users.map((user) => <User key={user.id} {...user} onClickUser={onClickUser} />)
    ) : (
      <UsersEmpty />
    );

  return (
    <ul ref={parent} className='flex flex-col gap-2'>
      {elementsUsers}
    </ul>
  );
};

export default Users;
