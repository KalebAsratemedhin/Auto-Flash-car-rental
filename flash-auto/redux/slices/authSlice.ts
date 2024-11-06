import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";



const authSlice = createSlice({
    name: 'auth',
    initialState: {accessToken: '', fullName: ''},
    reducers: {
        setSession: (state, action) => {
            state.accessToken = action.payload
        },

        removeSession: (state) => {
            state.accessToken = ''  
        },
        setFullName: (state, action) => {
            state.fullName = action.payload
        }

    }

})

export const {setSession, removeSession, setFullName} = authSlice.actions
export const authSelector = (state: RootState) => state.auth
export default authSlice.reducer