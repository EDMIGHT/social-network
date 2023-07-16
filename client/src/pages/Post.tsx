import { FC, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Comments from '@/components/sections/Comments';
import CreateComment from '@/components/sections/CreateComment';
import PostHeader from '@/components/sections/PostHeader';
import PostMenu from '@/components/sections/PostMenu';
import PostNotFound from '@/components/sections/PostNotFound';
import Tags from '@/components/sections/Tags';
import Card from '@/components/ui/Card';
import Typography from '@/components/ui/Typography';
import { useAppSelector } from '@/hooks/reduxHooks';
import { useGetPostQuery } from '@/services/post.service';

const Post: FC = () => {
  const { id } = useParams();
  const postRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { user: localUser } = useAppSelector((state) => state.user);

  const { data, isSuccess, isError } = useGetPostQuery(id as string);

  const onClickImg = () => {};
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

  if (isSuccess && id) {
    const {
      id: responseId,
      createdAt,
      updatedAt,
      user,
      img,
      text,
      likedBy,
      comments,
      tags,
    } = data;

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
        <Card className='flex h-fit flex-[2] flex-col gap-2'>
          <PostHeader
            id={responseId}
            createdAt={createdAt}
            updatedAt={updatedAt}
            user={user}
          />
          <Tags data={tags} className='p-0' />
          <button onClick={onClickImg}>
            {img && (
              <div className='h-[70vh] cursor-pointer bg-black'>
                <img src={img} alt={user.login} className='mx-auto h-full object-cover' />
              </div>
            )}
          </button>
          <Typography component='p' variant='text'>
            {text}
          </Typography>
          <PostMenu id={responseId} comments={comments} likedBy={likedBy} />
        </Card>

        <div className='flex w-[400px] flex-1 flex-col gap-2'>
          {localUser && <CreateComment id={responseId} />}
          <Comments id={responseId} />
        </div>
      </div>
    );
  }

  if (isError) {
    return <PostNotFound />;
  }

  return <div>loading</div>;
};

export default Post;
