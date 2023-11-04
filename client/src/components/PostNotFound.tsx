import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/ui/Button';
import Typography from '@/components/ui/Typography';

const PostNotFound: React.FC = () => {
  const navigate = useNavigate();

  const onClickBack = () => {
    navigate(-1);
  };

  return (
    <div className='flex h-full items-center justify-center'>
      <div className='flex w-[350px] flex-col items-center justify-center gap-6'>
        <span className='text-[5rem]'>😢</span>
        <Typography variant='title-2' component='h1'>
          Post not found
        </Typography>
        <Button onClick={onClickBack}>Go to back</Button>
      </div>
    </div>
  );
};

export default PostNotFound;
