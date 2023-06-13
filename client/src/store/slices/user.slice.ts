import { createSlice } from '@reduxjs/toolkit';

import { User } from '@/types/user.types';

export interface IUserSlice {
  user: User | null;
  accessToken: string | null;
}

const initialState: IUserSlice = {
  user: null,
  accessToken: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
});

// export const {} = userSlice.actions;

export default userSlice.reducer;
