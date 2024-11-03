import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";



const authSlice = createSlice({
    name: 'auth',
    initialState: {accessToken: ''},
    reducers: {
        setSession: (state, action) => {
            state.accessToken = action.payload
        },

        removeSession: (state) => {
            state.accessToken = ''  
        }

    }

})

export const {setSession, removeSession} = authSlice.actions
export const authSelector = (state: RootState) => state.auth
export default authSlice.reducer