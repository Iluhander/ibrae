import React from 'react';

import { useDispatch } from 'react-redux';

import './CityCard.css';
import { removeCity } from '../../../state/citiesSlice';

export default function CityCard({
  name, 
  temperature,
  windSpeed,
  pressure,
  index
}) {
  const dispatch = useDispatch();

  let temperatureElem = `${temperature} °C`;
  // Adding '+' in front of positive temperature.
  if (temperature > 0) {
    temperatureElem = `+${temperatureElem}`;
  }

  const removeCard = () => {
    dispatch(removeCity(index));
  }

  return (
    <article className="city">
      <div className="city_name">
        <h3>{name}</h3>
      </div>
      <div className="city_remove-elem" onClick={removeCard}>
        <img src="./icons/close.png" alt="Убрать" />
      </div>
      <div className='city_temperature'>
        <img src="./icons/sun.png" alt="Солнечно" />
        <p>{temperatureElem}</p>
      </div>
      <div className='city_wind'>
        <p>Ветер: {windSpeed} м/с</p>
      </div>
      <div className='city_pressure'>
        <p>Ветер: {pressure} мм</p>
      </div>
    </article>
  );
};
