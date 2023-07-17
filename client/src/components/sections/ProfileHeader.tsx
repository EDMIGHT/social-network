import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Alert from '@/components/ui/Alert';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Thumbnail from '@/components/ui/Thumbnail';
import Typography from '@/components/ui/Typography';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { useGetProfileQuery, useToggleFollowMutation } from '@/services/users.service';
import { setUser } from '@/store/slices/user.slice';

import ProfileHeaderMenu from './ProfileHeaderMenu';
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
    <Card className='flex w-full flex-col gap-2'>
      <div className='flex gap-2'>
        <div className='h-32 w-48'>
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
                  <Button
                    onClick={onClickFollow}
                    variant='highlight'
                    disabled={isLoadingFollow}
                  >
                    unfollow
                  </Button>
                ) : (
                  <Button
                    onClick={onClickFollow}
                    variant='activity'
                    disabled={isLoadingFollow}
                  >
                    follow
                  </Button>
                )}
              </div>
            )}
          </div>

          <ProfileHeaderMenu
            className='hidden sm:flex'
            createdPosts={createdPosts}
            followers={followers}
            following={following}
            likedPosts={likedPosts}
          />
        </div>
      </div>

      <ProfileHeaderMenu
        className='flex sm:hidden'
        createdPosts={createdPosts}
        followers={followers}
        following={following}
        likedPosts={likedPosts}
      />
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
