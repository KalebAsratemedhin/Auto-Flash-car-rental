import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { AverageRating, CreatePost, Post, Rating } from "@/types/Post";

export const ratingAPI = createApi({
    reducerPath: 'ratingAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: `http://localhost:5000/ratings`,
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
        getUserRating: builder.query<{data: Rating}, string>({
            query: (carId) => ({
                url: `/cars/${carId}/users/current-user`,
                method: 'GET'
            })
        }),
        createRating: builder.mutation<{data: Rating}, {carId: string, score: number}>({
            query: ({carId, score}) => ({
                url: `/cars/${carId}`,
                method: 'Post',
                body: {score}
            })
        }),
        getAverageRating: builder.query<{data: AverageRating}, string>({
            query: (carId) => ({
                url: `/cars/${carId}`,
                method: 'GET'
            })
        })

    })
});

export const { 
    useGetAverageRatingQuery,
    useCreateRatingMutation,
    useGetUserRatingQuery
 } = ratingAPI;
