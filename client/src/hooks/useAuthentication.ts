import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthMeQuery } from '@/services/auth.service';
import { setUser, setUserData } from '@/store/slices/user.slice';

import { useAppDispatch } from './reduxHooks';
import useLocalStorage from './useLocalStorage';

const useAuthentication = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [setLocalStorage, getLocalStorage] = useLocalStorage();

  const accessToken = (getLocalStorage('accessToken') || '') as string;
  const refreshToken = (getLocalStorage('refreshToken') || '') as string;

  const { data, isSuccess, isError } = useAuthMeQuery(accessToken);

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setUser(data));
      dispatch(setUserData({ user: data, accessToken, refreshToken }));
    }
    if (isError) {
      navigate('/signIn');
    }
  }, [isSuccess, isError, data]);
};

export default useAuthentication;
