import { apiSlice } from './apiSlice';
import {ApiResponse} from '../../types/ApiResponse';
import { User, AuthResponse, SignUpFormData, SignInFormData } from '../../types/user';


export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signin: builder.mutation<ApiResponse<AuthResponse>, SignInFormData>({
      query: (credentials) => ({
        url: '/auth/signin',
        method: 'POST',
        body: credentials,
      }),
    }),
    signup: builder.mutation<ApiResponse<AuthResponse>, SignUpFormData>({
      query: (userData) => ({
        url: '/auth/signup',
        method: 'POST',
        body: userData,
      }),
    }),
    googleSignin: builder.mutation({
      query: (tokenId) => ({
        url: '/auth/google',
        method: 'POST',
        body: { token: tokenId },
      }),
    }),
    verifyEmail: builder.mutation({
      query: (token) => ({
        url: `/auth/verify-email?token=${token}`,
        method: 'GET',
      }),
    }),
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body: { email },
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ token, newPassword }) => ({
        url: '/auth/reset-password',
        method: 'POST',
        body: { token, newPassword },
      }),
    }),
    changePassword: builder.mutation({
      query: (passwords) => ({
        url: '/auth/change-password',
        method: 'PUT',
        body: passwords,
      }),
    }),
    getCurrentUser: builder.query<ApiResponse<User>, void>({
      query: () => '/users/me',
      providesTags: ['User'],
    }),
  }),
});


export const {
  useSigninMutation,
  useSignupMutation,
  useGoogleSigninMutation,
  useVerifyEmailMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useGetCurrentUserQuery,
} = authApi;