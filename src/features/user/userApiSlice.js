import { apiSlice } from '../../app/api/apiSlice';

/*
    //Admin
    1. Get All Users 
    2. Get User by id

    //User
    3. Delete User by id
    4. Update User by id
*/

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUser: builder.query({
      query: ({ id }) => ({
        url: `/user${id}`,
        method: 'get',
        body: { id },
      }),
    }),

    getAllUsers: builder.query({
      query: () => ({
        url: `/user`,
        method: 'get',
        body: {},
      }),
    }),

    updateUser: builder.mutation({
      query: ({ id, ...credentials }) => ({
        url: `/user/${id}`,
        method: 'PUT',
        body: { ...credentials },
      }),
    }),

    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: `/user/${id}`,
        method: 'DELETE',
        body: { id },
      }),
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = userApiSlice;
