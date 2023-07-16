import { FC, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Comments from '@/components/sections/Comments';
import CreateComment from '@/components/sections/CreateComment';
import PostContent from '@/components/sections/PostContent';
import PostSkeleton from '@/components/sections/PostSkeleton';
import { useAppSelector } from '@/hooks/reduxHooks';
import { useGetPostQuery } from '@/services/post.service';

const Post: FC = () => {
  const { id } = useParams();
  const postRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { user: localUser } = useAppSelector((state) => state.user);

  const { data, isSuccess, isError, isLoading } = useGetPostQuery(id as string);

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

  const loadingOrErrorElements = (isError || isLoading) && <PostSkeleton />;
  const successElement = isSuccess && data && (
    <>
      <PostContent data={data} />
      <div className='flex w-[400px] flex-1 flex-col gap-2'>
        {localUser && <CreateComment id={data.id} />}
        <Comments id={data.id} />
      </div>
    </>
  );

  return (
    <div ref={postRef} className='flex gap-2'>
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
      {loadingOrErrorElements}
      {successElement}
    </div>
  );
};

export default Post;
