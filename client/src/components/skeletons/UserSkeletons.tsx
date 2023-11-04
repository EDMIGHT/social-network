import React from 'react';

import Card from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';

interface UserSkeletonsProps {
  count?: number;
}

const UserSkeletons: React.FC<UserSkeletonsProps> = ({ count = 5 }) => {
  const skeletonArray: undefined[] = Array.from({ length: count });

  return (
    <ul className='flex flex-col gap-2'>
      {skeletonArray.map((_, i) => (
        <li key={i}>
          <Card className='flex gap-2'>
            <Skeleton className='h-20 w-24 p-2' />
            <Skeleton className='h-20 w-1/2 min-w-[100px] p-2' />
          </Card>
        </li>
      ))}
    </ul>
  );
};

export default UserSkeletons;
