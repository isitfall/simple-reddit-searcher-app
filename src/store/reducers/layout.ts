import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface LayoutSliceState {
  showResultsSection: boolean;
}

const initialState: LayoutSliceState = {
  showResultsSection: false,
};

export const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    enableShowResults: (state: LayoutSliceState) => {
      state.showResultsSection = true;
    },
    disableShowResults: (state: LayoutSliceState) => {
      state.showResultsSection = false;
    },
  },
});

export const { enableShowResults, disableShowResults } = layoutSlice.actions;

export const selectShowResultsSection = (state: RootState) =>
  state.layout.showResultsSection;

export default layoutSlice.reducer;
