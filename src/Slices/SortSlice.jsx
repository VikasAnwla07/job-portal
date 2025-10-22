import { createSlice } from "@reduxjs/toolkit";

const sortSlice = createSlice({
  name: "sort",
  initialState: {},
  reducers: {
    updateSort: (state, action) => {
      state = action.payload;
      return state;
    },
    resetSort: (state) => {
      return {};
    },
  },
});

export const { updateSort, resetSort } = sortSlice.actions;
export default sortSlice.reducer;
