import { configureStore } from "@reduxjs/toolkit";
import citiesReducer from './citiesSlice';
import availableCitiesReducer from './availableCitiesSlice';

export default configureStore({
  reducer: {
    cities: citiesReducer,
    availableCities: availableCitiesReducer
  }
});
