export default async function getCitiesData() {
  return Promise.resolve([
    {
      name: 'Москва',
      temperature: 16,
      windSpeed: 5,
      pressure: 752
    },
    {
      name: 'Спб',
      temperature: 10,
      windSpeed: 5,
      pressure: 752
    }
  ]);
}
