import React from 'react';

import Card from '@/components/ui/Card';

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
            <div className='h-20 w-24 bg-muted p-2' />
            <div className='h-20 w-36 bg-muted p-2' />
          </Card>
        </li>
      ))}
    </ul>
  );
};

export default UserSkeletons;
