import React, { useEffect, useState } from 'react';

import Typography from '@/components/ui/Typography';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { useGetAllTagsQuery } from '@/services/tags.service';
import { addTag, removeTag } from '@/store/slices/options.slice';
import { Tag } from '@/types/tag.types';

import Tags from './Tags';

const Aside: React.FC = () => {
  const dispatch = useAppDispatch();
  const followedTags = useAppSelector((state) => state.options.tags);
  const [filteredTags, setFilteredTags] = useState<typeof followedTags>([]);

  const { isError, isLoading, data } = useGetAllTagsQuery(null, {});

  const status = { isError, isLoading };

  const onClickAllTag = (tag: Tag) => {
    dispatch(addTag(tag));
  };
  const onClickFollowedTag = (tag: Tag) => {
    dispatch(removeTag(tag));
  };

  useEffect(() => {
    const filter = data?.length
      ? data.filter((tag) => !followedTags.some((followedTag) => followedTag.id === tag.id))
      : [];
    setFilteredTags(filter);
  }, [data, followedTags]);

  return (
    <div>
      <div>
        <Typography component='h2' variant='title-2' className='ml-2 text-activity'>
          followed tags
        </Typography>
        <Tags
          onClick={onClickFollowedTag}
          data={followedTags}
          emptyText='select tags to filter in the all tags section'
        />
      </div>
      <div>
        <Typography component='h2' variant='title-2' className='ml-2 text-activity'>
          all tags
        </Typography>
        <Tags
          onClick={onClickAllTag}
          data={filteredTags}
          emptyText='there are no tags in the database'
        />
      </div>
    </div>
  );
};

export default Aside;
