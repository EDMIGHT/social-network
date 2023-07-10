import { useAutoAnimate } from '@formkit/auto-animate/react';
import React from 'react';

import { useGetCommentsForPostQuery } from '@/services/comment.service';

import PostItemComment from './PostItemComment';

interface PostItemCommentsProps {
  id: string;
}

const PostItemComments: React.FC<PostItemCommentsProps> = ({ id }) => {
  const [parent] = useAutoAnimate();

  const { data, isSuccess } = useGetCommentsForPostQuery({ id });

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

  return elementsComments;
};

export default PostItemComments;
