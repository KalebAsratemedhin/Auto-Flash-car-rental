import { apiSlice } from './apiSlice';

export const rentalsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRentals: builder.query({
      query: (params) => ({
        url: '/rents',
        params,
      }),
      providesTags: ['Rent'],
    }),
    getRentalById: builder.query({
      query: (id) => `/rents/${id}`,
      providesTags: ['Rent'],
    }),
    createRental: builder.mutation({
      query: (rentalData) => ({
        url: '/rents',
        method: 'POST',
        body: rentalData,
      }),
      invalidatesTags: ['Rent', 'Car'],
    }),
    updateRental: builder.mutation({
      query: ({ id, ...rentalData }) => ({
        url: `/rents/${id}`,
        method: 'PUT',
        body: rentalData,
      }),
      invalidatesTags: ['Rent'],
    }),
    cancelRental: builder.mutation({
      query: (id) => ({
        url: `/rents/${id}/cancel`,
        method: 'PUT',
      }),
      invalidatesTags: ['Rent', 'Car'],
    }),
    getUserRentals: builder.query({
      query: (params) => ({
        url: '/rents/user',
        params,
      }),
      providesTags: ['Rent'],
    }),
    getOwnerRentals: builder.query({
      query: (params) => ({
        url: '/rents/owner',
        params,
      }),
      providesTags: ['Rent'],
    }),
    completeRental: builder.mutation({
      query: (id) => ({
        url: `/rents/${id}/complete`,
        method: 'PUT',
      }),
      invalidatesTags: ['Rent', 'Car'],
    }),
    getRentalHistory: builder.query({
      query: () => '/rents/history',
      providesTags: ['Rent'],
    }),
  }),
});
