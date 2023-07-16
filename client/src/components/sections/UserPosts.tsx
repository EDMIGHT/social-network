import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAppSelector } from '@/hooks/reduxHooks';
import { useGetAllPostsQuery } from '@/services/post.service';
import formatTagsForQuery from '@/utils/formatTagsForQuery';

import CreatePost from './CreatePost';
import Pagination from './Pagination';
import Posts from './Posts';

const UserPosts: FC = () => {
  const { login } = useParams();
  const { tags } = useAppSelector((state) => state.options);
  const { user } = useAppSelector((state) => state.user);

  const [currentPage, setCurrentPage] = useState(1);

  const tagsQuery = tags && formatTagsForQuery(tags);

  const { data, isSuccess } = useGetAllPostsQuery({
    login: login as string,
    tags: tagsQuery,
    page: currentPage,
  });

  if (isSuccess) {
    return (
      <>
        {user && user.login === login && <CreatePost />}
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
  }

  return <div> loading</div>;
};

export default UserPosts;
