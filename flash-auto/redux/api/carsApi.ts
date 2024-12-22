import { apiSlice } from './apiSlice';
import {ApiResponse} from '../../types/ApiResponse';
import { Car, Post } from '@/types/car';

export const carsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCars: builder.query<ApiResponse<{cars: Car[], totalPages: number, currentPage: number}>, { page?: number; limit?: number; filter?: string }>({
      query: ({ page = 1, limit = 10, filter }) => ({
        url: '/posts', 
        params: {
          page,
          limit,
          filter,  
        },
      }),
      providesTags: ['Car'],
    }),
    
    getCarById: builder.query({
      query: (id) => `/posts/${id}`,
      providesTags: ['Car'],
    }),
    createCar: builder.mutation<ApiResponse<Car>, FormData>({
      query: (carData) => ({
        url: '/posts',
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


export const {
  useGetCarsQuery,
  useGetCarByIdQuery,
  useCreateCarMutation,
  useUpdateCarMutation,
  useDeleteCarMutation,
  useToggleFavoriteMutation,
  useGetFavoritesQuery,
  useSearchCarsQuery,
  useGetCarsByOwnerQuery,
} = carsApi;