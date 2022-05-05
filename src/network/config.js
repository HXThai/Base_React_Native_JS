/* eslint-disable prettier/prettier */
//@ts-check
const env = {
  dev: 'dev',
  test: 'test',
  stg: 'stg',
  product: 'product',
  local: 'local',
};
const BASE_URL = {
  local: 'http://192.168.59.220/',
  dev: 'http://192.168.0.34:5002/api/',
  test: 'http://14.160.28.2/',
  stg: 'http://14.160.28.2/',
  product: 'http://api.vnvon.com.vn/',
};

const currentEnv = env.dev;

export const BASE_API_URL = BASE_URL[currentEnv];
export const USER_TOKEN = 'USER_TOKEN';
//-- API URL
export const API_URL = {
  //Auth
  LOGIN: 'authentication/login',
  REGISTER: 'authentication/register',
  LOGIN_SOCIAL_NETWORK: 'authentication/external-login',
  FORGOT_REQUEST: 'authentication/request-forgot-pasword',
  FORGOT_CONFIRM: 'authentication/confirm-forgot-pasword',

  //Account
  CURRENT_ACCOUNT: 'accounts/current-account',
  SEND_FEEDBACK: 'feedback',
  UPDATE_ACCOUNT: 'accounts',
  UPLOAD_FILE: 'resources/upload-file',
  UPDATE_AVATAR: 'accounts/update-avatar',

  //General
  USER_GUIDE: 'userguide',
  ABOUT_US: 'aboutus',

  //Learn
  GET_LIST_COURSE: 'public/course',
  GET_LIST_LESSON: 'public/lesson',
};
