import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthMeMutation } from '@/services/auth.service';
import { setUserData } from '@/store/slices/user.slice';

import { useAppDispatch } from './reduxHooks';
import useLocalStorage from './useLocalStorage';

const useAuthentication = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [setLocalStorage, getLocalStorage] = useLocalStorage();

  const accessToken = (getLocalStorage('accessToken') || '') as string;
  const refreshToken = (getLocalStorage('refreshToken') || '') as string;

  const [authMe, { data, isSuccess, isError }] = useAuthMeMutation();

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

  useEffect(() => {
    if (isError) {
      navigate('/signIn');
    }
  }, [isError]);
};

export default useAuthentication;
