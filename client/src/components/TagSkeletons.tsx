import React from 'react';

import { Skeleton } from '@/components/ui/Skeleton';

interface TagSkeletonsProps {
  count?: number;
}

const TagSkeletons: React.FC<TagSkeletonsProps> = ({ count = 8 }) => {
  const skeletonArray: undefined[] = Array.from({ length: count });

  return (
    <ul className='flex flex-wrap gap-2'>
      {skeletonArray.map((_, i) => (
        <Skeleton key={i} className='min-w-[60px] flex-1 p-3' />
      ))}
    </ul>
  );
};

export default TagSkeletons;
