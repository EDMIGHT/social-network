import { FC } from 'react';
import { Link } from 'react-router-dom';

import Thumbnail from '@/components/ui/Thumbnail';
import Time from '@/components/ui/Time';
import Typography from '@/components/ui/Typography';
import { IResponsePost } from '@/types/responses.types';

const PostAuthor: FC<Pick<IResponsePost, 'createdAt' | 'updatedAt' | 'user'>> = ({
  createdAt,
  updatedAt,
  user,
}) => {
  return (
    <Link to={`/${user.login}`} className='flex w-fit gap-2 hover:opacity-80'>
      <div className='w-20'>
        <Thumbnail imgURL={user.img} alt={user.login} />
      </div>
      <div className='flex flex-col justify-center'>
        <Typography component='h3' variant='title-1'>
          {user.name ?? user.login}
        </Typography>
        {createdAt && <Time time={new Date(createdAt)}>created at:</Time>}
        {updatedAt && <Time time={new Date(updatedAt)}>updated at:</Time>}
      </div>
    </Link>
  );
};

export default PostAuthor;
