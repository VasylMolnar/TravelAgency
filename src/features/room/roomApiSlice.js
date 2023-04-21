import { apiSlice } from '../../app/api/apiSlice';
import { createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { uint8ArrayToBase64 } from '../../utils/uint8ArrayToBase64';

const roomAdapter = createEntityAdapter({});
const initialState = roomAdapter.getInitialState();

export const roomApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    /////////////id getRoom,getAllRooms,createRoom,deleteRoom,updateRoom,

    //User and Admin
    getRoom: builder.mutation({
      query: id => ({
        url: `/room/${id}`,
        method: 'GET',
      }),
    }),

    getAllRooms: builder.query({
      query: ({ id }) => ({
        url: `/room/${id}`,
        method: 'GET',
      }),

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

        return roomAdapter.setAll(initialState, newResponse);
      },

      providesTags: (result, error, arg) => {
        return [...result.ids.map(id => ({ type: 'Rooms', id }))];
      },
    }),

    //Admin
    createRoom: builder.mutation({
      query: ({ hotelId, formData }) => ({
        url: `/room/${hotelId}`,
        method: 'POST',
        body: formData,
      }),

      invalidatesTags: ['Rooms'],
    }),

    deleteRoom: builder.mutation({
      query: ({ id }) => ({
        url: `/room/${id}`,
        method: 'DELETE',
        body: { id },
      }),

      invalidatesTags: (result, error, arg) => {
        return [{ type: 'Rooms', id: arg.id }];
      },
    }),

    updateRoom: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/room/${id}`,
        method: 'PUT',
        body: formData,
      }),

      invalidatesTags: (result, error, arg) => {
        return [{ type: 'Rooms', id: arg.id }];
      },
    }),
  }),
});

export const {
  useGetRoomMutation,
  useGetAllRoomsQuery,
  useCreateRoomMutation,
  useDeleteRoomMutation,
  useUpdateRoomMutation,
} = roomApiSlice;

// Creates memoized selector
const selectRoomsData = createSelector(
  roomApiSlice.endpoints.getAllRooms.select(),
  postsResult => {
    return postsResult.data;
  }
);

//selectors for Adapter
export const {
  selectAll: selectAllRooms,
  selectById: selectRoomById,
  selectIds: selectRoomsIds,
} = roomAdapter.getSelectors(state => selectRoomsData(state) ?? initialState);
