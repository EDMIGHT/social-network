import React, { useState } from 'react';

import TagsAll from '@/components/TagsAll';
import TagsSelected from '@/components/TagsSelected';
import Button from '@/components/ui/Button';
import { cn } from '@/utils/cn';

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
