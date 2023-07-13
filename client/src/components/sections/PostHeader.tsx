import React from 'react';

import { useAppSelector } from '@/hooks/reduxHooks';
import { IResponsePost } from '@/types/responses.types';

import PostAuthor from './PostAuthor';
import PostControl from './PostControl';

const PostHeader: React.FC<Pick<IResponsePost, 'user' | 'createdAt' | 'updatedAt' | 'id'>> = ({
  createdAt,
  id,
  updatedAt,
  user,
}) => {
  const { user: localUser } = useAppSelector((state) => state.user);
  return (
    <div className='flex items-center justify-between gap-2'>
      <PostAuthor user={user} createdAt={createdAt} updatedAt={updatedAt} />
      {user && localUser && user.id === localUser.id && <PostControl id={id} />}
    </div>
  );
};

export default PostHeader;
