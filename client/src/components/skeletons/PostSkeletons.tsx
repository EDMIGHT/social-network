import { FC } from 'react';

import Card from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';

interface PostSkeletonsProps {
  count?: number;
}

const PostSkeletons: FC<PostSkeletonsProps> = ({ count = 5 }) => {
  const skeletonArray: undefined[] = Array.from({ length: count });

  return (
    <ul className='flex flex-col gap-2'>
      {skeletonArray.map((_, i) => (
        <li key={i}>
          <Card className='flex flex-col gap-2 '>
            <div className='flex gap-2'>
              <Skeleton className='h-16 w-20' />
              <Skeleton className='h-16 w-36' />
            </div>
            <Skeleton className='h-96' />
            <Skeleton className='h-10' />
          </Card>
        </li>
      ))}
    </ul>
  );
};

export default PostSkeletons;
