import { FC, useEffect, useRef } from 'react';

import Typography from '@/components/ui/Typography';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import useLocalStorage from '@/hooks/useLocalStorage';
import { removeTag, setTags } from '@/store/slices/options.slice';
import { Tag } from '@/types/tag.types';

import Tags from './Tags';

const TagsSelected: FC = () => {
  const { tags } = useAppSelector((state) => state.options);
  const [setLocal, getLocal] = useLocalStorage();

  const isMounted = useRef(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const localTags = (getLocal('tags') as Tag[]) || [];
    dispatch(setTags(localTags));
  }, []);

  useEffect(() => {
    if (isMounted.current) {
      setLocal('tags', tags);
    }

    isMounted.current = true;
  }, [tags]);

  const onClickFollowedTag = (tag: Tag) => {
    dispatch(removeTag(tag));
  };

  return (
    <div>
      <Typography component='h2' variant='title-2' className='ml-2 text-primary'>
        selected tags
      </Typography>
      <Tags
        onClick={onClickFollowedTag}
        data={tags}
        emptyText='select tags to filter in the all tags section'
      />
    </div>
  );
};

export default TagsSelected;
