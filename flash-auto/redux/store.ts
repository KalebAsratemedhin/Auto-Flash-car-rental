import { configureStore } from "@reduxjs/toolkit";
import { authAPI } from "./api/authAPI";

export const store = configureStore({
    reducer: {
        [authAPI.reducerPath]: authAPI.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
          .concat(authAPI.middleware)


})

export type RootState = ReturnType<typeof store.getState>