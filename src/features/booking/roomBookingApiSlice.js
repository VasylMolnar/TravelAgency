import { apiSlice } from '../../app/api/apiSlice';
import { createEntityAdapter, createSelector } from '@reduxjs/toolkit';

const bookingAdapter = createEntityAdapter({});
const initialState = bookingAdapter.getInitialState();

export const roomBooking = apiSlice.injectEndpoints({
  endpoints: builder => ({
    //booking room//Booking

    //User ID
    getBooking: builder.query({
      query: ({ userID }) => ({
        url: `/booking/${userID}`,
        method: 'GET',
      }),

      providesTags: (result, error, arg) => {
        return [
          ...result.map(item => {
            return { type: 'Booking', id: item.roomId };
          }),
        ];
      },
    }),

    //Hotel ID + Room ID
    //user and admin
    createBooking: builder.mutation({
      query: ({ hotelId, roomId, newValue }) => ({
        url: `/booking/${hotelId}/${roomId}`,
        method: 'POST',
        body: newValue,
      }),

      invalidatesTags: ['Booking'],
    }),

    //admin
    getAllBookingByRoom: builder.mutation({
      query: ({ hotelId, roomId }) => ({
        url: `/booking/${hotelId}/${roomId}`,
        method: 'GET',
      }),
    }),

    //Hotel ID + Room ID + Booking ID
    //user and  admin
    updateBooking: builder.mutation({
      query: ({ hotelId, roomId, bookingIdHotel, newValue }) => ({
        url: `/booking/${hotelId}/${roomId}/${bookingIdHotel}`,
        method: 'PUT',
        body: { newValue },
      }),

      invalidatesTags: (result, error, arg) => {
        return [{ type: 'Booking', id: arg.id }];
      },
    }),

    deleteBooking: builder.mutation({
      query: ({ hotelId, roomId, bookingIdHotel, userID, bookingIdUser }) => ({
        url: `/booking/${hotelId}/${roomId}/${bookingIdHotel}`,
        method: 'DELETE',
        body: { userID, bookingIdUser },
      }),

      invalidatesTags: (result, error, arg) => {
        return [{ type: 'Booking', id: arg.id }];
      },
    }),
  }),
});

export const {
  useGetAllBookingByRoomMutation,
  useGetBookingQuery,
  useCreateBookingMutation,
  useDeleteBookingMutation,
  useUpdateBookingMutation,
} = roomBooking;
