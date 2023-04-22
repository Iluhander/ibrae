import React, { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { setCities } from '../../../state/citiesSlice';

import CityInput from './CityInput/CityInput';

import './InputsList.css';

const dataFetched = [];

// This function filters cities in O(n * log(n)) time.
const getUniqueValues = () => {
  const unique = new Map();
  for (let cityData of dataFetched) {
    if (cityData?.name) {
      unique.set(cityData.name, cityData);
    }
  }

  return Array.from(unique.values());
}

export default function InputsList() {
  const dispatch = useDispatch();

  const [inputsList, setInputsList] = useState([]);

  const updateList = () => {
    const unique = getUniqueValues();
    dispatch(setCities(unique));
  }

  function addInput() {
    const id = inputsList.length;
    const loadCallback = (cityData) => {
      dataFetched[id] = cityData;

      updateList();
    }

    dataFetched.push(undefined);
    setInputsList([
      ...inputsList,
      { id, loadCallback }
    ]);
  }

  useEffect(() => {
    // Initializing with one input.
    addInput();
  }, []);

  const inputsListElem = inputsList.map(({ id, loadCallback }) => {
    return <CityInput key={`city_input_${id}`} loadCallback={loadCallback} />;
  });

  return (
    <section className="cities-inputs">
      {inputsListElem}
      <button onClick={addInput}>+</button>
    </section>
  );
}
