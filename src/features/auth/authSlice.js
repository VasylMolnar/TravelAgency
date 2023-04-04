import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: null,
  user: null,
  token: null,
  roles: null,
  pwd: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { email, user, roles, pwd, accessToken } = action.payload;

      state.email = email;
      state.user = user;
      state.token = accessToken;
      state.roles = roles;
      state.pwd = pwd;
    },

    logOut: (state, action) => {
      state.email = null;
      state.user = null;
      state.token = null;
      state.roles = null;
      state.pwd = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentEmail = state => state.auth.email;
export const selectCurrentUser = state => state.auth.user;
export const selectCurrentToken = state => state.auth.token;
