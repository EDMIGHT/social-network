import React from 'react';
import { useNavigate } from 'react-router-dom';

import notFoundImg from '@/assets/imgs/notFound.png';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Typography from '@/components/ui/Typography';

const PostNotFound: React.FC = () => {
  const navigate = useNavigate();

  const onClickBack = () => {
    navigate(-1);
  };

  return (
    <div className='flex h-full items-center justify-center'>
      <Card className='flex w-[350px] flex-col items-center justify-center gap-6'>
        <img src={notFoundImg} alt='not found' className='w-52' />
        <Typography variant='title-2' component='h2'>
          Post not found 😢
        </Typography>
        <Button onClick={onClickBack}>Go to back</Button>
      </Card>
    </div>
  );
};

export default PostNotFound;
