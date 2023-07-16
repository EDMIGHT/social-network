import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Thumbnail from '@/components/ui/Thumbnail';
import Typography from '@/components/ui/Typography';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { useToggleFollowMutation } from '@/services/users.service';
import { setUser } from '@/store/slices/user.slice';
import { isErrorWithMessage } from '@/types/responses.types';
import { IJoinedUser } from '@/types/user.types';

import Alert from '../ui/Alert';

interface IUserProps extends IJoinedUser {
  onClickUser?: any;
}

const User: FC<IUserProps> = ({ id, img, login, name, onClickUser }) => {
  const [isMessageError, SetMessageError] = useState<string | null>(null);
  const { user, accessToken } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const [toggleFollow, { isLoading, isSuccess, isError, data }] = useToggleFollowMutation();

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setUser(data));
    }
  }, [isSuccess]);

  const onClickFollow = async () => {
    if (user && accessToken && login) {
      const response = await toggleFollow({ accessToken, login });

      if (isErrorWithMessage(response)) {
        SetMessageError(response.error.data.message);
      }
    } else {
      SetMessageError('you are not authorized to follow or unfollow a user');
    }
  };

  return (
    <li>
      {(isError || isMessageError) && (
        <Alert type='error'>
          {isMessageError || 'error when subscribing or unsubscribing to a user'}
        </Alert>
      )}

      <Card className='flex items-center justify-between gap-2'>
        <Link to={`/${login}`} onClick={onClickUser} className='flex gap-2 hover:opacity-80'>
          <div className='w-20'>
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
