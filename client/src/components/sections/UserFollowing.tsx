import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';

import Alert from '@/components/ui/Alert';
import { useGetFollowingQuery } from '@/services/users.service';

import Pagination from './Pagination';
import Users from './Users';
import UsersEmpty from './UsersEmpty';
import UserSkeletons from './UserSkeletons';

const UserFollowing: FC = () => {
  const { login } = useParams();
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isSuccess, isError, isLoading } = useGetFollowingQuery({
    login: login as string,
    page: currentPage,
  });

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
      {isError && <Alert type='error'>error while getting users following</Alert>}
      {loadingOrErrorElements}
      {successElements}
    </div>
  );
};

export default UserFollowing;
