import axios from 'axios';
import server from '../../API/server';

const popularUrl = server.BASE_URL + server.ROUTES.popular;
const randomUrl = server.BASE_URL + server.ROUTES.random;

function RandomCity() {
  return axios.get(randomUrl);
}

function PopularCity(number) {
  return axios.get(popularUrl + `${number}`);
}

export { RandomCity, PopularCity };
