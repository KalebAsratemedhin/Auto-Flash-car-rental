import { apiSlice } from './apiSlice';

export const carsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCars: builder.query({
      query: (params) => ({
        url: '/cars',
        params,
      }),
      providesTags: ['Car'],
    }),
    getCarById: builder.query({
      query: (id) => `/cars/${id}`,
      providesTags: ['Car'],
    }),
    createCar: builder.mutation({
      query: (carData) => ({
        url: '/cars',
        method: 'POST',
        body: carData,
      }),
      invalidatesTags: ['Car'],
    }),
    updateCar: builder.mutation({
      query: ({ id, ...carData }) => ({
        url: `/cars/${id}`,
        method: 'PUT',
        body: carData,
      }),
      invalidatesTags: ['Car'],
    }),
    deleteCar: builder.mutation({
      query: (id) => ({
        url: `/cars/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Car'],
    }),
    toggleFavorite: builder.mutation({
      query: (id) => ({
        url: `/cars/${id}/favorite`,
        method: 'POST',
      }),
      invalidatesTags: ['Car', 'User'],
    }),
    getFavorites: builder.query({
      query: () => '/cars/favorites',
      providesTags: ['Car'],
    }),
    searchCars: builder.query({
      query: (searchParams) => ({
        url: '/cars/search',
        params: searchParams,
      }),
      providesTags: ['Car'],
    }),
    getCarsByOwner: builder.query({
      query: (ownerId) => `/cars/owner/${ownerId}`,
      providesTags: ['Car'],
    }),
  }),
});
