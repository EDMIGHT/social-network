import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Alert from '@/components/ui/Alert';
import Button from '@/components/ui/Button';
import Thumbnail from '@/components/ui/Thumbnail';
import Typography from '@/components/ui/Typography';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { useToggleFollowMutation } from '@/services/users.service';
import { setUser } from '@/store/slices/user.slice';
import { IResponseProfile } from '@/types/responses.types';

import ProfileHeaderMenu from './ProfileHeaderMenu';

interface ProfileHeaderInfoProps {
  data: IResponseProfile;
}

const ProfileHeaderInfo: FC<ProfileHeaderInfoProps> = ({ data }) => {
  const { login: urlLogin } = useParams();
  const dispatch = useAppDispatch();
  const { user, accessToken } = useAppSelector((state) => state.user);

  const [toggleFollow, { isLoading, isSuccess, isError, data: dataFollow }] =
    useToggleFollowMutation();

  useEffect(() => {
    if (isSuccess && dataFollow) {
      dispatch(setUser(dataFollow));
    }
  }, [isSuccess]);

  const onClickFollow = async () => {
    if (user && accessToken && urlLogin) {
      await toggleFollow({ accessToken, login: urlLogin });
    }
  };

  const { img, login, name } = data;
  // eslint-disable-next-line no-underscore-dangle
  const { createdPosts, followers, following, likedPosts } = data._count;

  return (
    <>
      {isError && (
        <Alert type='error'>error when subscribing or unsubscribing from a user</Alert>
      )}

      <div className='flex w-full flex-col gap-2'>
        <div className='flex gap-2'>
          <div className='h-36 w-48'>
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
                    <Button onClick={onClickFollow} variant='highlight' disabled={isLoading}>
                      unfollow
                    </Button>
                  ) : (
                    <Button onClick={onClickFollow} variant='activity' disabled={isLoading}>
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
      </div>
    </>
  );
};

export default ProfileHeaderInfo;
