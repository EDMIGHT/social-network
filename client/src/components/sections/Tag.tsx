import React from 'react';

import Button from '@/components/ui/Button';
import { Tag as ITag } from '@/types/tag.types';

export interface TagProps {
  id: string;
  name: string;
  onClick?: (tag: ITag) => void;
}

const Tag: React.FC<TagProps> = ({ id, name, onClick }) => {
  return (
    <li>
      <Button
        variant='highlight'
        className='p-1 transition-all hover:bg-primary'
        onClick={() => onClick && onClick({ id, name })}
      >
        {name}
      </Button>
    </li>
  );
};

export default Tag;
