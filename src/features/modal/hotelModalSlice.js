import { createSlice } from '@reduxjs/toolkit';

const hotelModalSlice = createSlice({
  name: 'hotelModal',
  initialState: { isOpenHotel: false, isOpenRoom: false },
  reducers: {
    setOpenHotel: (state, action) => {
      state.isOpenHotel = action.payload;
    },

    setOpenRoom: (state, action) => {
      state.isOpenRoom = action.payload;
    },
  },
});

export const { setOpenHotel, setOpenRoom } = hotelModalSlice.actions;
export default hotelModalSlice.reducer;

//select
export const selectIsOpenHotel = state => state.hotelModal.isOpenHotel;
export const selectIsOpenRoom = state => state.hotelModal.isOpenRoom;
