import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import CitiesList from './components/CitiesList/CitiesList';
import InputsList from './components/CitiesSearch/InputsList/InputsList';
import TemperatureSlider from './components/CitiesSearch/TemperatureSlider/TemperatureSlider';

import getCitiesData from './utilities/getCitiesData';

import './App.css';
import { setAvailableCities } from './state/availableCitiesSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    getCitiesData().then((res) => {
      dispatch(setAvailableCities(res));
    });
  }, []);

  return (
    <div className="App">
      <InputsList />
        <h1>Дашборд</h1>
        <TemperatureSlider />
        <CitiesList />
    </div>
  );
}

export default App;
