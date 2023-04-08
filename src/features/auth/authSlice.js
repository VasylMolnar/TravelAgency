import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  email: null,
  username: null,
  accessToken: null,
  roles: null,
  password: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      return { ...state, ...action.payload };
    },

    logOut: (state, action) => {
      state.id = null;
      state.email = null;
      state.username = null;
      state.accessToken = null;
      state.roles = null;
      state.password = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

//select
export const selectCurrentEmail = state => state.auth.email;
export const selectCurrentUser = state => state.auth.user;
export const selectCurrentToken = state => state.auth.accessToken;
export const selectCurrentRoles = state => state.auth.roles;
