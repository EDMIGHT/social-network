import React from 'react';
import { Route, Routes } from 'react-router-dom';

import useAuthentication from '@/hooks/useAuthentication';
import MainLayout from '@/layouts/MainLayout';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Profile from '@/pages/Profile';

const App = React.memo(() => {
  useAuthentication();

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
