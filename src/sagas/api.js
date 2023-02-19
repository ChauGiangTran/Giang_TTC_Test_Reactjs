import axios from 'axios';
const API_URL = 'https://5f55a98f39221c00167fb11a.mockapi.io/'; //use .env fiel to store URLs

export default axios.create({
  baseURL: API_URL
});
