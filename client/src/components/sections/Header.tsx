import React from 'react';
import { Link } from 'react-router-dom';

import Button from '@/components/ui/Button';
import Search from '@/components/ui/Search';
import Thumbnail from '@/components/ui/Thumbnail';

const Header: React.FC = () => {
  return (
    <header className='flex max-h-16 flex-row items-center justify-between rounded bg-light-bg-content p-3'>
      <Link to='/'>
        <div className='whitespace-nowrap bg-gradient-to-r from-activity to-highlight bg-clip-text text-3xl text-transparent transition-all ease-in-out hover:from-highlight hover:to-activity'>
          social 💬
        </div>
      </Link>
      <div className='flex h-full justify-end gap-2'>
        <Search placeholder='search' className='w-4/6' />
        <Link
          to='/profile'
          className='rounded border-2 border-transparent transition-all hover:border-activity'
        >
          <Thumbnail
            imgURL='https://i.pinimg.com/564x/41/cf/a1/41cfa1f0553af546e6dd2a3bf70b59ba.jpg'
            alt='me'
          />
        </Link>
        {/* <Button text='sign in' variant='activity' className='w-1/6' />
        <Button text='sign up' variant='highlight' className='w-1/6' /> */}
      </div>
    </header>
  );
};

export default Header;
