import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';

import Posts from '@/components/sections/Posts';
import { useAppSelector } from '@/hooks/reduxHooks';
import { useGetLikedPostsQuery } from '@/services/users.service';
import formatTagsForQuery from '@/utils/formatTagsForQuery';

import Pagination from './Pagination';

const LikedPosts: FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { login } = useParams();
  const { tags } = useAppSelector((state) => state.options);

  const tagsQuery = tags && formatTagsForQuery(tags);
  const { data, isSuccess } = useGetLikedPostsQuery({
    login: login as string,
    tags: tagsQuery,
    page: currentPage,
  });

  if (isSuccess && data) {
    return (
      <>
        <Posts posts={data?.posts} />
        <Pagination
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          totalPages={data?.totalPages || 1}
        />
      </>
    );
  }

  return <div>loading</div>;
};

export default LikedPosts;
