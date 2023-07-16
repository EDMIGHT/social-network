import React from 'react';

import Button from '@/components/ui/Button';
import { Tag as ITag } from '@/types/tag.types';

export interface TagProps {
  id: string;
  name: string;
  onClick?: (tag: ITag) => void;
  className?: string;
}

const Tag: React.FC<TagProps> = ({ id, name, onClick, className }) => {
  return (
    <li className={className}>
      <Button
        variant='highlight'
        className='w-full p-1 transition-all hover:bg-primary'
        onClick={() => onClick && onClick({ id, name })}
      >
        {name}
      </Button>
    </li>
  );
};

export default Tag;
