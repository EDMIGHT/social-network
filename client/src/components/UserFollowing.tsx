import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

import Pagination from '@/components/Pagination';
import UserSkeletons from '@/components/skeletons/UserSkeletons';
import Users from '@/components/Users';
import { useGetFollowingQuery } from '@/services/users.service';

const UserFollowing: FC = () => {
  const { login } = useParams();
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isSuccess, isError, isLoading } = useGetFollowingQuery({
    login: login as string,
    page: currentPage,
  });

  useEffect(() => {
    if (isError) {
      toast.error('Oops, something went wrong!', {
        description: 'Please try again later or reload the page',
      });
    }
  }, [isError]);

  const loadingOrErrorElements = (isError || isLoading) && <UserSkeletons />;
  const successElements = isSuccess && (
    <>
      <Users users={data.following} />
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

export default UserFollowing;
