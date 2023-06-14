import React from 'react';
import { Link } from 'react-router-dom';

import moonIcon from '@/assets/icons/moon.svg';
import Button from '@/components/ui/Button';
import Search from '@/components/ui/Search';
import Thumbnail from '@/components/ui/Thumbnail';
import { useAppSelector } from '@/hooks/reduxHooks';

const Header: React.FC = () => {
  const user = useAppSelector((state) => state.user.user);

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
        {user ? (
          <Link
            to={`/${user.login}`}
            className='w-1/6 rounded border-2 border-transparent transition-all hover:border-activity'
          >
            <Thumbnail imgURL={user.img} alt='me' />
          </Link>
        ) : (
          <>
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
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
