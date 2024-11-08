import { configureStore } from "@reduxjs/toolkit";
import { authAPI } from "./api/authAPI";
import { userAPI } from "./api/userAPI";
import authReducer from '@/redux/slices/authSlice'
import { postAPI } from "./api/postAPI";
import { rentAPI } from "./api/rentAPI";
import sidebarReducer from '@/redux/slices/sideBarSlice';
import { ratingAPI } from "./api/ratingAPI";
import { commentAPI } from "./api/commentAPI";
import themeReducer from './slices/themeSlice';

export const store = configureStore({
    reducer: {
        [authAPI.reducerPath]: authAPI.reducer,
        [userAPI.reducerPath]: userAPI.reducer,
        [postAPI.reducerPath]: postAPI.reducer,
        [rentAPI.reducerPath]: rentAPI.reducer,
        [ratingAPI.reducerPath]: ratingAPI.reducer,
        [commentAPI.reducerPath]: commentAPI.reducer,

        auth: authReducer,
        sidebar: sidebarReducer,
        theme: themeReducer
        
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
          .concat(authAPI.middleware)
          .concat(userAPI.middleware)
          .concat(postAPI.middleware)
          .concat(rentAPI.middleware)
          .concat(ratingAPI.middleware)
          .concat(commentAPI.middleware)
})

export type RootState = ReturnType<typeof store.getState>