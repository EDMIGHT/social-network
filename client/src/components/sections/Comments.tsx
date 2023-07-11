import { useAutoAnimate } from '@formkit/auto-animate/react';
import React from 'react';

import Card from '@/components/ui/Card';
import { useGetCommentsQuery } from '@/services/comment.service';

import PostItemComment from './Comment';

interface ICommentsProps {
  id: string;
}

const Comments: React.FC<ICommentsProps> = ({ id }) => {
  const [parent] = useAutoAnimate();

  const { data, isSuccess } = useGetCommentsQuery({ id });

  const elementsComments =
    isSuccess && data.length > 0 ? (
      <ul ref={parent} className='flex flex-col gap-2'>
        {data.map((comment) => (
          <PostItemComment key={comment.id} {...comment} />
        ))}
      </ul>
    ) : (
      <div>No comments found 😢</div>
    );

  return <Card>{elementsComments}</Card>;
};

export default Comments;
