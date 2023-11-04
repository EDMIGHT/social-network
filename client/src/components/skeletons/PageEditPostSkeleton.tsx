import { FC } from 'react';

import Card from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';

const PageEditPostSkeleton: FC = () => {
  return (
    <Card className='flex flex-col gap-4'>
      <Skeleton className='h-[100px] w-full' />
      <Skeleton className='h-[60px] w-full' />
      <Skeleton className='h-[70vh] w-full' />
    </Card>
  );
};

export default PageEditPostSkeleton;
