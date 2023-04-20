import { apiSlice } from '../../app/api/apiSlice';
import { createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { uint8ArrayToBase64 } from '../../utils/uint8ArrayToBase64';

const hotelAdapter = createEntityAdapter({});
const initialState = hotelAdapter.getInitialState();

export const hotelApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getHotel: builder.mutation({
      query: id => ({
        url: `/hotel/${id}`,
        method: 'GET',
      }),
    }),

    //User and Admin
    getAllHotels: builder.query({
      query: () => `/hotel`,

      transformResponse: responseData => {
        const newResponse = responseData.map(item => {
          if (item?.img.length !== 0) {
            const base64StringArray = item.img.map(imgData => {
              return `data:image/png;base64,${uint8ArrayToBase64(imgData.data.data)}`;
            });
            // console.log('', base64StringArray);
            // Return data Array of URL
            return { ...item, imagesUrl: base64StringArray };
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

    updateHotel: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/hotel/${id}`,
        method: 'PUT',
        body: formData,
      }),

      providesTags: (result, error, arg) => [{ type: 'Hotels', id: arg.id }],
    }),

    createHotel: builder.mutation({
      query: ({ formData }) => ({
        url: `/hotel`,
        method: 'POST',
        body: formData,
      }),

      invalidatesTags: ['Hotels'],
    }),
  }),
});

export const {
  useGetAllHotelsQuery,
  useGetHotelMutation,
  useDeleteHotelMutation,
  useCreateHotelMutation,
  useUpdateHotelMutation,
} = hotelApiSlice;

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
