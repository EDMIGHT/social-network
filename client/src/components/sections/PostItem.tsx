import React from 'react';
import { Link } from 'react-router-dom';

import Card from '@/components/ui/Card';
import Typography from '@/components/ui/Typography';
import { IResponsePost } from '@/types/responses.types';

import PostAuthor from './PostAuthor';
import PostControl from './PostControl';
import PostMenu from './PostMenu';

const PostItem: React.FC<IResponsePost> = ({
  id,
  createdAt,
  img,
  text,
  updatedAt,
  userId,
  viewsCount,
  user,
  comments,
  tags,
  likedBy,
}) => {
  return (
    <li>
      <Card className='flex flex-col gap-2 '>
        <div className='flex items-center justify-between gap-2'>
          <PostAuthor user={user} createdAt={createdAt} updatedAt={updatedAt} />
          <PostControl id={id} />
        </div>
        <Link to={`/post/${id}`}>
          {img && (
            <div className='h-96 cursor-pointer bg-black'>
              <img src={img} alt={user.login} className='mx-auto h-full object-cover' />
            </div>
          )}
          <Typography component='p' variant='text'>
            {text}
          </Typography>
        </Link>

        <PostMenu id={id} likedBy={likedBy} comments={comments} />
      </Card>
    </li>
  );
};

export default PostItem;
