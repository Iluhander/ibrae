import { createSlice } from "@reduxjs/toolkit";

export const citiesSlice = createSlice({
  name: 'cities',
  initialState: {
    list: undefined,
    temperatureMin: -Infinity
  },
  reducers: {
    setCities: (state, action) => {
      state.list = action.payload;
    },
    addCity: (state, action) => {
      if (!state.list) {
        state.list = [];
      }
      
      state.list.push(action.payload);
    },
    removeCity: (state, action) => {
      state.list.splice(action.payload, 1);
    },
    filterCities: (state, action) => {
      state.temperatureMin = action.payload
    }
  }
});

export const { setCities, addCity, removeCity, filterCities } = citiesSlice.actions;

export default citiesSlice.reducer;