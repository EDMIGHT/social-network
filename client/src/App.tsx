import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import LikedPosts from '@/components/sections/LikedPosts';
import useAuthentication from '@/hooks/useAuthentication';
import useLocalStorage from '@/hooks/useLocalStorage';
import useTheme from '@/hooks/useTheme';
import MainLayout from '@/layouts/MainLayout';
import PageLayout from '@/layouts/PageLayout';
import Home from '@/pages/Home';
import Post from '@/pages/Post';
import PostEdit from '@/pages/PostEdit';
import Profile from '@/pages/Profile';
import SignIn from '@/pages/SignIn';

import UserPosts from './components/sections/UserPosts';

const App = React.memo(() => {
  useAuthentication();

  const [setLocal, getLocal] = useLocalStorage();
  const [currentTheme, toggleTheme, setTheme] = useTheme();

  useEffect(() => {
    const prefersDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = getLocal('theme') as 'dark' | 'light';
    if (theme) {
      setTheme(theme);
    } else if (prefersDarkTheme) {
      setTheme('dark');
    }
  }, []);

  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path='/:login' element={<Profile />}>
          <Route index element={<UserPosts />} />
          <Route path='likedPosts' element={<LikedPosts />} />
        </Route>
        {/* <Route path='/likedPosts/:login' element={<LikedPosts />} /> */}
      </Route>
      <Route path='/post' element={<PageLayout />}>
        <Route path=':id' element={<Post />} />
        <Route path='edit/:id' element={<PostEdit />} />
      </Route>
      <Route path='/signIn' element={<SignIn />} />
    </Routes>
  );
});

export default App;
