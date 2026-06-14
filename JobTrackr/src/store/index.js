import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import jobsReducer from './jobsSlice';
import uiReducer from './uiSlice';
import { saveState } from '../utils/localStorage';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    jobs: jobsReducer,
    ui: uiReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();
  saveState('ui', state.ui);
});
