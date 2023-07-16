import React from 'react';

import Card from '@/components/ui/Card';
import { IResponsePost } from '@/types/responses.types';

import Typography from '../ui/Typography';
import PostHeader from './PostHeader';
import PostMenu from './PostMenu';
import Tags from './Tags';

interface PostContentProps {
  data: IResponsePost;
}

const PostContent: React.FC<PostContentProps> = ({ data }) => {
  const {
    id: responseId,
    createdAt,
    updatedAt,
    user,
    img,
    text,
    likedBy,
    comments,
    tags,
    viewsCount,
  } = data;

  return (
    <Card className='flex h-fit flex-[2] flex-col gap-2'>
      <PostHeader id={responseId} createdAt={createdAt} updatedAt={updatedAt} user={user} />
      <Tags data={tags} className='p-0' />
      {img && (
        <div className='h-[70vh] cursor-pointer bg-black'>
          <img src={img} alt={user.login} className='mx-auto h-full object-cover' />
        </div>
      )}
      <Typography component='p' variant='text'>
        {text}
      </Typography>
      <PostMenu
        id={responseId}
        comments={comments}
        likedBy={likedBy}
        viewsCount={viewsCount}
      />
    </Card>
  );
};

export default PostContent;
