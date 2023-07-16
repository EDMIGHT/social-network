import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import LikedPosts from '@/components/sections/LikedPosts';
import UserFollowers from '@/components/sections/UserFollowers';
import UserFollowing from '@/components/sections/UserFollowing';
import UserPosts from '@/components/sections/UserPosts';
import { useAppSelector } from '@/hooks/reduxHooks';
import { useInitialization } from '@/hooks/useInitialization';
import MainLayout from '@/layouts/MainLayout';
import PageLayout from '@/layouts/PageLayout';
import Home from '@/pages/Home';
import NotFound from '@/pages/NotFound';
import Post from '@/pages/Post';
import PostEdit from '@/pages/PostEdit';
import Profile from '@/pages/Profile';
import SignIn from '@/pages/SignIn';
import SignUp from '@/pages/SignUp';

import PrivateRoute from './PrivateRoute';

const App: FC = () => {
  const { user } = useAppSelector((state) => state.user);
  useInitialization();

  return (
    <Routes>
      <Route path='/signIn' element={<SignIn />} />
      <Route path='/signUp' element={<SignUp />} />
      <Route path='/' element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path='profile/:login' element={<Profile />}>
          <Route index element={<UserPosts />} />
          <Route path='likedPosts' element={<LikedPosts />} />
          <Route path='following' element={<UserFollowing />} />
          <Route path='followers' element={<UserFollowers />} />
        </Route>
      </Route>
      <Route path='/post' element={<PageLayout />}>
        <Route path=':id' element={<Post />} />
        <Route
          path='edit/:id'
          element={
            <PrivateRoute user={user}>
              <PostEdit />
            </PrivateRoute>
          }
        />
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

export default App;
