import { useEffect } from 'react';

import { useAuthMeMutation } from '@/services/auth.service';
import { setUserData } from '@/store/slices/user.slice';

import { useAppDispatch } from './reduxHooks';
import useLocalStorage from './useLocalStorage';

const useAuthentication = () => {
  const dispatch = useAppDispatch();
  const [setLocalStorage, getLocalStorage] = useLocalStorage();

  const accessToken = (getLocalStorage('accessToken') || '') as string;
  const refreshToken = (getLocalStorage('refreshToken') || '') as string;

  const [authMe, { data, isSuccess }] = useAuthMeMutation();

  useEffect(() => {
    if (accessToken) {
      authMe(accessToken);
    }
  }, [accessToken]);

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setUserData({ user: data, accessToken, refreshToken }));
    }
  }, [isSuccess, data]);
};

export default useAuthentication;
