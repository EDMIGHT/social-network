import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import Alert from '@/components/ui/Alert';
import Popup from '@/components/ui/Popup';
import Typography from '@/components/ui/Typography';
import { useAppSelector } from '@/hooks/reduxHooks';
import { useDeletePostMutation } from '@/services/post.service';
import { isErrorWithMessage } from '@/types/responses.types';
import { cn } from '@/utils/cn';

interface PostControlProps {
  id: string;
}

const PostControl: React.FC<PostControlProps> = ({ id }) => {
  const { accessToken } = useAppSelector((state) => state.user);
  const [isActivePopup, setIsActive] = useState(false);
  const controlRef = useRef<HTMLDivElement>(null);
  const [isMessageError, SetMessageError] = useState<string | null>(null);

  const [deletePost, { isLoading, isError }] = useDeletePostMutation();

  const onClickControl = () => {
    setIsActive((prev) => !prev);
  };
  const onClickDelete = async () => {
    if (accessToken) {
      const response = await deletePost({ id, accessToken });

      if (isErrorWithMessage(response)) {
        SetMessageError(response.error.data.message);
      }
    } else {
      SetMessageError('you are not authorized to delete a post');
    }
    setIsActive(false);
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
      {(isError || isMessageError) && (
        <Alert type='error'>{isMessageError || 'error when deleting post'}</Alert>
      )}
      <button onClick={onClickControl}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='currentColor'
          className='h-8 w-8'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
          />
        </svg>
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
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='h-6 w-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125'
                  />
                </svg>
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
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='h-6 w-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                  />
                </svg>
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
