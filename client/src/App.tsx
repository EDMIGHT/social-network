import { FC, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import { useAppSelector } from '@/hooks/reduxHooks';
import { useInitialization } from '@/hooks/useInitialization';

import PrivateRoute from './PrivateRoute';

const LikedPosts = lazy(() => import('@/components/LikedPosts'));
const UserFollowers = lazy(() => import('@/components/UserFollowers'));
const UserFollowing = lazy(() => import('@/components/UserFollowing'));
const UserPosts = lazy(() => import('@/components/UserPosts'));
const MainLayout = lazy(() => import('@/layouts/MainLayout'));
const PageLayout = lazy(() => import('@/layouts/PageLayout'));
const SignIn = lazy(() => import('@/pages/SignIn'));
const SignUp = lazy(() => import('@/pages/SignUp'));
const Home = lazy(() => import('@/pages/Home'));
const Profile = lazy(() => import('@/pages/Profile'));
const ComingSoon = lazy(() => import('@/pages/ComingSoon'));
const NotFound = lazy(() => import('@/pages/NotFound'));
const Post = lazy(() => import('@/pages/Post'));
const PostEdit = lazy(() => import('@/pages/PostEdit'));

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
      <Route path='/messages' element={<ComingSoon />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

export default App;
