import { apiSlice } from './apiSlice';
import {ApiResponse} from '../../types/ApiResponse';
import { Car, Post } from '@/types/car';

export const carsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCars: builder.query({
      query: (params) => ({
        url: '/posts',
        params,
      }),
      providesTags: ['Car'],
    }),
    getCarById: builder.query({
      query: (id) => `/posts/${id}`,
      providesTags: ['Car'],
    }),
    createCar: builder.mutation<ApiResponse<Car>, FormData>({
      query: (carData) => {
        // const formData = new FormData();

        // // Append all text data
        // Object.keys(carData).forEach((key) => {
        //   if (key === 'photo' && carData[key]) {
        //     // Append the file (assuming it's an array of files)
        //     formData.append(key, carData[key][0]);
        //   } else {
        //     formData.append(key, carData[key]);
        //   }
        // });
        // console.log('in api', formData)

        // Return the request with the FormData as the body
        return {
          url: '/posts',
          method: 'POST',
          body: carData,

        };
        
      },
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