import { setUserData } from '@/store/slices/user.slice';

import { useAppDispatch } from './reduxHooks';
import useLocalStorage from './useLocalStorage';

const useLogout = () => {
  const dispatch = useAppDispatch();
  const [setLocalStorage, getLocalStorage, removeLocalStorage] = useLocalStorage();

  const clear = () => {
    removeLocalStorage('accessToken');
    removeLocalStorage('refreshToken');
    dispatch(setUserData(null));
  };
  return clear;
};

export default useLogout;
