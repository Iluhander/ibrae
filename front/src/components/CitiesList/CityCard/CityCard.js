import React from 'react';

import { useDispatch } from 'react-redux';

import './CityCard.css';
import { removeCity } from '../../../state/citiesSlice';

export default function CityCard({
  name, 
  temperature,
  windSpeed,
  pressure,
  clouds,
  rain,
  snow,
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

  // Getting only name and not the country.
  const cityName = name.split(', ')[0];

  let weatherImg = {
    src: './icons/sun.png',
    alt: 'Солнечно'
  };

  if (rain > 0) {
    weatherImg = {
      src: './icons/rain.png',
      alt: 'Идёт дождь'
    };
  } else if (snow > 0) {
    weatherImg = {
      src: './icons/snow.png',
      alt: 'Идёт снег'
    };
  } else if (clouds > 0) {
    weatherImg = {
      src: './icons/cloud.png',
      alt: 'Облачно'
    };
  }

  return (
    <article className="city">
      <div className="city_name">
        <h3>{cityName}</h3>
      </div>
      <div className="city_remove-elem" onClick={removeCard}>
        <img src="./icons/close.png" alt="Убрать" />
      </div>
      <div className='city_temperature'>
        <img src={weatherImg.src} alt={weatherImg.alt} />
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
