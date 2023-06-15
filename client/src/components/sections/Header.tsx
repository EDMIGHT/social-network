import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import moonIcon from '@/assets/icons/moon.svg';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Search from '@/components/ui/Search';
import Thumbnail from '@/components/ui/Thumbnail';
import Typography from '@/components/ui/Typography';
import { useAppSelector } from '@/hooks/reduxHooks';
import useLogout from '@/hooks/useLogout';

import Popup from '../ui/Popup';

const Header: React.FC = () => {
  const user = useAppSelector((state) => state.user.user);
  const logout = useLogout();

  const [isActivePopup, setActivePopup] = useState(false);
  const popupRef = useRef(null);

  const onClickThumbnail = () => {
    setActivePopup((prev) => !prev);
  };

  const onClickLogout = () => {
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
          <div className='relative inline-block w-1/6' ref={popupRef}>
            <button className='h-full w-full' onClick={onClickThumbnail}>
              <Thumbnail imgURL={user.img} alt='me' />
            </button>
            <Popup isActive={isActivePopup}>
              <ul className='cursor-pointer'>
                <li className='block w-full p-2 hover:text-white'>
                  <Link to={`/${user.login}`}>
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
