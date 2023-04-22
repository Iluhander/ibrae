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
  let cardsListElem = cardsList
    .filter((elem) => elem.temperature >= temperatureMin)
    .map((elem, index) => {
      return <CityCard key={`city_card${index}`} index={index} {...elem} />;
    });

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
