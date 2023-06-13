import React from 'react';
import { Link } from 'react-router-dom';

import Thumbnail from '@/components/ui/Thumbnail';
import Typography from '@/components/ui/Typography';
import { ResponsePost } from '@/types/post.types';

import Time from '../ui/Time';

const PostItem: React.FC<ResponsePost> = ({
  id,
  createdAt,
  img,
  likedById,
  text,
  title,
  updatedAt,
  userId,
  viewsCount,
  user,
  tags,
}) => {
  return (
    <div className='flex flex-col gap-2 rounded bg-light-bg-content p-3'>
      <Link to={`/${user.login}`} className='flex gap-2 hover:opacity-80'>
        <div className='w-20'>
          <Thumbnail imgURL={user.img} alt={user.login} />
        </div>
        <div className='flex flex-col justify-center'>
          <Typography component='h3' variant='title-2'>
            {user.login}
          </Typography>
          {createdAt && <Time time={new Date(createdAt)}>created at:</Time>}
          {updatedAt && <Time time={new Date(updatedAt)}>updated at:</Time>}
        </div>
      </Link>
      <div className='h-96 cursor-pointer bg-black'>
        {img && <img src={img} alt={user.login} className='mx-auto h-full object-cover' />}
      </div>
      <Typography component='p' variant='text'>
        {text}
      </Typography>
    </div>
  );
};

export default PostItem;
