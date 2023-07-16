import { FC } from 'react';

import Card from '@/components/ui/Card';

const ProfileHeaderSkeleton: FC = () => {
  return (
    <Card className='flex gap-2'>
      <div className='h-[120px] w-[150px] bg-muted' />
      <div className='flex w-full flex-col justify-between gap-2'>
        <div className='h-[40px] w-[150px] bg-muted' />
        <div className='h-[50px] w-full bg-muted' />
      </div>
    </Card>
  );
};

export default ProfileHeaderSkeleton;
