import React from 'react';
import { Link } from 'react-router-dom';

import Card from '@/components/ui/Card';
import Thumbnail from '@/components/ui/Thumbnail';
import Typography from '@/components/ui/Typography';

interface UserInfoProps {
  name: string | null;
  login: string;
  imgURL: string;
}

const UserInfo: React.FC<UserInfoProps> = ({ name, login, imgURL }) => {
  return (
    <Card className='border-2 border-transparent p-0 transition-all hover:border-activity'>
      <Link to={`/${login}`} className='flex items-center justify-center gap-2 p-2'>
        <div className='h-20 w-2/6 min-w-[80px]'>
          <Thumbnail imgURL={imgURL} alt={login} />
        </div>
        <div className='flex w-4/6 flex-col'>
          <Typography component='span' variant='text' className='text-2xl'>
            Hello 👋
          </Typography>
          <Typography component='h2' variant='text'>
            {login}
          </Typography>
        </div>
      </Link>
    </Card>
  );
};

export default UserInfo;
