import { FC, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Comments from '@/components/sections/Comments';
import CreateComment from '@/components/sections/CreateComment';
import PostHeader from '@/components/sections/PostHeader';
import PostMenu from '@/components/sections/PostMenu';
import Card from '@/components/ui/Card';
import Typography from '@/components/ui/Typography';
import { useGetPostQuery } from '@/services/post.service';
import { isBadResponse } from '@/types/responses.types';

const Post: FC = () => {
  const { id } = useParams();
  const postRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

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

  if (isError && isBadResponse(data)) {
    return <div>{isError && data && data.message}</div>;
  }
  if (isSuccess && id && !isBadResponse(data)) {
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
          <PostHeader user={data.user} createdAt={data.createdAt} updatedAt={data.updatedAt} />
          <button onClick={onClickImg}>
            {data.img && (
              <div className='h-[70vh] cursor-pointer bg-black'>
                <img
                  src={data.img}
                  alt={data.user.login}
                  className='mx-auto h-full object-cover'
                />
              </div>
            )}
          </button>
          <Typography component='p' variant='text'>
            {data.text}
          </Typography>
          <PostMenu id={data.id} comments={data.comments} likedBy={data.likedBy} />
        </Card>

        <div className='flex w-[400px] flex-1 flex-col gap-2'>
          <CreateComment id={id} />
          <Comments id={id} />
        </div>
      </div>
    );
  }

  return <div>loading</div>;
};

export default Post;
