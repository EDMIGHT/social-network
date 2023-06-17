import React from 'react';

import Card from '@/components/ui/Card';
import Typography from '@/components/ui/Typography';
import { Tag as ITag } from '@/types/tag.types';

import Tag, { TagProps } from './Tag';

export interface TagsProps extends Pick<TagProps, 'onClick'> {
  data: ITag[] | undefined;
  emptyText?: string;
}

const Tags: React.FC<TagsProps> = ({ onClick, data, emptyText }) => {
  const tagElements = data?.length ? (
    data.map(({ name, id }) => <Tag key={id} id={id} name={name} onClick={onClick} />)
  ) : (
    <li>
      <Typography component='span' variant='description'>
        {emptyText ?? 'not found'}
      </Typography>
    </li>
  );

  return (
    <Card className='flex flex-col gap-2'>
      <ul className='flex flex-wrap gap-2'>{tagElements}</ul>
    </Card>
  );
};

export default Tags;
