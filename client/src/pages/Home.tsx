import React, { useEffect, useState } from 'react';

import CreatePost from '@/components/sections/CreatePost';
import Posts from '@/components/sections/Posts';
import Button from '@/components/ui/Button';
import { useAppSelector } from '@/hooks/reduxHooks';
import { useGetAllPostsQuery } from '@/services/post.service';
import formatTagsForQuery from '@/utils/formatTagsForQuery';

const Home: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { tags } = useAppSelector((state) => state.options);

  const tagsQuery = tags && formatTagsForQuery(tags);

  useEffect(() => {
    setCurrentPage(1);
  }, [tags]);

  const { isLoading, isSuccess, isError, data } = useGetAllPostsQuery({
    tags: tagsQuery,
    page: currentPage,
  });

  if (isLoading) return <div>loading</div>;
  if (isError) return <div>error</div>;

  return (
    <div className='flex flex-col gap-2'>
      <CreatePost />
      <div className='flex gap-2'>
        <Button
          onClick={() => {
            setCurrentPage((prev) => prev - 1);
          }}
          disabled={currentPage === 1}
        >
          prev
        </Button>
        <Button
          onClick={() => {
            setCurrentPage((prev) => prev + 1);
          }}
          disabled={currentPage === data?.totalPages}
        >
          next
        </Button>
      </div>
      <Posts posts={data?.posts} />
    </div>
  );
};

export default Home;
