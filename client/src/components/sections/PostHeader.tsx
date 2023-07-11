import React from 'react';

import { IResponsePost } from '@/types/responses.types';

import PostAuthor from './PostAuthor';
import PostControl from './PostControl';

const PostHeader: React.FC<Pick<IResponsePost, 'user' | 'createdAt' | 'updatedAt' | 'id'>> = ({
  createdAt,
  id,
  updatedAt,
  user,
}) => {
  return (
    <div className='flex items-center justify-between gap-2'>
      <PostAuthor user={user} createdAt={createdAt} updatedAt={updatedAt} />
      <PostControl id={id} />
    </div>
  );
};

export default PostHeader;
