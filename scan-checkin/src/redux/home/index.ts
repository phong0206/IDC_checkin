import { createSlice } from "@reduxjs/toolkit";
import { HomeState } from "../types";

const initialState: HomeState = {
  user: {},
};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const data = state;
      data.user = action.payload;
      return data;
    },
  },
});

export const { setUser } = homeSlice.actions;

export default homeSlice.reducer;
