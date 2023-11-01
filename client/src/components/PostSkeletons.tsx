import { FC } from 'react';

import Card from '@/components/ui/Card';

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
              <div className='h-16 w-20 bg-muted' />
              <div className='h-16 w-36 bg-muted' />
            </div>
            <div className='h-96 bg-muted' />
            <div className='h-10 bg-muted' />
          </Card>
        </li>
      ))}
    </ul>
  );
};

export default PostSkeletons;
