import React from 'react';

import Card from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';

interface CommentSkeletonsProps {
  count?: number;
}

const CommentSkeletons: React.FC<CommentSkeletonsProps> = ({ count = 5 }) => {
  const skeletonArray: undefined[] = Array.from({ length: count });

  return (
    <Card>
      <ul className='flex flex-col gap-2'>
        {skeletonArray.map((_, i) => (
          <li key={i} className='flex flex-col gap-2'>
            <div className='flex gap-2'>
              <Skeleton className='h-16 w-16' />
              <Skeleton className='h-16 w-32' />
            </div>
            <Skeleton className='h-12 w-full' />
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default CommentSkeletons;
