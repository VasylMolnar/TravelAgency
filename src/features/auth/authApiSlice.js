import { apiSlice } from '../../app/api/apiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    register: builder.mutation({
      query: credentials => ({
        url: '/register',
        method: 'POST',
        body: { ...credentials },
      }),
    }),

    login: builder.mutation({
      query: credentials => ({
        url: '/auth',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
  }),
});

//functions
export const { useRegisterMutation, useLoginMutation } = authApiSlice;
