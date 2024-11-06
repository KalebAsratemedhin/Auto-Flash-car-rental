import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";



const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState: {isOpen: false},
    reducers: {
        toggle: (state) => {
            state.isOpen = !state.isOpen
        },
        closeSidebar: (state) => {
            state.isOpen = false
        }

    }

})

export const {toggle, closeSidebar} = sidebarSlice.actions
export const sidebarSelector = (state: RootState) => state.sidebar
export default sidebarSlice.reducer