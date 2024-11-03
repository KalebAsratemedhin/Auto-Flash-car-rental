import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User, UserSummary } from "../../types/User";
import { RootState } from "../store";

export const rentAPI = createApi({
    reducerPath: 'rentApi',
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
        })
    })
});

export const { useGetUserRentsQuery } = rentAPI;
