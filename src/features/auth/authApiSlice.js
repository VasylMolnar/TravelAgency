import { apiSlice } from '../../app/api/apiSlice';
import { authApiSlice } from './authApiSlice';

/*
    1: Auth (logIn)
    2: Register new User
    3: LogOut
*/

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    logIn: builder.mutation({
      query: credentials => ({
        url: '/auth',
        method: 'POST',
        body: { ...credentials },
      }),
    }),

    register: builder.mutation({
      query: credentials => ({
        url: '/register',
        method: 'POST',
        body: { ...credentials },
      }),
    }),

    logOut: builder.query({
      query: () => '/logout',
      method: 'GET',
    }),
  }),
});

export  { useLogInMutation } = authApiSlice.endpoints;
