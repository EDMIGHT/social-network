import { FC, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Comments from '@/components/Comments';
import CreateCommentForm from '@/components/form/CreateCommentForm';
import PostContent from '@/components/PostContent';
import PostSkeleton from '@/components/PostSkeleton';
import { useAppSelector } from '@/hooks/reduxHooks';
import { useGetPostQuery, useIncreaseViewPostMutation } from '@/services/post.service';

const Post: FC = () => {
  const isViewed = useRef(false);
  const { id } = useParams();
  const postRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { user, accessToken } = useAppSelector((state) => state.user);

  const { data, isSuccess, isError, isLoading } = useGetPostQuery(id as string);
  const [increaseView] = useIncreaseViewPostMutation();

  const onClickClose = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (!isViewed.current && id && accessToken) {
      isViewed.current = true;
      increaseView({
        id,
      });
    }
  }, [isSuccess]);

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
      <PostContent data={data} onClickClose={onClickClose} />
      <div className='flex w-full flex-1 flex-col gap-2'>
        {user && <CreateCommentForm id={data.id} />}
        <Comments id={data.id} authorId={data.userId} />
      </div>
    </>
  );

  return (
    <div ref={postRef} className='flex flex-col gap-2 lg:flex-row'>
      <button onClick={onClickClose} className='fixed left-3 top-3 hidden xl:block'>
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
