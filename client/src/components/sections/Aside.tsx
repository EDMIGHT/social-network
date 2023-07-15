import React, { useEffect, useState } from 'react';

import Typography from '@/components/ui/Typography';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { useGetAllTagsQuery } from '@/services/tags.service';
import { addTag, removeTag } from '@/store/slices/options.slice';
import { Tag } from '@/types/tag.types';

import Card from '../ui/Card';
import Pagination from './Pagination';
import Tags from './Tags';

const Aside: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useAppDispatch();
  const selectedTags = useAppSelector((state) => state.options.tags);
  const [filteredTags, setFilteredTags] = useState<typeof selectedTags>([]);

  const { isError, isLoading, data } = useGetAllTagsQuery({
    page: currentPage,
  });

  const onClickAllTag = (tag: Tag) => {
    dispatch(addTag(tag));
  };
  const onClickFollowedTag = (tag: Tag) => {
    dispatch(removeTag(tag));
  };

  useEffect(() => {
    const filter = data?.tags?.length
      ? data.tags.filter(
          (tag) => !selectedTags.some((followedTag) => followedTag.id === tag.id)
        )
      : [];
    setFilteredTags(filter);
  }, [data, selectedTags]);

  return (
    <div>
      <div>
        <Typography component='h2' variant='title-2' className='ml-2 text-primary'>
          selected tags
        </Typography>
        <Tags
          onClick={onClickFollowedTag}
          data={selectedTags}
          emptyText='select tags to filter in the all tags section'
        />
      </div>
      <div>
        <Typography component='h2' variant='title-2' className='ml-2 text-primary'>
          all tags
        </Typography>
        <Card className='flex flex-col gap-2'>
          <Tags
            onClick={onClickAllTag}
            data={filteredTags}
            emptyText='there are no tags in the database'
            className='p-0'
          />
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={data?.totalPages || 1}
          />
        </Card>
      </div>
    </div>
  );
};

export default Aside;
