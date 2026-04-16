import { createSlice } from '@reduxjs/toolkit';
import { loadState } from '../utils/localStorage';

const persisted = loadState('jobs');

const initialState = {
  jobs: Array.isArray(persisted?.jobs) ? persisted.jobs : [],
};

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    addJob(state, action) {
      state.jobs.unshift(action.payload);
    },
    updateJob(state, action) {
      const idx = state.jobs.findIndex((j) => j.id === action.payload.id);
      if (idx !== -1) state.jobs[idx] = action.payload;
    },
    deleteJob(state, action) {
      state.jobs = state.jobs.filter((j) => j.id !== action.payload);
    },
  },
});

export const { addJob, updateJob, deleteJob } = jobsSlice.actions;
export default jobsSlice.reducer;
