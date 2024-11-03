import { configureStore } from "@reduxjs/toolkit";
import { authAPI } from "./api/authAPI";
import { userAPI } from "./api/userAPI";
import authReducer from '@/redux/slices/authSlice'
import { postAPI } from "./api/postAPI";

export const store = configureStore({
    reducer: {
        [authAPI.reducerPath]: authAPI.reducer,
        [userAPI.reducerPath]: userAPI.reducer,
        [postAPI.reducerPath]: postAPI.reducer,
        auth: authReducer
        

    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
          .concat(authAPI.middleware)
          .concat(userAPI.middleware)
          .concat(postAPI.middleware)



})

export type RootState = ReturnType<typeof store.getState>