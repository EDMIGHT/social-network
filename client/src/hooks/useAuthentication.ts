import { useEffect } from 'react';

import { useAppDispatch } from '@/hooks/reduxHooks';
import { useAuthMeMutation } from '@/services/auth.service';
import { setUser, setUserData } from '@/store/slices/user.slice';

const useAuthentication = () => {
  const dispatch = useAppDispatch();

  const [authMe, { data, isSuccess }] = useAuthMeMutation();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (accessToken || refreshToken) {
      dispatch(setUserData({ user: null, accessToken, refreshToken }));
      authMe(null);
    }
  }, [authMe, dispatch]);

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setUser(data));
    }
  }, [isSuccess, data, dispatch]);
};

export default useAuthentication;
