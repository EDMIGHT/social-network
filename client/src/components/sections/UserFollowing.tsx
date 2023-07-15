import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useGetFollowingQuery } from '@/services/users.service';

import Pagination from './Pagination';
import Users from './Users';

const UserFollowing: FC = () => {
  const { login } = useParams();
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isSuccess } = useGetFollowingQuery({
    login: login as string,
    page: currentPage,
  });

  if (isSuccess && data) {
    return (
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
  }

  return <div>loading</div>;
};

export default UserFollowing;
