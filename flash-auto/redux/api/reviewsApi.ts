import { apiSlice } from './apiSlice';

export const reviewsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Comments endpoints
    getCarComments: builder.query({
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

    // Ratings endpoints
    getCarRatings: builder.query({
      query: ({ carId, page = 1, limit = 10, sort = '-createdAt' }) => ({
        url: `/ratings/car/${carId}`,
        params: { page, limit, sort },
      }),
      providesTags: ['Rating'],
    }),
    createRating: builder.mutation({
      query: ({ carId, rating, review }) => ({
        url: `/ratings/car/${carId}`,
        method: 'POST',
        body: { rating, review },
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
