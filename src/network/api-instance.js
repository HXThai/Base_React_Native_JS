/* eslint-disable curly */
/* eslint-disable prettier/prettier */
import axios from 'axios';
import {BASE_API_URL} from './config';
import {navigate, navigateAndSetToTop} from '../screen/NavigationService';
import jwt_decode from 'jwt-decode';
import {Storage} from '~/utils';
let axiosInstance = axios.create({
  baseURL: BASE_API_URL,
  timeout: 15000,
});

async function setToken(token = '', refreshToken = '') {
  console.log('setToken', token);

  axiosInstance.defaults.headers.common['Authorization'] = token
    ? `Bearer ${token}`
    : '';
  await Storage.setValue('auth:token', token);
  await Storage.setValue('auth:refreshToken', refreshToken);
}

async function refreshTokenAction() {
  let token = await Storage.getValue('auth:token');
  let refreshToken = await Storage.getValue('auth:refreshToken');
  return axiosInstance.post('authentication/refresh-token', {
    token,
    refreshToken,
  });
}

// return request config or request error
axiosInstance.interceptors.request.use(
  async config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// user axios interceptors for change response and error as we want
axiosInstance.interceptors.request.use(
  async config => {
    if (config.url === 'authentication/refresh-token') {
      console.log('request freshtoken, skip');
      // console.log(config);
      return config;
    }
    let auth = config?.headers?.common?.Authorization;

    if (!auth && !config.url.startsWith('authentication')) {
      let token = await Storage.getValue('auth:token');
      console.log('auth not found, try add token to request', config.url);
      config.headers.common.Authorization = `Bearer ${token}`;
      auth = `Bearer ${token}`;
    }
    let token = auth?.split(' ')[1];
    if (!token) {
      // console.log('no token found', config.url);
      return config;
    }
    let d = jwt_decode(token);
    let exp = d.exp;
    let now = Math.round(Date.now() / 1000);
    if (now > exp) {
      console.log('jwt token exp, try refresh token');
      let re = await refreshTokenAction();
      if (re && re.statusCode === 200) {
        console.log('refresh token ok');
        setToken(re.content.token, re.content.refreshToken);
        config.headers.common.Authorization = 'Bearer ' + re.content.token;
        return config;
      } else {
        console.log('refresh token fail');
        navigateAndSetToTop('LoginScreen');
        setToken();
      }
    } else {
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);
axiosInstance.interceptors.response.use(
  response => {
    let statusCode = String(response.data?.statusCode);

    if (
      statusCode &&
      statusCode === '401' &&
      !response.config.url.startsWith('authentication')
    ) {
      console.log(
        'Error 401, move to loginsreen',
        response.config.url,
        response.config.headers,
      );
      setToken('', '');
      navigateAndSetToTop('LoginScreen');
    }
    return response.data;
  },
  error => {
    return Promise.reject(error);
  },
);

export {axiosInstance, setToken};
