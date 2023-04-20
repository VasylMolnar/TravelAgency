import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import authModalReducer from '../features/modal/authModalSlice';
import { apiSlice } from './api/apiSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    authModal: authModalReducer,
  },

  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
