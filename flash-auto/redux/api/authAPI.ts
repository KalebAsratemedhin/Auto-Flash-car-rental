import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AuthResponse, SignupCredential } from "../../types/User";

export const authAPI = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `http://localhost:5000/auth`,
    }),
    endpoints: (builder) => ({
        signup: builder.mutation<AuthResponse, SignupCredential >({
            query: (credential) => ({
                url: '/signup',
                method: 'Post',
                body: credential,
                
            })
        })
        
    })
})

export const {
    useSignupMutation
} = authAPI