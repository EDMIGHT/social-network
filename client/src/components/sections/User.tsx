import { FC, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import Card from '@/components/ui/Card';
import Thumbnail from '@/components/ui/Thumbnail';
import Typography from '@/components/ui/Typography';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { useToggleFollowMutation } from '@/services/users.service';
import { setUser } from '@/store/slices/user.slice';
import { IJoinedUser } from '@/types/user.types';

import Button from '../ui/Button';

const User: FC<IJoinedUser> = ({ id, img, login, name }) => {
  const { login: urlLogin } = useParams();
  const { user, accessToken } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const [toggleFollow, { isLoading, isSuccess, data }] = useToggleFollowMutation();

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setUser(data));
    }
  }, [isSuccess]);

  const onClickFollow = async () => {
    if (user && accessToken && urlLogin) {
      await toggleFollow({ accessToken, login: urlLogin });
    }
  };

  return (
    <li>
      <Card className='flex items-center justify-between gap-2'>
        <Link to={`/${login}`} className='flex gap-2 hover:opacity-80'>
          <div className='w-20'>
            <Thumbnail imgURL={img} alt={login} />
          </div>
          <div className='flex flex-col justify-center'>
            {name && (
              <Typography component='h3' variant='title-1'>
                {name}
              </Typography>
            )}
            <Typography component='h3' variant='title-1'>
              {login}
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
