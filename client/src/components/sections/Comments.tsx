import { useAutoAnimate } from '@formkit/auto-animate/react';
import { FC, useState } from 'react';

import Card from '@/components/ui/Card';
import { useGetCommentsQuery } from '@/services/comment.service';

import Comment from './Comment';
import CommentSkeletons from './CommentSkeletons';
import Pagination from './Pagination';

interface ICommentsProps {
  id: string;
}

const Comments: FC<ICommentsProps> = ({ id }) => {
  const [parent] = useAutoAnimate();
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isSuccess, isLoading, isError } = useGetCommentsQuery({
    id,
    page: currentPage,
  });

  const elementsComments =
    data && data.comments.map((comment) => <Comment key={comment.id} {...comment} />);

  const loadingElements = (isLoading || isError) && <CommentSkeletons />;
  const successElements = isSuccess && (
    <>
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
    </>
  );

  return (
    <div className='flex flex-col gap-2'>
      {loadingElements}
      {successElements}
    </div>
  );
};

export default Comments;
