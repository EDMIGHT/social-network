import { useAppDispatch } from '@/hooks/reduxHooks';
import useLocalStorage from '@/hooks/useLocalStorage';
import { authApi } from '@/services/auth.service';
import { setUser } from '@/store/slices/user.slice';

const useAuthentication = (): (() => Promise<void>) => {
  const [setLocalStorage, getLocalStorage] = useLocalStorage();
  const dispatch = useAppDispatch();

  const accessToken = getLocalStorage('accessToken') as string | null;

  const auth = async () => {
    if (!accessToken) {
      return;
    }
    const { data, isSuccess } = await dispatch(authApi.endpoints.authMe.initiate(accessToken));
    if (isSuccess && data) {
      dispatch(setUser(data));
    }
  };

  return auth;
};

export default useAuthentication;
