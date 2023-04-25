import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  accessToken: null,
  roles: null,
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
      state.accessToken = null;
      state.roles = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

//select
export const selectCurrentUserId = state => state.auth.id;
export const selectCurrentToken = state => state.auth.accessToken;
export const selectCurrentRoles = state => state.auth.roles;
