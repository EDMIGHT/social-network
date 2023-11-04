import { FC, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Comments from '@/components/Comments';
import CreateCommentForm from '@/components/form/CreateCommentForm';
import PostContent from '@/components/PostContent';
import PagePostSkeleton from '@/components/skeletons/PagePostSkeleton';
import { Icons } from '@/components/ui/Icons';
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
    if (!isViewed.current && isSuccess && id && accessToken) {
      isViewed.current = true;
      increaseView({
        id,
      });
    }
  }, [accessToken, id, increaseView, isSuccess]);

  useEffect(() => {
    const onClickBody = (e: MouseEvent) => {
      if (postRef && postRef.current && !e.composedPath().includes(postRef.current)) {
        onClickClose();
      }
    };

    document.body.addEventListener('click', onClickBody);
    return () => document.body.removeEventListener('click', onClickBody);
  }, []);

  const loadingOrErrorElements = (isError || isLoading) && <PagePostSkeleton />;
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
        <Icons.x className='h-12 w-12 hover:stroke-primary focus:stroke-primary' />
      </button>
      {loadingOrErrorElements}
      {successElement}
    </div>
  );
};

export default Post;
