import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import Button from '@/components/ui/Button';
import Popup from '@/components/ui/Popup';
import Thumbnail from '@/components/ui/Thumbnail';
import Typography from '@/components/ui/Typography';
import { useAppSelector } from '@/hooks/reduxHooks';
import useLogout from '@/hooks/useLogout';
import useTheme from '@/hooks/useTheme';

import Search from './Search';

const Header: React.FC = () => {
  const user = useAppSelector((state) => state.user.user);
  const logout = useLogout();

  const [theme, toggleTheme] = useTheme();

  const [isActivePopup, setActivePopup] = useState(false);
  const popupRef = useRef(null);

  const onClickThemeSwitcher = () => {
    toggleTheme();
  };
  const onClickThumbnail = () => {
    setActivePopup((prev) => !prev);
  };
  const onClickPopupItem = () => {
    setActivePopup(false);
  };
  const onClickLogout = () => {
    setActivePopup(false);
    logout();
  };

  useEffect(() => {
    const clickHandler = (e: MouseEvent) => {
      if (popupRef.current && !e.composedPath().includes(popupRef.current)) {
        setActivePopup(false);
      }
    };

    document.body.addEventListener('click', clickHandler);
    return () => document.body.removeEventListener('click', clickHandler);
  }, []);

  return (
    <header className='flex h-full max-h-16 flex-row items-center justify-between rounded bg-card p-3'>
      <Link to='/'>
        <div className='whitespace-nowrap bg-gradient-to-r from-primary to-accent bg-clip-text text-3xl text-transparent transition-all ease-in-out hover:from-accent hover:to-primary'>
          social 💬
        </div>
      </Link>
      <div className='flex h-full justify-end gap-2'>
        <Search />
        <button onClick={onClickThemeSwitcher} className='h-full'>
          {theme === 'light' && (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='none'
              className='h-8 w-8 fill-primary stroke-primary hover:fill-accent hover:stroke-accent'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z'
              />
            </svg>
          )}
          {theme === 'dark' && (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='h-8 w-8 fill-primary stroke-primary hover:fill-accent hover:stroke-accent'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z'
              />
            </svg>
          )}
        </button>
        {user ? (
          <div className='relative inline-block' ref={popupRef}>
            <button className='h-full w-full min-w-[40px]' onClick={onClickThumbnail}>
              <Thumbnail imgURL={user.img} alt='me' />
            </button>
            <Popup isActive={isActivePopup}>
              <ul className={clsx('cursor-pointer', !isActivePopup && 'hidden')}>
                <li className='block w-full p-2 hover:text-white'>
                  <Link to={`/${user.login}`} onClick={onClickPopupItem}>
                    <Typography component='span' variant='title-2'>
                      profile
                    </Typography>
                  </Link>
                </li>
                <li className='p-2 hover:text-white'>
                  <button onClick={onClickLogout}>
                    <Typography component='span' variant='title-2'>
                      logout
                    </Typography>
                  </button>
                </li>
              </ul>
            </Popup>
          </div>
        ) : (
          <>
            <Link to='/signIn'>
              <Button variant='activity' className='w-full hover:contrast-125'>
                sign in
              </Button>
            </Link>
            <Link to='/signUp'>
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
