import debounce from 'lodash.debounce';
import { FC, useCallback, useEffect, useState } from 'react';

import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Typography from '@/components/ui/Typography';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { useGetAllTagsQuery } from '@/services/tags.service';
import { addTag } from '@/store/slices/options.slice';
import { Tag } from '@/types/tag.types';

import Pagination from './Pagination';
import Tags from './Tags';

const TagsAll: FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [localText, setLocalText] = useState('');
  const [searchName, setSearchName] = useState('');
  const [orderReq, setOrderReq] = useState<'asc' | 'desc'>('asc');

  const dispatch = useAppDispatch();
  const { tags } = useAppSelector((state) => state.options);
  const [filteredTags, setFilteredTags] = useState<typeof tags>([]);

  const { data, isSuccess } = useGetAllTagsQuery({
    page: currentPage,
    name: searchName,
    order: orderReq,
  });

  useEffect(() => {
    const filter = data?.tags?.length
      ? data.tags.filter((tag) => !tags.some((followedTag) => followedTag.id === tag.id))
      : [];
    setFilteredTags(filter);
  }, [data, tags]);

  const debounceUpdateSearchValue = useCallback(
    debounce((inputText: string) => {
      setCurrentPage(1);
      setSearchName(inputText);
    }, 200),
    []
  );

  const onClickAllTag = (tag: Tag) => {
    setSearchName('');

    dispatch(addTag(tag));
  };
  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalText(event.target.value);
    debounceUpdateSearchValue(event.target.value);
  };
  const onClickSortChanger = () => {
    setOrderReq((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

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
          {orderReq === 'asc' ? (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='3'
              stroke='currentColor'
              className='h-4 w-4'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M8.25 6.75L12 3m0 0l3.75 3.75M12 3v18'
              />
            </svg>
          ) : (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='3'
              stroke='currentColor'
              className='h-4 w-4'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15.75 17.25L12 21m0 0l-3.75-3.75M12 21V3'
              />
            </svg>
          )}
          name
        </button>
      </div>

      {isSuccess && (
        <Card className='flex flex-col gap-2'>
          <Input
            name='name'
            id='tags-name'
            placeholder='write name tag..'
            value={localText}
            onChange={onChangeInput}
          />
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
        </Card>
      )}
    </div>
  );
};

export default TagsAll;
