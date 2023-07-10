import React from 'react';

import Thumbnail from '@/components/ui/Thumbnail';
import Time from '@/components/ui/Time';
import { ICommentWithUser } from '@/types/comment.types';

const Comment: React.FC<ICommentWithUser> = ({ user, text, createdAt }) => {
  return (
    <li className='flex flex-col gap-2'>
      <div className='flex gap-2'>
        <Thumbnail imgURL={user.img} alt={user.login} className='h-16 w-16' />
        <div>
          <h3>{user.name ?? user.login}</h3>
          {createdAt && <Time time={new Date(createdAt)}>created at:</Time>}
        </div>
      </div>
      <p>{text}</p>
      <hr />
    </li>
  );
};

export default Comment;
