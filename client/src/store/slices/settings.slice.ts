import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsSlice {
  theme: 'dark' | 'light';
}

const initialState = {
  theme: localStorage.getItem('theme') || 'dark',
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<SettingsSlice['theme']>) {
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = settingsSlice.actions;

export default settingsSlice.reducer;
