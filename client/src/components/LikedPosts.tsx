import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';

import Posts from '@/components/Posts';
import Alert from '@/components/ui/Alert';
import { useAppSelector } from '@/hooks/reduxHooks';
import { useGetLikedPostsQuery } from '@/services/users.service';
import formatTagsForQuery from '@/utils/formatTagsForQuery';

import Pagination from './Pagination';
import PostSkeletons from './PostSkeletons';

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
      {isError && <Alert type='error'>error getting user posts</Alert>}
      {loadingOrErrorElements}
      {successElements}
    </div>
  );
};

export default LikedPosts;
