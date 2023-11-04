import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/ui/Button';
import Typography from '@/components/ui/Typography';

const NotFound: FC = () => {
  const navigate = useNavigate();

  const onClickBack = () => {
    navigate(-1);
  };

  return (
    <div className='flex h-screen w-screen items-center justify-center'>
      <div className='flex w-full flex-col items-center justify-center gap-6 p-6 sm:w-[500px]'>
        <span className='text-[5rem]'>😢</span>
        <Typography variant='title-2' component='h2'>
          Page not found
        </Typography>
        <Button onClick={onClickBack}>go to back</Button>
      </div>
    </div>
  );
};

export default NotFound;
