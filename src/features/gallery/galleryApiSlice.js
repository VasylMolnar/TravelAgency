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
            userName: responseData.userName,
            userID: responseData.userID,
            currentImgID: imgData._id,
            reactions: imgData.reactions,
            title: imgData.title,
            data: `data:image/png;base64,${uint8ArrayToBase64(imgData.data.data)}`,
          };
        });

        return base64StringArray;
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
              title: imgData.title,
              data: `data:image/png;base64,${uint8ArrayToBase64(imgData.data.data)}`,
            };
          });

          return [...base64StringArray];
        });

        return [...newResponse];
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

    //delete User IMG by User ID + Current IMG ID
    deleteImg: builder.mutation({
      query: ({ userID, currentImgID }) => ({
        url: `/gallery/${userID}/${currentImgID}`,
        method: 'DELETE',
        body: { userID, currentImgID },
      }),

      invalidatesTags: (result, error, arg) => {
        return [{ type: 'Gallery', id: arg.id }];
      },
    }),

    updateImg: builder.mutation({
      query: ({ userID, currentImgID, newReactions }) => ({
        url: `/gallery/${userID}/${currentImgID}`,
        method: 'PUT',

        body: { userID, currentImgID, newReactions },
      }),

      invalidatesTags: (result, error, arg) => {
        return [{ type: 'Gallery', id: arg.id }];
      },
    }),
  }),
});

export const {
  useCreateImageMutation,
  useGetGalleryListQuery,
  useGetAllGalleryListQuery,
  useDeleteImgMutation,
  useUpdateImgMutation,
} = galleryApiSlice;
