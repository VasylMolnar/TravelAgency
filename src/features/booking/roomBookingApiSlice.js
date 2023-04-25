import { apiSlice } from '../../app/api/apiSlice';

export const roomBooking = apiSlice.injectEndpoints({
  endpoints: builder => ({
    //booking room

    //Hotel ID
    //admin
    getAllBookingByHotel: builder.query({}),

    //Hotel ID + Room ID
    //user
    createBooking: builder.mutation({
      query: ({ hotelId, roomId, newValue }) => ({
        url: `/booking/${hotelId}/${roomId}`,
        method: 'POST',
        body: newValue,
      }),
    }),

    //admin
    getAllBookingByRoom: builder.query({}),

    //Hotel ID + Room ID + Booking ID
    //admin
    getBooking: builder.query({}),

    //user
    updateBooking: builder.mutation({}),

    deleteBooking: builder.mutation({}),
  }),
});

export const {
  useGetAllBookingByHotelQuery,
  useGetAllBookingByRoomQuery,
  useGetBookingQuery,
  useCreateBookingMutation,
  useDeleteBookingMutation,
  useUpdateBookingMutation,
} = roomBooking;
