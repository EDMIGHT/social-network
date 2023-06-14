import React from 'react';

import Card from '@/components/ui/Card';
import { Tag as ITag } from '@/types/tag.types';

import Tag, { TagProps } from './Tag';

export interface TagsProps extends Pick<TagProps, 'onClick'> {
  data: ITag[] | undefined;
  status?: {
    isLoading: boolean;
    isError: boolean;
  };
}

const Tags: React.FC<TagsProps> = ({ onClick, data, status }) => {
  const tagElements = data ? (
    data.map(({ name, id }) => <Tag key={id} id={id} name={name} onClick={onClick} />)
  ) : (
    <li>no tags found in database</li>
  );

  if (status?.isError) return <div>error</div>;
  if (status?.isLoading) return <div>loading</div>;

  return (
    <Card className='flex flex-col gap-2'>
      <ul className='flex flex-wrap gap-2'>{tagElements}</ul>
    </Card>
  );
};

export default Tags;
