import React from 'react';

import Card from '@/components/ui/Card';
import { IResponsePost } from '@/types/responses.types';

import Typography from '../ui/Typography';
import PostHeader from './PostHeader';
import PostMenu from './PostMenu';
import Tags from './Tags';

interface PostContentProps {
  onClickClose: () => void;
  data: IResponsePost;
}

const PostContent: React.FC<PostContentProps> = ({ data, onClickClose }) => {
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
      <button onClick={onClickClose} className='block w-fit rounded-full bg-accent xl:hidden'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='currentColor'
          className='h-8 w-8 hover:stroke-primary focus:stroke-primary'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
        </svg>
      </button>
      <PostHeader id={responseId} createdAt={createdAt} updatedAt={updatedAt} user={user} />
      <Tags data={tags} className='p-0' />
      {img && (
        <div className='h-[50vh] cursor-pointer bg-black lg:h-[70vh]'>
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
