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
      // попытка получить новый токен
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
        // сохранение нового токена
        setLocal('accessToken', refreshResult.data.accessToken);
        setLocal('refreshToken', refreshResult.data.refreshToken);

        // повторный запрос с новым access токеном
        const response = store.dispatch(action.meta.arg);

        if (response.meta.requestStatus === 'fulfilled') {
          store.dispatch(setUser(response.payload));
        }
      }
    }
    // ! найти способ как доставать ошибку до того, как toolkit её сьест
  }

  return next(action);
};

export default authMiddleware;
