import React from 'react';
import { Link } from 'react-router-dom';

import Thumbnail from '@/components/ui/Thumbnail';
import Typography from '@/components/ui/Typography';

interface UserInfoProps {
  name: string;
  login: string;
  imgURL: string;
}

const UserInfo: React.FC<UserInfoProps> = ({ name, login, imgURL }) => {
  return (
    <Link
      to={`/${login}`}
      className='flex h-28 items-center justify-center gap-2 rounded border-2 border-transparent bg-light-bg-content p-2 transition-all hover:border-activity'
    >
      <div className='h-20 w-2/6'>
        <Thumbnail imgURL={imgURL} alt={name} />
      </div>
      <div className='flex w-4/6 flex-col'>
        <Typography component='h2' variant='title-2'>
          {name}
        </Typography>
        <Typography component='span' variant='description'>
          @{login}
        </Typography>
      </div>
    </Link>
  );
};

export default UserInfo;
