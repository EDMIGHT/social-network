import React, { useEffect, useState } from 'react';

import CreatePost from '@/components/sections/CreatePost';
import Pagination from '@/components/sections/Pagination';
import Posts from '@/components/sections/Posts';
import PostSkeletons from '@/components/sections/PostSkeletons';
import Alert from '@/components/ui/Alert';
import { useAppSelector } from '@/hooks/reduxHooks';
import { useGetAllPostsQuery } from '@/services/post.service';
import formatTagsForQuery from '@/utils/formatTagsForQuery';

const Home: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { tags } = useAppSelector((state) => state.options);
  const { user } = useAppSelector((state) => state.user);

  const tagsQuery = tags && formatTagsForQuery(tags);

  useEffect(() => {
    setCurrentPage(1);
  }, [tags]);

  const { isLoading, isSuccess, isError, data } = useGetAllPostsQuery({
    tags: tagsQuery,
    page: currentPage,
  });

  const loadingOrErrorElements = (isError || isLoading) && <PostSkeletons />;
  const successElements = isSuccess && (
    <>
      {user && <CreatePost />}
      <Posts posts={data?.posts} />
      {data && data.totalPages > 1 && (
        <Pagination
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          totalPages={data.totalPages}
        />
      )}
    </>
  );

  return (
    <div className='flex flex-col gap-2'>
      {isError && <Alert type='error'>error getting posts</Alert>}
      {loadingOrErrorElements}
      {successElements}
    </div>
  );
};

export default Home;
