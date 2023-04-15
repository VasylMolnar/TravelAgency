import { apiSlice } from '../../app/api/apiSlice';
import { createEntityAdapter, createSelector } from '@reduxjs/toolkit';
/*
    //Admin
    1. Get All Users 
    2. Get User by id

    //User
    3. Delete User by id
    4. Update User by id
*/

const userAdapter = createEntityAdapter({});
const initialState = userAdapter.getInitialState();

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUser: builder.query({
      query: id => `/user/${id}`,

      providesTags: (result, error, arg) => {
        const id = result.id;
        return [{ type: 'Users', id }];
      },
    }),

    getAllUsers: builder.query({
      query: () => `/user`,

      transformResponse: responseData => {
        return userAdapter.setAll(initialState, responseData);
      },

      providesTags: (result, error, arg) => {
        return [...result.ids.map(id => ({ type: 'Users', id }))];
      },
    }),

    updateUser: builder.mutation({
      query: ({ id, ...credentials }) => ({
        url: `/user/${id}`,
        method: 'PUT',
        body: { ...credentials },
      }),

      invalidatesTags: (result, error, arg) => [{ type: 'Users', id: arg.id }],
    }),

    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: `/user/${id}`,
        method: 'DELETE',
        body: { id },
      }),

      invalidatesTags: (result, error, arg) => [{ type: 'Users', id: arg.id }],
    }),

    uploadImg: builder.mutation({
      query: ({ formData, id }) => ({
        url: `/user/${id}`,
        method: 'POST',
        body: formData,
      }),

      invalidatesTags: (result, error, arg) => [{ type: 'Users', id: arg.id }],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useUploadImgMutation,
  useGetIMGQuery,
} = userApiSlice;

// Creates memoized selector
const selectUsersData = createSelector(
  userApiSlice.endpoints.getAllUsers.select(),
  postsResult => {
    // console.log('postsResult', postsResult);
    return postsResult.data;
  }
);

// //selectors for Adapter
export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUsersIds,
} = userAdapter.getSelectors(state => selectUsersData(state) ?? initialState);
