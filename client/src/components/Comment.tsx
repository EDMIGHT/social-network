import React from 'react';
import { Link } from 'react-router-dom';

import Alert from '@/components/ui/Alert';
import Thumbnail from '@/components/ui/Thumbnail';
import Time from '@/components/ui/Time';
import { useAppSelector } from '@/hooks/reduxHooks';
import { useDeleteCommentMutation } from '@/services/comment.service';
import { ICommentWithUser } from '@/types/comment.types';

interface CommentProps extends ICommentWithUser {
  authorId: string;
}

const Comment: React.FC<CommentProps> = ({ user, text, createdAt, authorId, id, postId }) => {
  const { user: localUser, accessToken } = useAppSelector((state) => state.user);

  const [deleteComment, { isLoading, isError }] = useDeleteCommentMutation();

  const onClickDelete = () => {
    if (accessToken) {
      deleteComment({
        accessToken,
        commentId: id,
        postId,
      });
    }
  };

  return (
    <li className='flex flex-col gap-2'>
      {isError && <Alert type='error'>error when deleting comment</Alert>}
      <div className='flex items-center justify-between gap-2'>
        <Link to={`/profile/${user.login}`} className='flex gap-2 hover:opacity-80'>
          <Thumbnail imgURL={user.img} alt={user.login} className='h-16 w-16' />
          <div>
            <h3>{user.name ?? user.login}</h3>
            {createdAt && <Time time={new Date(createdAt)}>created at:</Time>}
          </div>
        </Link>

        {(localUser?.id === user.id || localUser?.id === authorId) && (
          <button
            disabled={isLoading}
            onClick={onClickDelete}
            className='h-fit w-fit rounded-full bg-accent hover:bg-primary disabled:bg-muted'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='h-6 w-6'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
            </svg>
          </button>
        )}
      </div>

      <p>{text}</p>
      <hr />
    </li>
  );
};

export default Comment;
