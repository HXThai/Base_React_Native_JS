/* eslint-disable prettier/prettier */
import {constant} from 'lodash';

//API response codes
export const ResponseCode = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  UNPROCESSABLE_REQUEST: 422,
  INTERNAL_SERVER_ERROR: 500,
  TOKEN_INVALID: 503,
  NO_INTERNET: 522,
  BAD_GATEWAY: 502,
  INVALID_OLD_PASSWORD: '422002',
};
