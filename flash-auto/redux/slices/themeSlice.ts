import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

const initialState = {
  theme: 'light', 
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const themeSelector = (state: RootState) => state.theme
export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
