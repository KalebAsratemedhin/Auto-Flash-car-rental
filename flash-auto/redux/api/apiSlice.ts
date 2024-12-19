import { createApi, fetchBaseQuery, FetchBaseQueryError, FetchArgs } from '@reduxjs/toolkit/query/react';

import { RootState } from '../store';

const baseQuery = fetchBaseQuery({
  baseUrl: `http://localhost:5000`,
  prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const accessToken = state.auth?.token;

      if (accessToken) {
          headers.set('authorization', `Bearer ${accessToken}`);
      }
      return headers;
  }
});
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: ['User', 'Car', 'Rent', 'Comment', 'Rating'],
  endpoints: () => ({}),
});
