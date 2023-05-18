import { apiSlice } from '../../app/api/apiSlice';

export const callCenterApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getAllMessage: builder.query({
      query: () => ({
        url: '/callCenter',
        method: 'GET',
      }),

      providesTags: ['CallCenter'],
    }),

    createMessage: builder.mutation({
      query: value => ({
        url: '/callCenter',
        method: 'POST',
        body: { ...value },
      }),

      invalidatesTags: ['CallCenter'],
    }),

    deleteMessage: builder.mutation({
      query: id => ({
        url: `/callCenter/${id}`,
        method: 'DELETE',
        body: id,
      }),

      invalidatesTags: ['CallCenter'],
    }),
  }),
});

export const {
  useGetAllMessageQuery,
  useCreateMessageMutation,
  useDeleteMessageMutation,
} = callCenterApiSlice;
