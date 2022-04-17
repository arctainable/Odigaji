import axios from 'axios';
import server from '../../API/server';

const allCitiesUrl = server.BASE_URL + server.ROUTES.allCities;
const selCityUrl = server.BASE_URL + server.ROUTES.selCity;
const tasteUrl = server.BASE_URL + server.ROUTES.tastes;
const resultUrl = server.BASE_URL + server.ROUTES.result;

function AllCitiesList() {
  return axios.get(allCitiesUrl);
}

function AddSelCity(data) {
  const cityData = {
    city: data.id,
    rate: data.rate,
  };
  // cityData: 다녀온 지역 정보
  return axios.post(selCityUrl, cityData, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
    },
  });
}

function AddTaste(data) {
  var tasteData = {};
  data.forEach((ele) => {
    return (tasteData[ele.title] = ele.id);
  });
  // tasteData: 취향 설문 결과
  return axios.post(tasteUrl, tasteData, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
    },
  });
}

function GetResult() {
  return axios.get(resultUrl, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
    },
  });
}

function GetTaste() {
  return axios.get(tasteUrl, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
    },
  });
}

export { AllCitiesList, AddSelCity, AddTaste, GetResult, GetTaste };
