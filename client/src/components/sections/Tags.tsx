import React from 'react';

import Card from '@/components/ui/Card';
import { useGetAllTagsQuery } from '@/store/api/tags.api';

const Tags: React.FC = () => {
  const { isError, isLoading, data } = useGetAllTagsQuery(null, {});

  const tagElements = data ? (
    data.map(({ name, id }) => (
      <li key={id} className='basis-auto flex-wrap whitespace-nowrap rounded bg-highlight p-1'>
        {name}
      </li>
    ))
  ) : (
    <li>no tags found in database</li>
  );

  if (isError) return <div>error</div>;
  if (isLoading) return <div>loading</div>;

  return (
    <Card>
      <ul className='flex flex-wrap gap-2'>{tagElements}</ul>
    </Card>
  );
};

export default Tags;
