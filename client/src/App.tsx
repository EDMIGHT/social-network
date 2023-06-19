import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import useAuthentication from '@/hooks/useAuthentication';
import MainLayout from '@/layouts/MainLayout';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Profile from '@/pages/Profile';

const App = React.memo(() => {
  const fetchAuth = useAuthentication();

  useEffect(() => {
    try {
      fetchAuth();
    } catch (error) {
      console.log('da ', error);
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
