import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

import { Icons } from '@/components/ui/Icons';
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

  const [deleteComment, { isLoading }] = useDeleteCommentMutation();

  const onClickDelete = async () => {
    if (!accessToken) {
      toast.error('You are not authorized to delete a comment');
      return;
    }

    try {
      await deleteComment({
        commentId: id,
        postId,
      });
    } catch (error) {
      toast.error('Oops, something went wrong!', {
        description: 'Please try again later or reload the page',
      });
    }
  };

  return (
    <li className='flex flex-col gap-2'>
      <div className='flex items-center justify-between gap-2'>
        <Link to={`/profile/${user.login}`} className='flex gap-2 hover:opacity-80'>
          <Thumbnail imgURL={user.img} alt={user.login} className='h-16 w-16' />
          <div>
            <h3>{user.name ?? user.login}</h3>
            {createdAt && <Time time={new Date(createdAt)}>created at:</Time>}
          </div>
        </Link>

        {(localUser?.id === user.id || localUser?.id === authorId) &&
          (isLoading ? (
            <Icons.loading className='h-6 w-6 animate-spin' />
          ) : (
            <button disabled={isLoading} onClick={onClickDelete}>
              <Icons.trash className='h-6 w-6 stroke-accent transition-colors hover:stroke-primary disabled:stroke-muted' />
            </button>
          ))}
      </div>

      <p>{text}</p>
      <hr />
    </li>
  );
};

export default Comment;
