import React from 'react';

import { IJoinedUser } from '@/types/user.types';

import User from './User';

interface UsersProps {
  users: IJoinedUser[];
}

const Users: React.FC<UsersProps> = ({ users }) => {
  const elementsUsers = users.map((user) => <User key={user.id} {...user} />);

  return <ul>{elementsUsers}</ul>;
};

export default Users;
