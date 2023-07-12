import { FC } from 'react';
import { useParams } from 'react-router-dom';

import Posts from '@/components/sections/Posts';
import Typography from '@/components/ui/Typography';
import { useAppSelector } from '@/hooks/reduxHooks';
import { useGetLikedPostsQuery } from '@/services/users.service';
import formatTagsForQuery from '@/utils/formatTagsForQuery';

const LikedPosts: FC = () => {
  const { login } = useParams();
  const { tags } = useAppSelector((state) => state.options);

  const tagsQuery = tags && formatTagsForQuery(tags);
  const { data, isSuccess } = useGetLikedPostsQuery({
    login: login as string,
    tags: tagsQuery,
  });

  if (isSuccess && data) {
    return (
      <div className='flex flex-col items-center justify-center gap-2'>
        <Typography component='h2' variant='title-2'>
          Liked Posts {login}
        </Typography>
        <Posts posts={data?.posts} />
      </div>
    );
  }

  return <div>loading</div>;
};

export default LikedPosts;
