import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notifications: [],
  isLoading: false,
  searchFilters: {
    location: '',
    startDate: null,
    endDate: null,
    priceRange: [0, 1000],
    carType: '',
    features: [],
  },
  sortOption: 'recommended',
  viewMode: 'grid',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    addNotification: (state, { payload }) => {
      state.notifications.push({
        id: Date.now(),
        ...payload,
      });
    },
    removeNotification: (state, { payload }) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== payload
      );
    },
    setLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    updateSearchFilters: (state, { payload }) => {
      state.searchFilters = {
        ...state.searchFilters,
        ...payload,
      };
    },
    resetSearchFilters: (state) => {
      state.searchFilters = initialState.searchFilters;
    },
    setSortOption: (state, { payload }) => {
      state.sortOption = payload;
    },
    setViewMode: (state, { payload }) => {
      state.viewMode = payload;
    },
  },
});

export const {
  addNotification,
  removeNotification,
  setLoading,
  updateSearchFilters,
  resetSearchFilters,
  setSortOption,
  setViewMode,
} = uiSlice.actions;

export default uiSlice.reducer;

// Selectors
export const selectNotifications = (state) => state.ui.notifications;
export const selectIsLoading = (state) => state.ui.isLoading;
export const selectSearchFilters = (state) => state.ui.searchFilters;
export const selectSortOption = (state) => state.ui.sortOption;
export const selectViewMode = (state) => state.ui.viewMode;
