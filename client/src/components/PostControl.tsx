import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

import { Icons } from '@/components/ui/Icons';
import Popup from '@/components/ui/Popup';
import Typography from '@/components/ui/Typography';
import { useAppSelector } from '@/hooks/reduxHooks';
import { useDeletePostMutation } from '@/services/post.service';
import { cn } from '@/utils/cn';

interface PostControlProps {
  id: string;
}

const PostControl: React.FC<PostControlProps> = ({ id }) => {
  const { accessToken } = useAppSelector((state) => state.user);
  const [isActivePopup, setIsActive] = useState(false);
  const controlRef = useRef<HTMLDivElement>(null);

  const [deletePost, { isLoading }] = useDeletePostMutation();

  const onClickControl = () => {
    setIsActive((prev) => !prev);
  };
  const onClickDelete = async () => {
    if (!accessToken) {
      toast.error('You are not authorized to delete a post');
      return;
    }

    try {
      await deletePost({ id }).unwrap();
      setIsActive(false);
    } catch (error) {
      toast.error('Oops, something went wrong!', {
        description: 'Please try again later or reload the page',
      });
    }
  };

  useEffect(() => {
    const onClickBody = (e: MouseEvent) => {
      if (controlRef && controlRef.current && !e.composedPath().includes(controlRef.current)) {
        setIsActive(false);
      }
    };

    document.body.addEventListener('click', onClickBody);
    return () => document.body.removeEventListener('click', onClickBody);
  }, []);

  return (
    <div ref={controlRef} className='relative'>
      <button onClick={onClickControl}>
        <Icons.menu className='h-8 w-8' />
      </button>

      <Popup isActive={isActivePopup} className='-left-5'>
        <ul className={cn('cursor-pointer', !isActivePopup && 'hidden')}>
          <li className='flex p-2 hover:text-white'>
            <Link to={`/post/edit/${id}`}>
              <Typography
                component='span'
                variant='title-2'
                className='flex items-center justify-center gap-1'
              >
                <Icons.pencil className='h-6 w-6' />
                edit
              </Typography>
            </Link>
          </li>
          <li className='flex p-2 hover:text-white focus:text-white'>
            <button
              onClick={onClickDelete}
              disabled={isLoading}
              className='disabled:text-muted disabled:hover:text-muted disabled:focus:text-muted'
            >
              <Typography
                component='span'
                variant='title-2'
                className='flex items-center justify-center gap-1'
              >
                <Icons.trash className='h-6 w-6' />
                delete
              </Typography>
            </button>
          </li>
        </ul>
      </Popup>
    </div>
  );
};

export default PostControl;
