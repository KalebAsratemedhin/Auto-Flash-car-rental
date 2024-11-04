import { configureStore } from "@reduxjs/toolkit";
import { authAPI } from "./api/authAPI";
import { userAPI } from "./api/userAPI";
import authReducer from '@/redux/slices/authSlice'
import { postAPI } from "./api/postAPI";
import { rentAPI } from "./api/rentAPI";
import sidebarReducer from '@/redux/slices/sideBarSlice';

export const store = configureStore({
    reducer: {
        [authAPI.reducerPath]: authAPI.reducer,
        [userAPI.reducerPath]: userAPI.reducer,
        [postAPI.reducerPath]: postAPI.reducer,
        [rentAPI.reducerPath]: rentAPI.reducer,
        auth: authReducer,
        sidebar: sidebarReducer

        
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
          .concat(authAPI.middleware)
          .concat(userAPI.middleware)
          .concat(postAPI.middleware)
          .concat(rentAPI.middleware)





})

export type RootState = ReturnType<typeof store.getState>