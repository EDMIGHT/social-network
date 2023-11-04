import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

import CreatePostForm from '@/components/form/CreatePostForm';
import Pagination from '@/components/Pagination';
import Posts from '@/components/Posts';
import PostSkeletons from '@/components/skeletons/PostSkeletons';
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

  useEffect(() => {
    if (isError) {
      toast.error('Oops, something went wrong!', {
        description: 'Please try again later or reload the page',
      });
    }
  }, [isError]);

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
      {loadingOrErrorElements}
      {successElements}
    </div>
  );
};

export default UserPosts;
