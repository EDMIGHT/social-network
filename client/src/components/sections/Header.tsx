import React from 'react';
import { Link } from 'react-router-dom';

import moonIcon from '@/assets/icons/moon.svg';
import Button from '@/components/ui/Button';
import Search from '@/components/ui/Search';
import Thumbnail from '@/components/ui/Thumbnail';

const Header: React.FC = () => {
  return (
    <header className='flex h-full max-h-16 flex-row items-center justify-between rounded bg-light-bg-content p-3'>
      <Link to='/'>
        <div className='whitespace-nowrap bg-gradient-to-r from-activity to-highlight bg-clip-text text-3xl text-transparent transition-all ease-in-out hover:from-highlight hover:to-activity'>
          social 💬
        </div>
      </Link>
      <div className='flex h-full justify-end gap-2'>
        <Search placeholder='search' className='w-full' />
        <img src={moonIcon} alt='dark-theme' className='cursor-pointer hover:contrast-125' />
        {/* <Link
          to='/profile'
          className='w-1/6 rounded border-2 border-transparent transition-all hover:border-activity'
        >
          <Thumbnail
            imgURL='https://i.pinimg.com/564x/41/cf/a1/41cfa1f0553af546e6dd2a3bf70b59ba.jpg'
            alt='me'
          />
        </Link> */}
        <Link to='/signIn'>
          <Button variant='activity' className='w-full hover:contrast-125'>
            sign in
          </Button>
        </Link>
        <Link to='/signIn'>
          <Button variant='highlight' className='w-full hover:contrast-125'>
            sign up
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
