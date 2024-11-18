import { createApi, fetchBaseQuery, FetchBaseQueryError, FetchArgs } from '@reduxjs/toolkit/query/react';
import { ApiResponse, ApiError } from '../../types/ApiResponse';
import { RootState } from '../store';

const baseQuery = fetchBaseQuery({
    baseUrl: `http://localhost:5000/users`,
    prepareHeaders: (headers, { getState }) => {
        const state = getState() as RootState;
        const accessToken = state.auth?.accessToken;


        if (accessToken) {
            headers.set('authorization', `Bearer ${accessToken}`);
        }
        return headers;
    }
});

// // Custom base query with type safety
// export const customBaseQuery = async <T>(
//     args: string | FetchArgs,
//     api: any,
//     extraOptions: any
// ): Promise<{ data: T } | { error: FetchBaseQueryError | ApiError }> => {
//     try {
//         const result = await baseQuery(args, api, extraOptions);

//         if (result.data && (result.data as ApiResponse<T>).success) {
//             return { data: (result.data as ApiResponse<T>).data! }; // Return the `data` field
//         }

//         return {
//             error: {
//                 status: result.error?.status|| 500,
//                 data: result.data || result.errors[0],
//             },
//         };
//     } catch (error) {
//         return {
//             error: {
//                 status: 'FETCH_ERROR',
//                 error: 'Fetch error',
//                 data: undefined
//             },
//         };
//     }
// };

// // Create the API slice
// // export const api = createApi({
// //     baseQuery: customBaseQuery,
// //     endpoints: (builder) => ({
// //         getExample: builder.query<ExampleData, void>({
// //             query: () => '/example',
// //         }),
// //     }),
// // });

// // export const { useGetExampleQuery } = api;



export const customBaseQuery = async <T>(
    args: string | FetchArgs,
    api: any,
    extraOptions: any
): Promise<{ data: T } | { error: FetchBaseQueryError | ApiError }> => {
    const result = await baseQuery(args, api, extraOptions);

    if (result.data) {
        // Backend returned a valid response
        const backendResponse = result.data as ApiResponse<T>;

        if (backendResponse.success) {
            return { data: backendResponse.data! };
        }

        // If success: false, return as `ApiError`
        return {
            error: {
                success: false,
                message: backendResponse.message,
                data: null,
                errors: backendResponse.errors || [],
            } as ApiError,
        };
    }

    if (result.error) {
        // Handle fetchBaseQuery errors (e.g., network errors)
        return {
            error: {
                status: result.error.status || 'FETCH_ERROR',
                data: result.error.data || undefined,
                error: result.error || 'An unexpected error occurred.',
            } as FetchBaseQueryError, // Explicitly cast to match expected structure
        };
    }

    // Fallback case for unexpected errors
    return {
        error: {
            status: 'CUSTOM_ERROR',
            data: undefined,
            error: 'An unknown error occurred.',
        } as FetchBaseQueryError,
    };
};
