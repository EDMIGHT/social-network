import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IResponseUser } from '@/types/responses.types';

export interface IUserSlice {
  user: IResponseUser | null;
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: IUserSlice = {
  user: null,
  accessToken: null,
  refreshToken: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<IUserSlice | null>) => {
      const { user, accessToken, refreshToken } = action.payload || {};
      state.user = user || null;
      state.accessToken = accessToken || null;
      state.refreshToken = refreshToken || null;
    },
    setUser: (state, action: PayloadAction<IResponseUser>) => {
      state.user = action.payload;
    },
  },
});

export const { setUserData, setUser } = userSlice.actions;

export default userSlice.reducer;
