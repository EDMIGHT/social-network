import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

import ProfileHeaderMenu from '@/components/ProfileHeaderMenu';
import Button from '@/components/ui/Button';
import Thumbnail from '@/components/ui/Thumbnail';
import Typography from '@/components/ui/Typography';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { useToggleFollowMutation } from '@/services/users.service';
import { setUser } from '@/store/slices/user.slice';
import { IResponseProfile } from '@/types/responses.types';

interface ProfileHeaderInfoProps {
  data: IResponseProfile;
}

const ProfileHeaderInfo: FC<ProfileHeaderInfoProps> = ({ data }) => {
  const { login: urlLogin } = useParams();
  const dispatch = useAppDispatch();
  const { user, accessToken } = useAppSelector((state) => state.user);

  const [toggleFollow, { isLoading }] = useToggleFollowMutation();

  const onClickFollow = async () => {
    if (!accessToken) {
      toast.error('You are not authorized to follow users');
      return;
    }
    if (!urlLogin) {
      toast.error('Failed to get user login');
      return;
    }

    try {
      const res = await toggleFollow({ login: urlLogin }).unwrap();
      dispatch(setUser(res));
    } catch (error) {
      toast.error('Oops, something went wrong!', {
        description: 'Please try again later or reload the page',
      });
    }
  };

  const { img, login, name } = data;
  // eslint-disable-next-line no-underscore-dangle
  const { createdPosts, followers, following, likedPosts } = data._count;

  return (
    <div className='flex w-full flex-col gap-2'>
      <div className='flex gap-2'>
        <div className='h-32 w-48 md:h-36'>
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
  );
};

export default ProfileHeaderInfo;
