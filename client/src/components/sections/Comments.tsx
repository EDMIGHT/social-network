import { useAutoAnimate } from '@formkit/auto-animate/react';
import { FC, useState } from 'react';

import Card from '@/components/ui/Card';
import { useGetCommentsQuery } from '@/services/comment.service';

import PostItemComment from './Comment';
import Pagination from './Pagination';

interface ICommentsProps {
  id: string;
}

const Comments: FC<ICommentsProps> = ({ id }) => {
  const [parent] = useAutoAnimate();
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isSuccess } = useGetCommentsQuery({ id, page: currentPage });

  const elementsComments =
    isSuccess &&
    data &&
    data.comments.map((comment) => <PostItemComment key={comment.id} {...comment} />);

  return (
    <div className='flex flex-col gap-2'>
      <Card>
        {data && data.comments.length > 0 ? (
          <ul ref={parent} className='flex flex-col gap-2'>
            {elementsComments}
          </ul>
        ) : (
          <div>no comments yet</div>
        )}
      </Card>
      {data && data.totalPages > 1 && (
        <Pagination
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          totalPages={data.totalPages}
        />
      )}
    </div>
  );
};

export default Comments;
