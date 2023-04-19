import axios from 'axios'

export default async function getCitiesData() {
  const { data } = await axios.get(`${process.env.REACT_APP_BACKEND}/cities_list`);
  const dataList = data.split('\n');
  
  // Reformatting data.
  const res = new Array(dataList.length - 1);
  const re = (/"(.*?)";"(.*?)";"(.*?)"/);
  for (let i = 1; i < dataList.length; i += 1) {
    if (dataList[i]) {
      const matches = dataList[i].match(re);

      if (matches) {
        res[i - 1] = {
          name: `${matches[2]}, ${matches[1]}`,
          index: matches[3]
        };
      } 
    }
  }

  return res.filter((elem) => elem);
}
