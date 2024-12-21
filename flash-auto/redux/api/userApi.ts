import { apiSlice } from './apiSlice';
import {ApiResponse} from '../../types/ApiResponse';
import { User, AuthResponse, SignUpFormData, SignInFormData, DashboardStat, UserAnalytics } from '../../types/user';

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    
    getUserSummary: builder.query<ApiResponse<DashboardStat[]>,  string>({
      query: (id) => `/users/summary/${id}`,
      providesTags: ['User'],
    }),
    getUserAnalytics: builder.query<ApiResponse<UserAnalytics>,  string>({
        query: (id) => `/users/analytics/${id}`,
        providesTags: ['User'],
      }),
  }), 
});

export const {
  useGetUserSummaryQuery,
  useGetUserAnalyticsQuery

} = userApi;