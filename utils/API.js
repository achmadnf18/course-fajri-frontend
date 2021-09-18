import axios from 'axios';
import { API_URL } from '../config';

const instance = axios.create({
  baseURL: API_URL,
});

instance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;