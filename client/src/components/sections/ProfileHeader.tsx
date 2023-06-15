import React from 'react';

import { ResponseUser } from '@/types/user.types';

import Button from '../ui/Button';
import Card from '../ui/Card';
import Thumbnail from '../ui/Thumbnail';
import Time from '../ui/Time';
import Typography from '../ui/Typography';

type ProfileHeaderProps = ResponseUser;

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  createdAt,
  email,
  img,
  login,
  name,
}) => {
  return (
    <Card className='flex w-full gap-2'>
      <div className=' max-w-[170px]'>
        <Thumbnail imgURL={img} alt={login} />
      </div>

      <div className='flex w-full flex-col justify-between gap-1'>
        <div className='flex justify-between gap-1'>
          <div>
            {name && (
              <Typography component='h2' variant='title-2'>
                {name}
              </Typography>
            )}
            <Typography component='h2' variant='description'>
              @{login}
            </Typography>
          </div>

          <div>
            <Button variant='activity'>subscribe</Button>
          </div>
        </div>

        <div className='flex justify-around'>
          <div className='flex flex-col items-center justify-center gap-1'>
            <Typography component='h3' variant='text'>
              posts
            </Typography>
            <Typography component='span' variant='description'>
              10
            </Typography>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-10 w-10'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z'
              />
            </svg>
          </div>
          <div className='flex flex-col items-center justify-center gap-1'>
            <Typography component='h3' variant='text'>
              views
            </Typography>
            <Typography component='span' variant='description'>
              100
            </Typography>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-10 w-10'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z'
              />
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
              />
            </svg>
          </div>
          <div className='flex flex-col items-center justify-center gap-1'>
            <Typography component='h3' variant='text'>
              followers
            </Typography>
            <Typography component='span' variant='description'>
              74
            </Typography>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-10 w-10'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z'
              />
            </svg>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProfileHeader;
