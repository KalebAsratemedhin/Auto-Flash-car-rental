import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../../types/User";
import { RootState } from "../store";

export const userAPI = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `http://localhost:5000/users`,
        prepareHeaders: (headers, { getState }) => {
            const state = getState() as RootState;
            const accessToken = state.auth?.accessToken;

            console.log("State auth:", state.auth);  // Debugging
            console.log("Access Token:", accessToken); // Ensure this shows the correct token

            if (accessToken) {
                headers.set('authorization', `Bearer ${accessToken}`);
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getCurrentUser: builder.query<User, void>({
            query: () => ({
                url: '/current-user',
                method: 'GET'
            })
        })
    })
});

export const { useGetCurrentUserQuery } = userAPI;
