/**
 * Fetches city wheather data.
 * @returns Object with fields 'name', 'temperature', 'windSpeed' and 'pressure'.
 */
export const fetchCityData = (cityName) => {
  if (cityName === 'Москва') {
    return Promise.resolve({
      name: 'Москва',
      temperature: 16,
      windSpeed: 5,
      pressure: 752
    });
  } else {
    return Promise.resolve({
      name: 'Спб',
      temperature: 12,
      windSpeed: 5,
      pressure: 752
    });
  }
};