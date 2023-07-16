import { FC, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';

import Alert from '@/components/ui/Alert';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Thumbnail from '@/components/ui/Thumbnail';
import Typography from '@/components/ui/Typography';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { useGetProfileQuery, useToggleFollowMutation } from '@/services/users.service';
import { setUser } from '@/store/slices/user.slice';
import { cn } from '@/utils/cn';

import ProfileHeaderSkeleton from './ProfileHeaderSkeleton';
import ProfileNotFound from './ProfileNotFound';

const ProfileHeader: FC = () => {
  const { login: urlLogin } = useParams();
  const dispatch = useAppDispatch();
  const { user, accessToken } = useAppSelector((state) => state.user);

  const {
    data,
    isLoading: isLoadingProfile,
    isSuccess: isSuccessProfile,
    isError: isErrorProfile,
  } = useGetProfileQuery(urlLogin as string);
  const [
    toggleFollow,
    {
      isLoading: isLoadingFollow,
      isSuccess: isSuccessFollow,
      isError: isErrorFollow,
      data: dataFollow,
    },
  ] = useToggleFollowMutation();

  useEffect(() => {
    if (isSuccessFollow && data) {
      dispatch(setUser(dataFollow));
    }
  }, [isSuccessFollow]);

  if (!data) return <ProfileNotFound />;

  const onClickFollow = async () => {
    if (user && accessToken && urlLogin) {
      await toggleFollow({ accessToken, login: urlLogin });
    }
  };

  const { img, login, name } = data;
  // eslint-disable-next-line no-underscore-dangle
  const { createdPosts, followers, following, likedPosts } = data._count;

  const loadingOrErrorElements = (isErrorProfile || isLoadingProfile) && (
    <ProfileHeaderSkeleton />
  );
  const successElements = isSuccessProfile && (
    <Card className='flex w-full gap-2'>
      <div className='max-h-[160px] w-[220px]'>
        <Thumbnail imgURL={img} alt={login} />
      </div>

      <div className='flex w-full flex-col justify-between gap-1'>
        <div className='flex justify-between gap-1'>
          <div>
            {name && (
              <Typography component='h2' variant='title-2'>
                {name}
              </Typography>
            )}
            <Typography component='h2' variant='description'>
              @{login}
            </Typography>
          </div>

          {user && user.login !== login && (
            <div>
              {user.following.some((u) => u.login === login) ? (
                <Button onClick={onClickFollow} variant='highlight' disabled={isLoadingFollow}>
                  unfollow
                </Button>
              ) : (
                <Button onClick={onClickFollow} variant='activity' disabled={isLoadingFollow}>
                  follow
                </Button>
              )}
            </div>
          )}
        </div>

        <div className='flex justify-around'>
          <NavLink
            to=''
            end
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center justify-between gap-1 hover:text-accent',
                isActive && 'text-primary'
              )
            }
          >
            <Typography component='h3' variant='text'>
              posts
            </Typography>
            <Typography component='span' variant='description'>
              {createdPosts}
            </Typography>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-10 w-10'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z'
              />
            </svg>
          </NavLink>

          <NavLink
            to='likedPosts'
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center justify-between gap-1 hover:text-accent',
                isActive && 'text-primary'
              )
            }
          >
            <Typography component='h3' variant='text'>
              liked posts
            </Typography>
            <Typography component='span' variant='description'>
              {likedPosts}
            </Typography>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='h-10 w-10'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z'
              />
            </svg>
          </NavLink>
          <NavLink
            to='following'
            end
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center justify-between gap-1 hover:text-accent',
                isActive && 'text-primary'
              )
            }
          >
            <Typography component='h3' variant='text'>
              following
            </Typography>
            <Typography component='span' variant='description'>
              {following}
            </Typography>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-10 w-10'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z'
              />
            </svg>
          </NavLink>
          <NavLink
            to='followers'
            end
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center justify-between gap-1 hover:text-accent',
                isActive && 'text-primary'
              )
            }
          >
            <Typography component='h3' variant='text'>
              followers
            </Typography>
            <Typography component='span' variant='description'>
              {followers}
            </Typography>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-10 w-10'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z'
              />
            </svg>
          </NavLink>
        </div>
      </div>
    </Card>
  );

  return (
    <>
      {isErrorProfile && <Alert type='error'>error getting profile</Alert>}
      {isErrorFollow && (
        <Alert type='error'>error when subscribing or unsubscribing from a user</Alert>
      )}

      {loadingOrErrorElements}
      {successElements}
    </>
  );
};

export default ProfileHeader;
