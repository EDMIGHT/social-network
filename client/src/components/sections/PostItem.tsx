import React from 'react';
import { Link } from 'react-router-dom';

import Card from '@/components/ui/Card';
import Typography from '@/components/ui/Typography';
import { IResponsePost } from '@/types/responses.types';

import PostAuthor from './PostAuthor';
import PostControl from './PostControl';
import PostHeader from './PostHeader';
import PostMenu from './PostMenu';
import Tags from './Tags';

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
        <PostHeader id={id} createdAt={createdAt} updatedAt={updatedAt} user={user} />
        <Tags data={tags} className='p-0' />
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
