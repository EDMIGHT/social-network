import { FC } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Thumbnail from '@/components/ui/Thumbnail';
import Typography from '@/components/ui/Typography';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { useToggleFollowMutation } from '@/services/users.service';
import { setUser } from '@/store/slices/user.slice';
import { IJoinedUser } from '@/types/user.types';

export type IUserProps = IJoinedUser & {
  onClickUser?: React.MouseEventHandler<HTMLAnchorElement>;
};

const User: FC<IUserProps> = ({ img, login, name, onClickUser }) => {
  const { user, accessToken } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const [toggleFollow, { isLoading }] = useToggleFollowMutation();

  const onClickFollow = async () => {
    if (!accessToken) {
      toast.error('You are not authorized to follow users');
      return;
    }

    try {
      const response = await toggleFollow({ login }).unwrap();
      dispatch(setUser(response));
    } catch (error) {
      toast.error('Oops, something went wrong!', {
        description: 'Please try again later or reload the page',
      });
    }
  };

  return (
    <li>
      <Card className='flex items-center justify-between gap-2'>
        <Link
          to={`/profile/${login}`}
          onClick={onClickUser}
          className='flex gap-2 hover:opacity-80'
        >
          <div className='h-20 w-20'>
            <Thumbnail imgURL={img} alt={login} />
          </div>
          <div className='flex flex-col justify-center'>
            {name && (
              <Typography component='h3' variant='title-1'>
                {name}
              </Typography>
            )}
            <Typography component='h3' variant='description'>
              @{login}
            </Typography>
          </div>
        </Link>
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
      </Card>
    </li>
  );
};

export default User;
