import React, { useState } from 'react';

import { cn } from '@/utils/cn';

import Button from '../ui/Button';
import TagsAll from './TagsAll';
import TagsSelected from './TagsSelected';

const Aside: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const onClickTrigger = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <div className='-order-1 md:order-1'>
      <Button className='w-full md:hidden' onClick={onClickTrigger}>
        filter tags
      </Button>
      <div className={cn(isVisible ? 'block' : 'hidden', 'md:block')}>
        <TagsSelected />
        <TagsAll />
      </div>
    </div>
  );
};

export default Aside;
