import { createSlice } from "@reduxjs/toolkit";

type SearchSliceState = {
  val: string;
};

const initialState: SearchSliceState = {
  val: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setVal(state, action) {
      state.val = action.payload;
    },
  },
});

export const { setVal } = searchSlice.actions;

export default searchSlice.reducer;
