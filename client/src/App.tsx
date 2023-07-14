import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import LikedPosts from '@/components/sections/LikedPosts';
import UserFollowers from '@/components/sections/UserFollowers';
import UserFollowing from '@/components/sections/UserFollowing';
import UserPosts from '@/components/sections/UserPosts';
import { useInitialization } from '@/hooks/useInitialization';
import MainLayout from '@/layouts/MainLayout';
import PageLayout from '@/layouts/PageLayout';
import Home from '@/pages/Home';
import Post from '@/pages/Post';
import PostEdit from '@/pages/PostEdit';
import Profile from '@/pages/Profile';
import SignIn from '@/pages/SignIn';

const App: FC = () => {
  useInitialization();

  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path='/:login' element={<Profile />}>
          <Route index element={<UserPosts />} />
          <Route path='likedPosts' element={<LikedPosts />} />
          <Route path='following' element={<UserFollowing />} />
          <Route path='followers' element={<UserFollowers />} />
        </Route>
      </Route>
      <Route path='/post' element={<PageLayout />}>
        <Route path=':id' element={<Post />} />
        <Route path='edit/:id' element={<PostEdit />} />
      </Route>
      <Route path='/signIn' element={<SignIn />} />
    </Routes>
  );
};

export default App;
