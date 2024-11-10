import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User, UserSummary } from "../../types/User";
import { RootState } from "../store";
import { Rent, RentFormInput, RentPopulated } from "@/types/Rent";

export const rentAPI = createApi({
    reducerPath: 'rentApi',
    tagTypes: ['rent-list'],
    baseQuery: fetchBaseQuery({
        baseUrl: `http://localhost:5000/rents`,
        prepareHeaders: (headers, { getState }) => {
            const state = getState() as RootState;
            const accessToken = state.auth?.accessToken;
            
            if (accessToken) {
                headers.set('authorization', `Bearer ${accessToken}`);
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getUserRents: builder.query<UserSummary, string>({
            query: (userId) => ({
                url: `/${userId}`,
                method: 'GET'
            })
        }),
        createRent: builder.mutation<Rent, {rent: RentFormInput, carId: string}>({
            query: ({rent, carId}) => ({
                url: `/cars/${carId}`,
                method: 'Post',
                body: rent
            })
        }),
        getCurrentUserRents: builder.query<{data: RentPopulated[]}, void>({
            query: () => ({
                url: `/current-user`,
                method: 'GET'
            }),
            providesTags: ['rent-list']
        }),
        evaluateRent: builder.mutation<void, {update: {status: string}, rentId: string}>({
            query: ({update, rentId}) => ({
                url: `/${rentId}/evaluate`,
                method: 'PATCH',
                body: update
            })
        }),
        cancelRent: builder.mutation<void, string>({
            query: (rentId) => ({
                url: `/${rentId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['rent-list']
        })
    })
});

export const { 
    useGetUserRentsQuery,
    useCreateRentMutation,
    useGetCurrentUserRentsQuery,
    useEvaluateRentMutation,
    useCancelRentMutation
 } = rentAPI;
