import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: null,
  name: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,

  reducers: {
    setCredentials: (state, action) => {
      const { email, user, accessToken } = action.payload;
      state.email = email;
      state.user = user;
      state.token = accessToken;
    },

    logOut: (state, action) => {
      state.email = null;
      state.name = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentEmail = state => state.auth.email;
export const selectCurrentUser = state => state.auth.user;
export const selectCurrentToken = state => state.auth.token;
