import { apiSlice } from '../../app/api/apiSlice';
import { createEntityAdapter, createSelector } from '@reduxjs/toolkit';

export const airCraftBookingApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    //booking room//Booking

    //Hotel ID + Room ID
    //user and admin
    createPlaneBooking: builder.mutation({
      query: ({ airLineId, airCraftId, newValue }) => ({
        url: `/planeBooking/${airLineId}/${airCraftId}`,
        method: 'POST',
        body: newValue,
      }),

      invalidatesTags: ['Booking'],
    }),

    //admin
    getAllBookingByAirCraft: builder.mutation({
      query: ({ airLineId, airCraftId }) => ({
        url: `/planeBooking/${airLineId}/${airCraftId}`,
        method: 'GET',
      }),
    }),

    //Hotel ID + Room ID + Booking ID
    //user and  admin
    updateBookingPlane: builder.mutation({
      query: ({ airLineId, airCraftId, bookingIdAirLine, newValue }) => ({
        url: `/planeBooking/${airLineId}/${airCraftId}/${bookingIdAirLine}`,
        method: 'PUT',
        body: { newValue },
      }),

      invalidatesTags: ['Booking'],
    }),

    deleteBookingPlane: builder.mutation({
      query: ({ airLineId, airCraftId, bookingIdAirLine, userID, bookingIdUser }) => ({
        url: `/planeBooking/${airLineId}/${airCraftId}/${bookingIdAirLine}`,
        method: 'DELETE',
        body: { userID, bookingIdUser },
      }),

      invalidatesTags: ['Booking'],
    }),
  }),
});

export const {
  useGetAllBookingByAirCraftMutation,
  useCreatePlaneBookingMutation,
  useDeleteBookingPlaneMutation,
  useUpdateBookingPlaneMutation,
} = airCraftBookingApiSlice;
