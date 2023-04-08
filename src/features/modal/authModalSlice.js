import { createSlice } from '@reduxjs/toolkit';

const authModalSlice = createSlice({
  name: 'authModal',
  initialState: { isOpen: false, isLogIn: false },
  reducers: {
    setIsOpen: (state, action) => {
      state.isOpen = action.payload;
    },
    setIsLogIn: (state, action) => {
      state.isLogIn = action.payload;
    },
  },
});

export const { setIsOpen, setIsLogIn } = authModalSlice.actions;
export default authModalSlice.reducer;

//select
export const selectIsOpen = state => state.authModal.isOpen;
export const selectIsLogIn = state => state.authModal.isLogIn;
