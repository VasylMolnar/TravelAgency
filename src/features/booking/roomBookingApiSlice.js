import { apiSlice } from '../../app/api/apiSlice';
import { createEntityAdapter, createSelector } from '@reduxjs/toolkit';

const bookingAdapter = createEntityAdapter({});
const initialState = bookingAdapter.getInitialState();

export const roomBooking = apiSlice.injectEndpoints({
  endpoints: builder => ({
    //booking room

    //User ID
    getBooking: builder.mutation({
      query: ({ userID }) => ({
        url: `/booking/${userID}`,
        method: 'GET',
      }),
    }),

    //Hotel ID + Room ID
    //user and admin
    createBooking: builder.mutation({
      query: ({ hotelId, roomId, newValue }) => ({
        url: `/booking/${hotelId}/${roomId}`,
        method: 'POST',
        body: newValue,
      }),
    }),

    //admin
    getAllBookingByRoom: builder.mutation({
      query: ({ hotelId, roomId, newValue }) => ({
        url: `/booking/${hotelId}/${roomId}`,
        method: 'GET',
      }),
    }),

    //Hotel ID + Room ID + Booking ID
    //user and  admin
    updateBooking: builder.mutation({}),

    deleteBooking: builder.mutation({
      query: ({ hotelId, roomId, bookingId, userID, cardID }) => ({
        url: `/booking/${hotelId}/${roomId}/${bookingId}`,
        method: 'DELETE',
        body: { userID, cardID },
      }),
    }),
  }),
});

export const {
  useGetAllBookingByRoomMutation,
  useGetBookingMutation,
  useCreateBookingMutation,
  useDeleteBookingMutation,
  useUpdateBookingMutation,
} = roomBooking;
