import { createSlice } from "@reduxjs/toolkit";

const applicationsSlice = createSlice({
  name: "applications",
  initialState: { items: [], loading: false, error: "" },
  reducers: {
    setApplications: (state, action) => { state.items = action.payload; },
    setLoading: (state, action) => { state.loading = action.payload; },
    setError: (state, action) => { state.error = action.payload; },
    addApplication: (state, action) => { state.items.unshift(action.payload); },
    updateApplication: (state, action) => {
      const index = state.items.findIndex((application) => application.id === action.payload.id);
      if (index !== -1) state.items[index] = action.payload;
    },
    removeApplication: (state, action) => { state.items = state.items.filter((application) => application.id !== action.payload); },
    clearApplications: (state) => { state.items = []; state.error = ""; },
  },
});

export const { setApplications, setLoading, setError, addApplication, updateApplication, removeApplication, clearApplications } = applicationsSlice.actions;
export default applicationsSlice.reducer;
