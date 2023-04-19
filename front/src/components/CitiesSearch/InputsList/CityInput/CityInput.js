import React, { useState, useRef, useEffect } from 'react';

import { fetchCityData } from './utilities/fetchCityData';

import './CityInput.css';

// This is needed to prevent way too much requests.
let addingTimer;

export default function CityInput({ loadCallback }) {
  // The initial list of cities we've fetched.
  const inputElem = useRef(null);
  const variantsContainer = useRef(null);

  // List of cities, which match current input value.
  const [availableCities, setAvailableCities] = useState([]);
  const [cities] = useState(JSON.parse(localStorage.cities));

  const hideAvailableCities = () => {
    setAvailableCities([]);
  }

  const updateAvailableCities = () => {
    setAvailableCities(cities);
  }

  const fillInput = (e) => {
    inputElem.current.value = e.target.innerText;

    // Adding an input.
    clearTimeout(addingTimer);
    addingTimer = setTimeout(() => {
      fetchCityData(inputElem.current.value, cities).then((res) => {
        loadCallback(res);
      })
    }, 300);
  }

  const onInputChange = (e) => {
    const newAvailable = [];
    for (let i = 0; i < cities.length; ++i) {
      const targetName = e.target.value.replace(/\s/g, '').toLowerCase();
      const cityName = cities[i].name.toLowerCase()

      if (cityName.startsWith(targetName)) {
        newAvailable.push(cities[i]);
      }
    }

    setAvailableCities(newAvailable);
  }

  // Creating array of matching cities.
  let availableCitiesElem = [];
  for (let i = 0; i < availableCities.length; i += 1) {
    availableCitiesElem.push(
      <p key={`a_cities${i}`}>{availableCities[i].name}</p>
    );
  }

  useEffect(() => {
    // Click outside handler.
    document.addEventListener('mousedown', (e) => {
      setTimeout(() => {
        if (e.target === inputElem.current) {
          return;
        }

        if (e.target.parentElement === variantsContainer.current) {
          fillInput(e);
        }

        hideAvailableCities();
      }, 0);
    });
  }, []);
  
  return (
    <div className="city-name">
      <input
        ref={inputElem} 
        onClick={updateAvailableCities}
        onChange={onInputChange}
      />
      <div ref={variantsContainer} className="city-name_variants">
        {availableCitiesElem}
      </div>
    </div>
  );
}
