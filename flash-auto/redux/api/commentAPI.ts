import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { Comment, PopulatedComment } from "@/types/Post";

export const commentAPI = createApi({
    reducerPath: 'commentAPI',
    tagTypes: ['car-comments', 'user-comment'],
    baseQuery: fetchBaseQuery({
        baseUrl: `http://localhost:5000/comments`,
        prepareHeaders: (headers, { getState }) => {
            const state = getState() as RootState;
            const accessToken = state.auth?.accessToken;


            if (accessToken) {
                headers.set('authorization', `Bearer ${accessToken}`);
            }
            return headers;
        },
        
    }),
    endpoints: (builder) => ({
        getUserComment: builder.query<{data: Comment}, string>({
            query: (carId) => ({
                url: `/cars/${carId}/users/current-user`,
                method: 'GET'
            }),
            providesTags: ['user-comment']
        }),
        getCommentsByCar: builder.query<{data: PopulatedComment[]}, string>({
            query: (carId) => ({
                url: `/cars/${carId}`,
                method: 'GET'
            }),
            providesTags: ['car-comments']

        }),
        createComment: builder.mutation<{data: Comment}, {content: string, carId: string}>({
            query: (post) => ({
                url: '/',
                method: 'Post',
                body: post
            }),
            invalidatesTags: ['car-comments']
            
        }),
        updateComment: builder.mutation<{data: Comment}, {content: string, commentId: string}>({
            query: ({content, commentId}) => ({
                url: `/${commentId}`,
                method: 'Put',
                body: {content}
            }),
            invalidatesTags: ['car-comments']

        }),
        deleteComment: builder.mutation<{data: Comment}, string>({
            query: (commentId) => ({
                url: `/${commentId}`,
                method: 'Delete'
            }),
            invalidatesTags: ['car-comments']

        }),

    })
});

export const { 
    useGetCommentsByCarQuery,
    useCreateCommentMutation,
    useUpdateCommentMutation,
    useDeleteCommentMutation,
    useGetUserCommentQuery
 } = commentAPI;
