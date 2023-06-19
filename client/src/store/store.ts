import { configureStore } from '@reduxjs/toolkit';

import { api } from '@/services/api';
import authMiddleware from '@/services/middleware/auth.middleware';

import * as reducers from './slices';

const store = configureStore({
  reducer: {
    ...reducers,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware, authMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
