import { apiSlice } from '../../app/api/apiSlice';
import { uint8ArrayToBase64 } from '../../utils/uint8ArrayToBase64';

export const roomApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    //fetch data by Hotel ID

    //User and Admin
    //hotelID + RoomID
    getRoom: builder.mutation({
      query: ({ hotelId, roomId }) => ({
        url: `/room/${hotelId}/${roomId}`,
        method: 'GET',
      }),

      transformResponse: responseData => {
        // console.log('responseData', responseData);
        const base64StringArray = responseData?.img?.map(imgData => {
          return `data:image/png;base64,${uint8ArrayToBase64(imgData.data.data)}`;
        });
        // console.log('', base64StringArray);
        // Return data Array of URL

        return { ...responseData, imagesUrl: base64StringArray };
      },
    }),

    //hotelID
    getAllRooms: builder.query({
      query: ({ id }) => ({
        url: `/room/${id}`,
        method: 'GET',
      }),

      transformResponse: responseData => {
        // console.log('getAllRoomsByHotelId', responseData);
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

        return newResponse;
      },

      providesTags: (result, error, arg) => {
        return [
          ...result.map(item => {
            const id = item.id;
            return { type: 'Rooms', id };
          }),
        ];
      },
    }),

    //Admin
    //hotelID
    createRoom: builder.mutation({
      query: ({ hotelId, formData }) => ({
        url: `/room/${hotelId}`,
        method: 'POST',
        body: formData,
      }),

      invalidatesTags: ['Rooms'],
    }),

    //hotelID + RoomID
    deleteRoom: builder.mutation({
      query: ({ hotelId, roomId }) => ({
        url: `/room/${hotelId}/${roomId}`,
        method: 'DELETE',
        body: { hotelId, roomId },
      }),

      invalidatesTags: (result, error, arg) => {
        return [{ type: 'Rooms', id: arg.id }];
      },
    }),

    //hotelID + RoomID
    updateRoom: builder.mutation({
      query: ({ hotelId, roomId, formData }) => ({
        url: `/room/${hotelId}/${roomId}`,
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
  useCreateRoomMutation,
  useDeleteRoomMutation,
  useUpdateRoomMutation,
  useGetAllRoomsQuery,
} = roomApiSlice;
