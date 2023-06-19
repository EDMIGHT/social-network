import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ResponseAuth } from '@/types/responses.types';
import { ResponseUser } from '@/types/user.types';

export interface IUserSlice {
  user: ResponseUser | null;
  expiresIn: number | null;
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: IUserSlice = {
  user: null,
  accessToken: null,
  refreshToken: null,
  expiresIn: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<ResponseAuth | null>) => {
      const { user, accessToken, refreshToken, expiresIn } = action.payload || {};
      state.user = user || null;
      state.accessToken = accessToken || null;
      state.refreshToken = refreshToken || null;
      state.expiresIn = expiresIn || null;
    },
    setUser: (state, action: PayloadAction<ResponseUser>) => {
      state.user = action.payload;
    },
  },
});

export const { setUserData, setUser } = userSlice.actions;

export default userSlice.reducer;
