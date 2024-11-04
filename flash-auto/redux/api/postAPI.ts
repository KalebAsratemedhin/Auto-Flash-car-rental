import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { CreatePost, Post } from "@/types/Post";

export const postAPI = createApi({
    reducerPath: 'postApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `http://localhost:5000/posts`,
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
        getCurrentUserPosts: builder.query<Post[], void>({
            query: () => ({
                url: '/current-user',
                method: 'GET'
            })
        }),
        createPost: builder.mutation<Post, any>({
            query: (post) => ({
                url: '/',
                method: 'Post',
                body: post
            })
        }),
        getUserPosts: builder.query<{data: Post[]}, string>({
            query: (userId) => ({
                url: `?owner=${userId}`,
                method: 'GET'
            })
        }),
        getAllPosts: builder.query<{data: Post[], totalPages: number, currentPage: number}, {page: number, limit: number, filter: string}>({
            query: ({ page = 1, limit = 10, filter='all' }) => ({
                url: `/all?page=${page}&limit=${limit}&filter=${filter}`,
                method: 'Get'
            })
        }),

    })
});

export const { 
    useGetUserPostsQuery,
    useCreatePostMutation,
    useGetAllPostsQuery
 } = postAPI;
