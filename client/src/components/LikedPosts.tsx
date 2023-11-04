import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

import Pagination from '@/components/Pagination';
import Posts from '@/components/Posts';
import PostSkeletons from '@/components/skeletons/PostSkeletons';
import { useAppSelector } from '@/hooks/reduxHooks';
import { useGetLikedPostsQuery } from '@/services/users.service';
import formatTagsForQuery from '@/utils/formatTagsForQuery';

const LikedPosts: FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { login } = useParams();
  const { tags } = useAppSelector((state) => state.options);

  const tagsQuery = tags && formatTagsForQuery(tags);
  const { data, isSuccess, isError, isLoading } = useGetLikedPostsQuery({
    login: login as string,
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
  const successElements = isSuccess && data && (
    <>
      <Posts posts={data.posts} />
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
    <div>
      {loadingOrErrorElements}
      {successElements}
    </div>
  );
};

export default LikedPosts;
