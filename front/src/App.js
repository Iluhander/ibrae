import React, { useEffect, useState } from 'react';
import store from './state/store';

import { Provider } from 'react-redux';
import CitiesList from './components/CitiesList/CitiesList';
import InputsList from './components/CitiesSearch/InputsList/InputsList';
import TemperatureSlider from './components/CitiesSearch/TemperatureSlider/TemperatureSlider';

import getCitiesData from './utilities/getCitiesData';

import './App.css';

function App() {
  const [citiesLoaded, setCitiesLoaded] = useState(false);

  useEffect(() => {
    getCitiesData().then((res) => {
      localStorage.setItem('cities', JSON.stringify(res));
      setCitiesLoaded(true);
    });
  }, []);

  let pageItems = [];
  if (citiesLoaded) {
    pageItems = (
      <Provider store={store}>
        <InputsList />
        <h1>Дашборд</h1>
        <TemperatureSlider />
        <CitiesList />
      </Provider>
    );
  }

  return (
    <div className="App">
      {pageItems}
    </div>
  );
}

export default App;
