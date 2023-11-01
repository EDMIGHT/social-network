import { useAutoAnimate } from '@formkit/auto-animate/react';
import React from 'react';

import Card from '@/components/ui/Card';
import Typography from '@/components/ui/Typography';
import { Tag as ITag } from '@/types/tag.types';
import { cn } from '@/utils/cn';

import Tag, { TagProps } from './Tag';

export interface TagsProps extends Pick<TagProps, 'onClick'> {
  data: ITag[] | undefined;
  emptyText?: string;
  className?: string;
  classNameTag?: string;
}

const Tags: React.FC<TagsProps> = ({ onClick, data, emptyText, className, classNameTag }) => {
  const [parent] = useAutoAnimate();

  const tagElements = data?.length ? (
    data.map(({ name, id }) => (
      <Tag key={id} id={id} name={name} onClick={onClick} className={classNameTag} />
    ))
  ) : (
    <li>
      {emptyText && (
        <Typography component='span' variant='description'>
          {emptyText}
        </Typography>
      )}
    </li>
  );

  return (
    <Card className={cn(className, 'flex flex-col gap-2')}>
      <ul ref={parent} className='flex flex-wrap gap-2'>
        {tagElements}
      </ul>
    </Card>
  );
};

export default Tags;
