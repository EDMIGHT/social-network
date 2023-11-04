import { FC } from 'react';

import Card from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';

const ProfileHeaderSkeleton: FC = () => {
  return (
    <Card className='flex gap-2'>
      <Skeleton className='h-[120px] w-[150px]' />
      <div className='flex w-full flex-col justify-between gap-2'>
        <Skeleton className='h-[40px] w-[150px]' />
        <Skeleton className='h-[50px] w-full' />
      </div>
    </Card>
  );
};

export default ProfileHeaderSkeleton;
