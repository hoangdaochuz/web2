import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { SIGN_OUT } from '../actions/types';
import store from '../myStore';
import config from '../config/mainConfig';

const axiosJWT = axios.create({
  baseURL: config.BACKEND_URL,
});

axiosJWT.interceptors.request.use(
  (config) => {
    config.headers['Authorization'] = `Bearer ${store.getState().auth.jwt}`;
    let currentDate = new Date();
    const decodeToken = jwtDecode(store.getState().auth.jwt);
    if (decodeToken.exp < currentDate.getTime() / 1000) {
      store.dispatch({
        type: SIGN_OUT,
      });
      return false;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default axiosJWT;
