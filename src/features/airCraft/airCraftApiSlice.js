import { apiSlice } from '../../app/api/apiSlice';
import { uint8ArrayToBase64 } from '../../utils/uint8ArrayToBase64';

export const airCraftApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    //fetch data by AirLine ID

    //User and Admin
    //airLineId + airCraftId
    getAirCraft: builder.mutation({
      query: ({ airLineId, airCraftId }) => ({
        url: `/aircraft/${airLineId}/${airCraftId}`,
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

    //airLineId
    getAllAirCraft: builder.query({
      query: ({ id }) => ({
        url: `/aircraft/${id}`,
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
            return { type: 'AirCraft', id };
          }),
        ];
      },
    }),

    //Admin
    //airLineId
    createAirCraft: builder.mutation({
      query: ({ airLineId, formData }) => ({
        url: `/aircraft/${airLineId}`,
        method: 'POST',
        body: formData,
      }),

      invalidatesTags: ['AirCraft'],
    }),

    //airLineId + airCraftId
    deleteAirCraft: builder.mutation({
      query: ({ airLineId, airCraftId }) => ({
        url: `/aircraft/${airLineId}/${airCraftId}`,
        method: 'DELETE',
        body: { airLineId, airCraftId },
      }),

      invalidatesTags: (result, error, arg) => {
        return [{ type: 'AirCraft', id: arg.id }];
      },
    }),

    //airLineId + airCraftId
    updateAirCraft: builder.mutation({
      query: ({ airLineId, airCraftId, formData }) => ({
        url: `/aircraft/${airLineId}/${airCraftId}`,
        method: 'PUT',
        body: formData,
      }),

      invalidatesTags: (result, error, arg) => {
        return [{ type: 'AirCraft', id: arg.id }];
      },
    }),
  }),
});

export const {
  useGetAirCraftMutation,
  useGetAllAirCraftQuery,
  useCreateAirCraftMutation,
  useDeleteAirCraftMutation,
  useUpdateAirCraftMutation,
} = airCraftApiSlice;
