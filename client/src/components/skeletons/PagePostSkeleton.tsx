import { FC } from 'react';

import { Skeleton } from '@/components/ui/Skeleton';

const PagePostSkeleton: FC = () => {
  return (
    <div className='flex gap-4'>
      <div className='flex w-[45vw] flex-col gap-2'>
        <Skeleton className='h-[15vh] w-full' />
        <Skeleton className='h-[75vh] w-full' />
      </div>
      <Skeleton className='h-full w-[20vw]' />
    </div>
  );
};

export default PagePostSkeleton;
