import { apiSlice } from '../../app/api/apiSlice';
import { createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { uint8ArrayToBase64 } from '../../utils/uint8ArrayToBase64';

const hotelAdapter = createEntityAdapter({});
const initialState = hotelAdapter.getInitialState();

export const hotelApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    //User
    getAllHotels: builder.query({
      query: () => `/hotel`,

      transformResponse: responseData => {
        const newResponse = responseData.map(item => {
          if (item?.img?.data) {
            const base64String = uint8ArrayToBase64(item.img.data.data);

            // Return data URL
            return { ...item, imageUrl: `data:image/png;base64,${base64String}` };
          }

          return item;
        });

        return hotelAdapter.setAll(initialState, newResponse);
      },

      providesTags: (result, error, arg) => {
        return [...result.ids.map(id => ({ type: 'Hotels', id }))];
      },
    }),

    //Admin
    deleteHotel: builder.mutation({
      query: ({ id }) => ({
        url: `/hotel/${id}`,
        method: 'DELETE',
        body: { id },
      }),

      invalidatesTags: (result, error, arg) => {
        return [{ type: 'Hotels', id: arg.id }];
      },
    }),
  }),
});

export const { useGetAllHotelsQuery, useDeleteHotelMutation } = hotelApiSlice;

// Creates memoized selector
const selectHotelsData = createSelector(
  hotelApiSlice.endpoints.getAllHotels.select(),
  postsResult => {
    return postsResult.data;
  }
);

//selectors for Adapter
export const {
  selectAll: selectAllHotels,
  selectById: selectHotelById,
  selectIds: selectHotelsIds,
} = hotelAdapter.getSelectors(state => selectHotelsData(state) ?? initialState);
