import { apiSlice } from './apiSlice';
import { ApiResponse } from '@/types/ApiResponse';

export const reviewsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query({
      query: ({ carId, page = 1, limit = 10 }) => ({
        url: `/comments/car/${carId}`,
        params: { page, limit },
      }),
      providesTags: ['Comment'],
    }),
    createComment: builder.mutation({
      query: ({ carId, content }) => ({
        url: `/comments/car/${carId}`,
        method: 'POST',
        body: { content },
      }),
      invalidatesTags: ['Comment'],
    }),
    updateComment: builder.mutation({
      query: ({ commentId, content }) => ({
        url: `/comments/${commentId}`,
        method: 'PUT',
        body: { content },
      }),
      invalidatesTags: ['Comment'],
    }),
    deleteComment: builder.mutation({
      query: (commentId) => ({
        url: `/comments/${commentId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Comment'],
    }),

    getOneRating: builder.query<ApiResponse<{score: number}>, string>({
      query: (carId) => ({
        url: `/ratings/cars/${carId}/current-user`,
      }),
      providesTags: ['Rating'],
    }),
    createRating: builder.mutation<ApiResponse<{score: number}>, {carId: string, score: number}>({
      query: ({ carId, score}) => ({
        url: `/ratings/cars/${carId}`,
        method: 'POST',
        body: {score},
      }),
      invalidatesTags: ['Rating', 'Car'],
    }),
    updateRating: builder.mutation({
      query: ({ ratingId, rating, review }) => ({
        url: `/ratings/${ratingId}`,
        method: 'PUT',
        body: { rating, review },
      }),
      invalidatesTags: ['Rating', 'Car'],
    }),
    deleteRating: builder.mutation({
      query: (ratingId) => ({
        url: `/ratings/${ratingId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Rating', 'Car'],
    }),
    markRatingHelpful: builder.mutation({
      query: (ratingId) => ({
        url: `/ratings/${ratingId}/helpful`,
        method: 'POST',
      }),
      invalidatesTags: ['Rating'],
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useCreateCommentMutation,
  useCreateRatingMutation,
  useGetOneRatingQuery,
} = reviewsApi;
