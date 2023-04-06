import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logOut, setCredentials } from '../../features/auth/authSlice';

/*fetch data:
    1: add AccessToken to headers and fetch data (req)
    2: if error 403 we send req Refresh token (res) => (req)
        2.1: if we have Access token form (req Refresh token) we save token and fetch data (res) => (req to data)
        2.2: if we don't have Access token we dispatch LogOut (res)
*/

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:1234',
  //credentials: 'include', //fetch should send cookies and HTTP authorization headers (ACCESS TOKEN) with the req.
  //1
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken; //or we can use useSelector
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  //2
  if (result?.error?.originalStatus === 403) {
    //console.log('sending refresh token');
    // send refresh token to get new access token

    const refreshToken = await baseQuery('/refresh', api, extraOptions);
    //console.log(refreshToken);

    if (refreshToken?.data) {
      //2.1
      // store the new token
      const userData = api.getState().auth;

      api.dispatch(
        setCredentials({ ...userData, refreshToken: refreshToken.data })
      );

      // retry the original query with new access token
      return await baseQuery(args, api, extraOptions);
    } else {
      //2.2
      api.dispatch(logOut());
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({}),
});
