import axios from 'axios'

export default async function getCitiesData() {
  const { data } = await axios.get(`${process.env.REACT_APP_BACKEND}/cities_list`);
  
  return data.map((elem) => elem.name);
}
