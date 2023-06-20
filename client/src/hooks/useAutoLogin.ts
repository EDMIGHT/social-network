import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthMeQuery } from '@/services/auth.service';
import { setUser } from '@/store/slices/user.slice';

import { useAppDispatch } from './reduxHooks';
import useLocalStorage from './useLocalStorage';

export const useAutoLogin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [setLocalStorage, getLocalStorage] = useLocalStorage();
  const accessToken = (getLocalStorage('accessToken') || '') as string;

  const { data, isSuccess, isError } = useAuthMeQuery(accessToken);

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setUser(data));
    }
    if (isError) {
      navigate('/signIn');
    }
  }, [isSuccess, isError, data]);
};
