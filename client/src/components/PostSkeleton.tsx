import { FC } from 'react';

const PostSkeleton: FC = () => {
  return (
    <div className='flex gap-4'>
      <div className='flex w-[45vw] flex-col gap-2'>
        <div className='h-[15vh] w-full bg-muted' />
        <div className='h-[75vh] w-full bg-muted' />
      </div>
      <div className='h-full w-[20vw] bg-muted' />
    </div>
  );
};

export default PostSkeleton;
