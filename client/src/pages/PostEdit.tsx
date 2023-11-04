import { FC, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import EditPostForm from '@/components/form/EditPostForm';
import PostAuthor from '@/components/PostAuthor';
import PostNotFound from '@/components/PostNotFound';
import PageEditPostSkeleton from '@/components/skeletons/PageEditPostSkeleton';
import Card from '@/components/ui/Card';
import { Icons } from '@/components/ui/Icons';
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
        <button onClick={onClickClose} className='fixed left-3 top-3 hidden xl:block'>
          <Icons.x className='h-12 w-12 hover:stroke-primary focus:stroke-primary' />
        </button>
        <Card className='flex flex-col gap-2'>
          <button
            onClick={onClickClose}
            className='block w-fit rounded-full bg-accent xl:hidden'
          >
            <Icons.x className='h-8 w-8 hover:stroke-primary focus:stroke-primary' />
          </button>
          <PostAuthor user={user} createdAt={createdAt} updatedAt={updatedAt} />

          <EditPostForm {...data} />
        </Card>
      </div>
    );
  }

  if (isError) {
    return <PostNotFound />;
  }

  return <PageEditPostSkeleton />;
};

export default PostEdit;
