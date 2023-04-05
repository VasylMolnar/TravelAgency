import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  email: null,
  username: null,
  token: null,
  roles: null,
  password: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { id, email, username, roles, password, accessToken } =
        action.payload;

      state.id = id;
      state.email = email;
      state.username = username;
      state.token = accessToken;
      state.roles = roles;
      state.password = password;
    },

    logOut: (state, action) => {
      state.id = null;
      state.email = null;
      state.username = null;
      state.token = null;
      state.roles = null;
      state.password = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentEmail = state => state.auth.email;
export const selectCurrentUser = state => state.auth.user;
export const selectCurrentToken = state => state.auth.token;
