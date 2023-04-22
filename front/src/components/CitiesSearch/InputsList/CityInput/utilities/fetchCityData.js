import axios from 'axios';

/**
 * Fetches city wheather data.
 * @returns Object with fields 'name', 'temperature', 'windSpeed' and 'pressure'.
 */
export const fetchCityData = async (cityName) => {
  const cityRes = await axios.get(
    `${process.env.REACT_APP_BACKEND}/city_data/${cityName}`
  );

  return Promise.resolve(cityRes.data);
};