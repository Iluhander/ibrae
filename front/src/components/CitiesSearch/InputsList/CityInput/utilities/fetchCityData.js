import axios from 'axios';

/**
 * Fetches city wheather data.
 * @returns Object with fields 'name', 'temperature', 'windSpeed' and 'pressure'.
 */
export const fetchCityData = async (cityName, cities) => {
  const cityElem = cities.find((elem) => {
    return elem.name === cityName
  });

  const cityRes = await axios.get(
    `${process.env.REACT_APP_BACKEND}/city_data/${cityElem.name}`
  );

  return Promise.resolve(cityRes.data);
};