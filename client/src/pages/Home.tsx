import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

import CreatePostForm from '@/components/form/CreatePostForm';
import Pagination from '@/components/Pagination';
import Posts from '@/components/Posts';
import PostSkeletons from '@/components/skeletons/PostSkeletons';
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

  useEffect(() => {
    if (isError) {
      toast.error('Oops, something went wrong!', {
        description: 'Please try again later or reload the page',
      });
    }
  }, [isError]);

  const loadingOrErrorElements = (isError || isLoading) && <PostSkeletons />;
  const successElements = isSuccess && (
    <>
      {user && <CreatePostForm />}
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
      {loadingOrErrorElements}
      {successElements}
    </div>
  );
};

export default Home;
