import { createSlice } from "@reduxjs/toolkit";

const initialState = { activeTab: 0 };

const ui = createSlice({
  name: "ui",
  initialState,
  reducers: {
    changeActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
  },
});

export const selectActiveTab = (state) => state.ui.activeTab;

export const { changeActiveTab } = ui.actions;
export default ui.reducer;
