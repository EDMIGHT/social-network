import { isRejectedWithValue, Middleware } from '@reduxjs/toolkit';

import useLocalStorage from '@/hooks/useLocalStorage';
import { baseQuery } from '@/services/api';
import { setUser } from '@/store/slices/user.slice';

interface RefreshResult {
  accessToken: string;
  refreshToken: string;
}

const authMiddleware: Middleware = (store) => (next) => async (action) => {
  const [setLocal, getLocal] = useLocalStorage();

  if (isRejectedWithValue(action) && action.payload.status === 401) {
    const refreshToken = getLocal('refreshToken');

    if (refreshToken) {
      const refreshResult = (await baseQuery(
        {
          url: '/auth/token',
          method: 'POST',
          body: { refreshToken },
        },
        store.getState(),
        {}
      )) as { data: RefreshResult };

      if (refreshResult.data) {
        setLocal('accessToken', refreshResult.data.accessToken);
        setLocal('refreshToken', refreshResult.data.refreshToken);

        const response = store.dispatch(action.meta.arg);

        if (response.meta.requestStatus === 'fulfilled') {
          store.dispatch(setUser(response.payload));
        }
      }
    }
  }

  return next(action);
};

export default authMiddleware;
