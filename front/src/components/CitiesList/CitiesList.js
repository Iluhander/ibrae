import React from 'react';
import { useSelector } from 'react-redux';

import CityCard from './CityCard/CityCard';

import './CitiesList.css';

/**
 * Function, which makes array of cards for react to render.
 * @param {Array} cardsList - cards descriptions.
 * @returns an array for react.
 */
function makeCards(cardsList, temperatureMin) {
  if (cardsList === null) {
    return (<h1>Города не найдены</h1>);
  }

  if (cardsList === undefined) {
    return (<h1>Выберите города</h1>);
  }

  // Creating the array of elements for react to render.
  let cardsListElem = [];
  for (let i = 0; i < cardsList.length; i += 1) {
    if (cardsList[i].temperature >= temperatureMin) {
      cardsListElem.push(
        <CityCard key={`city_card${i}`} index={i} {...cardsList[i]} />
      );
    }
  }

  return cardsListElem;
}

export default function CitiesList() {
  const citiesData = useSelector(state => state.cities);

  return (
    <section className="cities-list">
      {makeCards(citiesData.list, citiesData.temperatureMin)}
    </section>
  );
}
