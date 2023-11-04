import { FC } from 'react';
import { toast } from 'sonner';

import { Icons } from '@/components/ui/Icons';
import { useAppSelector } from '@/hooks/reduxHooks';
import { useLikePostMutation } from '@/services/post.service';
import { IResponsePost } from '@/types/responses.types';
import { cn } from '@/utils/cn';

type PostMenuProps = Pick<IResponsePost, 'id' | 'likedBy' | 'comments' | 'viewsCount'>;

const PostMenu: FC<PostMenuProps> = ({ id, likedBy, comments, viewsCount }) => {
  const { user, accessToken } = useAppSelector((state) => state.user);

  const [likePost, { isLoading }] = useLikePostMutation();

  const isExistLike = user && likedBy.some((userLike) => userLike.id === user.id);
  const isExistComment = user && comments.some((comment) => comment.userId === user.id);

  const onClickLike = async () => {
    if (!accessToken) {
      toast.error('You are not authorized to like posts');
      return;
    }

    try {
      await likePost({ id }).unwrap();
    } catch (error) {
      toast.error('Oops, something went wrong!', {
        description: 'Please try again later or reload the page',
      });
    }
  };

  return (
    <div className='flex items-center justify-between gap-2'>
      <div className='flex items-center gap-2'>
        {isLoading ? (
          <Icons.loading className='h-6 w-6 animate-spin' />
        ) : (
          <button
            onClick={onClickLike}
            disabled={isLoading}
            className='flex items-center gap-2'
          >
            <Icons.like className={cn('h-6 w-6', isExistLike && 'fill-primary')} />
            <span>{likedBy.length}</span>
          </button>
        )}
        <div className='flex items-center gap-2'>
          <Icons.comment className={cn('h-6 w-6', isExistComment && 'fill-primary')} />
          <span>{comments.length}</span>
        </div>
      </div>

      <div className='flex items-center gap-2'>
        <Icons.eye className='h-6 w-6' />
        <span>{viewsCount}</span>
      </div>
    </div>
  );
};

export default PostMenu;
