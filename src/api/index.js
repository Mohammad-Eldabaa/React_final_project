import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import useAuthStore from '../store';
import { refreshTokeAPI } from './fetchApi';

const URL = process.env.REACT_APP_API_URL;
export const APICALL = axios.create({ baseURL: URL });

export function isTokenExpire(token) {
  try {
    const { exp, expiresIn } = jwtDecode(token);
    const now = Date.now() / 1000;
    return (exp ?? expiresIn) < now;
  } catch {
    return true;
  }
}

export const publicRoutes = ['/signup', '/refresh-token', '/login'];

APICALL.interceptors.request.use(
  async config => {
    if (!publicRoutes.includes(config.url)) {
      const { token, refreshToken } = useAuthStore.getState();

      console.log('config');
      console.log(config);

      if (isTokenExpire(token)) {
        if (!isTokenExpire(refreshToken)) {
          const res = await refreshTokeAPI(refreshToken);
          console.log('res');
          console.log(res);
          config.headers.Authorization = `Bearer ${res.data.token}`;
          return config;
        }

        window.location.replace('../pages/login/LoginPage.jsx');
        return config;
      }

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  error => Promise.reject(error)
);

APICALL.interceptors.response.use(
  response => response,
  error => {
    console.log(error);
    if (error.response.status === 401) {
      window.location.replace('/Login');
    }
    return Promise.reject(error);
  }
);
