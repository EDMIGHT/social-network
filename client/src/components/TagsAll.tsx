import { FC, useEffect, useState } from 'react';
import { toast } from 'sonner';

import Pagination from '@/components/Pagination';
import TagSkeletons from '@/components/skeletons/TagSkeletons';
import Tags from '@/components/Tags';
import Card from '@/components/ui/Card';
import { Icons } from '@/components/ui/Icons';
import Input from '@/components/ui/Input';
import Typography from '@/components/ui/Typography';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { useInputDebounce } from '@/hooks/useInputDebounce';
import { useGetAllTagsQuery } from '@/services/tags.service';
import { addTag } from '@/store/slices/options.slice';
import { Tag } from '@/types/tag.types';
import { cn } from '@/utils/cn';

const TagsAll: FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchName, setSearchName] = useState('');
  const [orderReq, setOrderReq] = useState<'asc' | 'desc'>('asc');

  const [localText, onChangeInput, setLocalText] = useInputDebounce({
    callback: setSearchName,
    reqWhenLocalEmpty: true,
  });

  const dispatch = useAppDispatch();
  const { tags } = useAppSelector((state) => state.options);
  const [filteredTags, setFilteredTags] = useState<typeof tags>([]);

  const { data, isSuccess, isError, isLoading } = useGetAllTagsQuery({
    page: currentPage,
    name: searchName,
    order: orderReq,
  });

  useEffect(() => {
    if (isError) {
      toast.error('Oops, something went wrong!', {
        description: 'Please try again later or reload the page',
      });
    }
  }, [isError]);

  useEffect(() => {
    const filter = data?.tags?.length
      ? data.tags.filter((tag) => !tags.some((followedTag) => followedTag.id === tag.id))
      : [];
    setFilteredTags(filter);
  }, [data, tags]);

  const onClickAllTag = (tag: Tag) => {
    setSearchName('');
    setLocalText('');
    dispatch(addTag(tag));
  };
  const onClickSortChanger = () => {
    setOrderReq((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const loadingOrErrorTags = (isError || isLoading) && <TagSkeletons />;
  const successTags = isSuccess && (
    <>
      <Tags
        onClick={onClickAllTag}
        data={filteredTags}
        emptyText='there are no tags in the database'
        className='p-0'
        classNameTag='flex-1'
      />
      {data && data.totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={data?.totalPages || 1}
        />
      )}
    </>
  );

  return (
    <div>
      <div className='flex justify-between gap-2 px-2'>
        <Typography component='h2' variant='title-2' className='text-primary'>
          all tags
        </Typography>
        <button
          onClick={onClickSortChanger}
          className='flex items-center justify-center font-bold text-primary hover:opacity-80'
        >
          <Icons.arrowUp
            className={cn('h-4 w-4 transition-transform', orderReq === 'desc' && 'rotate-180')}
          />
          name
        </button>
      </div>

      <Card className='flex flex-col gap-2'>
        <Input
          name='name'
          id='tags-name'
          placeholder='write name tag..'
          value={localText}
          onChange={onChangeInput}
        />
        {loadingOrErrorTags}
        {successTags}
      </Card>
    </div>
  );
};

export default TagsAll;
