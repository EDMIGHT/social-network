import React from 'react';

interface TagSkeletonsProps {
  count?: number;
}

const TagSkeletons: React.FC<TagSkeletonsProps> = ({ count = 8 }) => {
  const skeletonArray: undefined[] = Array.from({ length: count });

  return (
    <ul className='flex flex-wrap gap-2'>
      {skeletonArray.map((_, i) => (
        <li key={i} className='min-w-[60px] flex-1 bg-muted p-3' />
      ))}
    </ul>
  );
};

export default TagSkeletons;
