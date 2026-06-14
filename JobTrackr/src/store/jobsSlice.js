import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  jobs: [],
};

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setJobs(state, action) {
      state.jobs = action.payload;
    },
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
    clearJobs(state) {
      state.jobs = [];
    },
  },
});

export const { setJobs, addJob, updateJob, deleteJob, clearJobs } = jobsSlice.actions;
export default jobsSlice.reducer;
