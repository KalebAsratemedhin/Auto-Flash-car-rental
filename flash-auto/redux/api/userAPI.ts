import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User, UserSummary } from "../../types/User";
import { RootState } from "../store";
import { ApiResponse } from "@/types/ApiResponse";

export const userAPI = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `http://localhost:5000/users`,
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
        getCurrentUser: builder.query<{data: User}, void>({
            query: () => ({
                url: '/current-user',
                method: 'GET'
            })
        }),
        getUserById: builder.query<{data: User}, string>({
            query: (userId) => ({
                url: `/${userId}`,
                method: 'GET'
            })
        }),
        getUserSummary: builder.query<ApiResponse<UserSummary>, string>({
            query: (userId) => ({
                url: `/summary/${userId}`,
                method: 'GET'
            })
        })
    })
});

export const { 
    useGetCurrentUserQuery,
    useGetUserSummaryQuery,
    useGetUserByIdQuery

 } = userAPI;
