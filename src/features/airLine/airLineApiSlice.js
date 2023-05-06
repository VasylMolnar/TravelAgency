import { apiSlice } from '../../app/api/apiSlice';
import { createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { uint8ArrayToBase64 } from '../../utils/uint8ArrayToBase64';

const airLineAdapter = createEntityAdapter({});
const initialState = airLineAdapter.getInitialState();

export const airLineApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    //User and Admin
    getAirLine: builder.mutation({
      query: id => ({
        url: `/airline/${id}`,
        method: 'GET',
      }),
    }),

    getAllAirLines: builder.query({
      query: () => `/airline`,

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

        return airLineAdapter.setAll(initialState, newResponse);
      },

      providesTags: (result, error, arg) => {
        return [...result.ids.map(id => ({ type: 'AirLine', id }))];
      },
    }),

    //Admin
    createAirLine: builder.mutation({
      query: ({ formData }) => ({
        url: `/airline`,
        method: 'POST',
        body: formData,
      }),

      invalidatesTags: ['AirLine'],
    }),

    deleteAirLine: builder.mutation({
      query: ({ id }) => ({
        url: `/airline/${id}`,
        method: 'DELETE',
        body: { id },
      }),

      invalidatesTags: (result, error, arg) => {
        return [{ type: 'AirLine', id: arg.id }];
      },
    }),

    updateAirLine: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/airline/${id}`,
        method: 'PUT',
        body: formData,
      }),

      invalidatesTags: (result, error, arg) => {
        return [{ type: 'AirLine', id: arg.id }];
      },
    }),
  }),
});

export const {
  useCreateAirLineMutation,
  useDeleteAirLineMutation,
  useUpdateAirLineMutation,
  useGetAirLineMutation,
  useGetAllAirLinesQuery,
} = airLineApiSlice;

// Creates memoized selector
const selectAirLinesData = createSelector(
  airLineApiSlice.endpoints.getAllAirLines.select(),
  postsResult => {
    return postsResult.data;
  }
);

//selectors for Adapter
export const {
  selectAll: selectAllAirLines,
  selectById: selectAirLineById,
  selectIds: selectAirLinesIds,
} = airLineAdapter.getSelectors(state => selectAirLinesData(state) ?? initialState);
