import { apiSlice } from './apiSlice';
import { RentForm, Rent } from '@/types/rent';
import { ApiResponse } from '@/types/ApiResponse';


export const rentalsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRentals: builder.query<ApiResponse<Rent[]>, void>({                  
      query: () => `/rents/current-user`,
      providesTags: ['CurrentUserRent'],
    }),
    getRentalById: builder.query<ApiResponse<Rent>, string>({
      query: (id) => `/rents/${id}`,
      providesTags: ['Rent'],
    }),
    createRental: builder.mutation<ApiResponse<Rent>, {rentalData: RentForm, carId: string}> ({
      query: ({rentalData, carId}) => ({
        url: `/rents/cars/${carId}`,
        method: 'POST',
        body: rentalData,
      }),
      invalidatesTags: ['Rent', 'Car'],
    }),
    updateRental: builder.mutation<ApiResponse<Rent>, {id: string, rentalData: RentForm}>({
      query: ({ id, rentalData }) => ({
        url: `/rents/${id}`,
        method: 'PATCH',
        body: rentalData,
      }),
      invalidatesTags: ['Rent'],
    }),
    cancelRental: builder.mutation<ApiResponse<String>, string>({
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

export const {
  useGetRentalsQuery,
  useGetRentalByIdQuery,
  useCreateRentalMutation, 
  useUpdateRentalMutation,
  useCancelRentalMutation,
  useGetUserRentalsQuery,
  useGetOwnerRentalsQuery,
  useCompleteRentalMutation,
  useGetRentalHistoryQuery,
} = rentalsApi;
