import { apiSlice } from '../../app/api/apiSlice';
import { uint8ArrayToBase64 } from '../../utils/uint8ArrayToBase64';

export const galleryApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    //create Img by User ID
    createImage: builder.mutation({
      query: ({ formData, userID }) => ({
        url: `/gallery/${userID}`,
        method: 'POST',
        body: formData,
      }),

      invalidatesTags: ['Gallery'],
    }),

    //get Gallery List by User ID
    getGalleryList: builder.query({
      query: ({ userID }) => ({
        url: `/gallery/${userID}`,
        method: 'GET',
      }),

      transformResponse: responseData => {
        const base64StringArray = responseData?.img?.map(imgData => {
          // return `data:image/png;base64,${uint8ArrayToBase64(imgData.data.data)}`;
          return {
            reactions: imgData.reactions,
            data: `data:image/png;base64,${uint8ArrayToBase64(imgData.data.data)}`,
          };
        });

        return { ...responseData, imagesUrl: base64StringArray };
      },

      providesTags: (result, error, arg) => {
        return [
          ...result?.img?.map(item => {
            const id = item._id;
            return { type: 'Gallery', id };
          }),
        ];
      },
    }),

    //get All Gallery List
    getAllGalleryList: builder.query({
      query: () => ({
        url: `/gallery`,
        method: 'GET',
      }),

      transformResponse: responseData => {
        const newResponse = responseData.map(item => {
          const base64StringArray = item?.img?.map(imgData => {
            return {
              userName: item.userName,
              userID: item.userID,
              currentImgID: imgData._id,
              reactions: imgData.reactions,
              data: `data:image/png;base64,${uint8ArrayToBase64(imgData.data.data)}`,
            };
          });

          return base64StringArray;
        });

        return newResponse;
      },

      providesTags: (result, error, arg) => {
        return [
          ...result?.map(item => {
            const id = item.currentImgID;
            return { type: 'Gallery', id };
          }),
        ];
      },
    }),
  }),
});

export const {
  useCreateImageMutation,
  useGetGalleryListQuery,
  useGetAllGalleryListQuery,
} = galleryApiSlice;
