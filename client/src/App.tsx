import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import useAuthentication from '@/hooks/useAuthentication';
import useLocalStorage from '@/hooks/useLocalStorage';
import useTheme from '@/hooks/useTheme';
import MainLayout from '@/layouts/MainLayout';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Profile from '@/pages/Profile';

const App = React.memo(() => {
  useAuthentication();

  const [setLocal, getLocal] = useLocalStorage();
  const [currentTheme, toggleTheme, setTheme] = useTheme();

  useEffect(() => {
    const theme = getLocal('theme') as 'dark' | 'light';
    if (theme) {
      setTheme(theme);
    }
  }, []);

  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path='/:login' element={<Profile />} />
      </Route>
      <Route path='/signIn' element={<Login />} />
    </Routes>
  );
});

export default App;
