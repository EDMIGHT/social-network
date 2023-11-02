import { createAsyncThunk } from '@reduxjs/toolkit';

import { setUserData } from '@/store/slices/user.slice';

export const logOutThunk = createAsyncThunk('auth/auth-me', async (_, { dispatch }) => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  dispatch(setUserData(null));
});
