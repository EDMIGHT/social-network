import React from 'react';

import Card from '@/components/ui/Card';

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
              <div className='h-16 w-16 bg-muted' />
              <div className='h-16 w-32 bg-muted' />
            </div>
            <div className='h-12 w-full bg-muted' />
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default CommentSkeletons;
