import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import useAuthentication from '@/hooks/useAuthentication';
import useLocalStorage from '@/hooks/useLocalStorage';
import useTheme from '@/hooks/useTheme';
import MainLayout from '@/layouts/MainLayout';
import PostLayout from '@/layouts/PostLayout';
import Home from '@/pages/Home';
import Profile from '@/pages/Profile';
import SignIn from '@/pages/SignIn';

import Post from './pages/Post';
import PostEdit from './pages/PostEdit';

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
        <Route path='/:login' element={<Profile />} />
      </Route>
      <Route path='/post' element={<PostLayout />}>
        <Route path=':id' element={<Post />} />
        <Route path='edit/:id' element={<PostEdit />} />
      </Route>
      <Route path='/signIn' element={<SignIn />} />
    </Routes>
  );
});

export default App;
