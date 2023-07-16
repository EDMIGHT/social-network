import { FC, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import PostAuthor from '@/components/sections/PostAuthor';
import PostEditForm from '@/components/sections/PostEditForm';
import PostNotFound from '@/components/sections/PostNotFound';
import Card from '@/components/ui/Card';
import { useGetPostQuery } from '@/services/post.service';

const PostEdit: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const postRef = useRef<HTMLDivElement>(null);

  const { data, isSuccess, isError } = useGetPostQuery(id as string);

  const onClickClose = () => {
    navigate(-1);
  };

  useEffect(() => {
    const onClickBody = (e: MouseEvent) => {
      if (postRef && postRef.current && !e.composedPath().includes(postRef.current)) {
        onClickClose();
      }
    };

    document.body.addEventListener('click', onClickBody);
    return () => document.body.removeEventListener('click', onClickBody);
  }, []);

  if (isSuccess) {
    const { createdAt, updatedAt, user } = data;
    return (
      <div ref={postRef}>
        <button onClick={onClickClose} className='fixed left-3 top-3'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='h-12 w-12 hover:stroke-primary focus:stroke-primary'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
          </svg>
        </button>
        <Card className='flex flex-col gap-2'>
          <PostAuthor user={user} createdAt={createdAt} updatedAt={updatedAt} />

          <PostEditForm {...data} />
        </Card>
      </div>
    );
  }

  if (isError) {
    return <PostNotFound />;
  }

  return <div>loading</div>;
};

export default PostEdit;
