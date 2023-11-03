import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';

import CreatePostForm from '@/components/form/CreatePostForm';
import Pagination from '@/components/Pagination';
import Posts from '@/components/Posts';
import PostSkeletons from '@/components/PostSkeletons';
import Alert from '@/components/ui/Alert';
import { useAppSelector } from '@/hooks/reduxHooks';
import { useGetAllPostsQuery } from '@/services/post.service';
import formatTagsForQuery from '@/utils/formatTagsForQuery';

const UserPosts: FC = () => {
  const { login } = useParams();
  const { tags } = useAppSelector((state) => state.options);
  const { user } = useAppSelector((state) => state.user);

  const [currentPage, setCurrentPage] = useState(1);

  const tagsQuery = tags && formatTagsForQuery(tags);

  const { data, isSuccess, isError, isLoading } = useGetAllPostsQuery({
    login: login as string,
    tags: tagsQuery,
    page: currentPage,
  });

  const loadingOrErrorElements = (isError || isLoading) && <PostSkeletons />;
  const successElements = isSuccess && (
    <div className='flex flex-col gap-2'>
      {user && user.login === login && <CreatePostForm />}
      <Posts posts={data?.posts} />
      {data && data.totalPages > 1 && (
        <Pagination
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          totalPages={data.totalPages}
        />
      )}
    </div>
  );

  return (
    <div>
      {isError && <Alert type='error'>error getting user posts</Alert>}
      {loadingOrErrorElements}
      {successElements}
    </div>
  );
};

export default UserPosts;
