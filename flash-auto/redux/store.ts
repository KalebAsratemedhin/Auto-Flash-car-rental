import { configureStore } from "@reduxjs/toolkit";
import { authAPI } from "./api/authAPI";
import { userAPI } from "./api/userAPI";
import authReducer from '@/redux/slices/authSlice'

export const store = configureStore({
    reducer: {
        [authAPI.reducerPath]: authAPI.reducer,
        [userAPI.reducerPath]: userAPI.reducer,
        auth: authReducer
        

    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
          .concat(authAPI.middleware)
          .concat(userAPI.middleware)


})

export type RootState = ReturnType<typeof store.getState>