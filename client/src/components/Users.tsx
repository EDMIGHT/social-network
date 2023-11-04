import { useAutoAnimate } from '@formkit/auto-animate/react';
import React from 'react';

import User, { IUserProps } from '@/components/User';
import UsersEmpty from '@/components/UsersEmpty';
import { IJoinedUser } from '@/types/user.types';

interface UsersProps {
  users: IJoinedUser[];
  onClickUser?: IUserProps['onClickUser'];
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
