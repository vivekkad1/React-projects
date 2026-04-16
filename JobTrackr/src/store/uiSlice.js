import { createSlice } from '@reduxjs/toolkit';
import { loadState } from '../utils/localStorage';

const persisted = loadState('ui');

const defaults = {
  darkMode: false,
  statusFilter: 'All',
  searchQuery: '',
};

const initialState = {
  ...defaults,
  ...(persisted || {}),
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
    },
    setStatusFilter(state, action) {
      state.statusFilter = action.payload;
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
  },
});

export const { toggleDarkMode, setStatusFilter, setSearchQuery } = uiSlice.actions;
export default uiSlice.reducer;
