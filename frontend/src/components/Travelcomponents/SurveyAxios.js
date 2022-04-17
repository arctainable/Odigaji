import axios from 'axios';
import server from '../../API/server';

const allCitiesUrl = server.BASE_URL + server.ROUTES.allCities;
const selCityUrl = server.BASE_URL + server.ROUTES.selCity;
const tasteUrl = server.BASE_URL + server.ROUTES.tastes;
const userData = sessionStorage.getItem('jwt');

function AllCitiesList() {
  return axios.get(allCitiesUrl);
}

function AddSelCity(data) {
  const cityData = {
    city: data.id,
    rate: data.rate,
  };
  console.log('다녀온 지역 정보', cityData);
  return axios.post(selCityUrl, cityData, {
    headers: {
      Authorization: `Bearer ${userData}`,
    },
  });
}

function AddTaste(data) {
  var tasteData = {};
  data.forEach((ele) => {
    return (tasteData[ele.title] = ele.id);
  });
  console.log('취향 설문 결과', tasteData);
  return axios.post(tasteUrl, tasteData, {
    headers: {
      Authorization: `Bearer ${userData}`,
    },
  });
}

export { AllCitiesList, AddSelCity, AddTaste };
