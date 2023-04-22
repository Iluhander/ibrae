import { createSlice } from "@reduxjs/toolkit";

export const availableCitiesSlice = createSlice({
  name: 'availableCities',
  initialState: {
    list: [],
  },
  reducers: {
    setAvailableCities: (state, action) => {
      state.list = action.payload;
    }
  }
});

export const { setAvailableCities} = availableCitiesSlice.actions;

export default availableCitiesSlice.reducer;