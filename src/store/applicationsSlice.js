import { createSlice } from "@reduxjs/toolkit";
import { starterApplications } from "../data/applications";

const applicationsSlice = createSlice({
  name: "applications",
  initialState: starterApplications,
  reducers: {
    addApplication: (state, action) => { state.unshift({ ...action.payload, id: crypto.randomUUID() }); },
    updateApplication: (state, action) => {
      const index = state.findIndex((application) => application.id === action.payload.id);
      if (index !== -1) state[index] = action.payload;
    },
    removeApplication: (state, action) => state.filter((application) => application.id !== action.payload),
  },
});

export const { addApplication, updateApplication, removeApplication } = applicationsSlice.actions;
export default applicationsSlice.reducer;
