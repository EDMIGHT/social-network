import React from 'react';

import Button from '@/components/ui/Button';

export interface TagProps {
  id: string;
  name: string;
  // onClick: (tag: ITag) => void;
  onClick?: any;
}

const Tag: React.FC<TagProps> = ({ id, name, onClick }) => {
  return (
    <li>
      <Button
        variant='highlight'
        className='p-1 transition-all hover:bg-primary'
        onClick={() => onClick({ id, name })}
      >
        {name}
      </Button>
    </li>
  );
};

export default Tag;
