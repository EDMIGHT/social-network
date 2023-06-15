import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ResponseAuth, ResponseUser } from '@/types/user.types';

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
    setUserData: (state, action: PayloadAction<ResponseAuth>) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.expiresIn = action.payload.expiresIn;
    },
    setUser: (state, action: PayloadAction<ResponseUser>) => {
      state.user = action.payload;
    },
  },
});

export const { setUserData, setUser } = userSlice.actions;

export default userSlice.reducer;
