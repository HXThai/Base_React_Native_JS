import {takeLatest, call, all, put} from 'redux-saga/effects';
import ActionTypes from '../actionstypes';
import {APIRequest} from '../../network/api-request';
import {API_URL} from '../../network/config';
import {setToken} from '~/network/api-instance';

function* register(action) {
  try {
    let json = JSON.stringify(action.params);
    new APIRequest.Builder()
      .post()
      .reqURL(API_URL.REGISTER)
      .jsonParams(json)
      .response(action.onSuccess)
      .error(action.onError)
      .build()
      .doRequest();
  } catch (error) {
    action.onError(error);
  }
}

function* login(action) {
  try {
    let json = JSON.stringify(action.params);
    new APIRequest.Builder()
      .post()
      .reqURL(API_URL.LOGIN)
      .jsonParams(json)
      .response(data => {
        if (data.statusCode === 200) {
          setToken(data.content.token, data.content.refreshToken);
        }
        return action.onSuccess(data);
      })
      .error(action.onError)
      .build()
      .doRequest();
  } catch (error) {
    action.onError(error);
  }
}

function* loginSocialNetwork(action) {
  try {
    let json = JSON.stringify(action.params);

    new APIRequest.Builder()
      .post()
      .reqURL(API_URL.LOGIN_SOCIAL_NETWORK)
      .jsonParams(json)
      .response(data => {
        if (data.statusCode === 200) {
          setToken(data.content.token, data.content.refreshToken);
        }
        return action.onSuccess(data);
      })
      .error(action.onError)
      .build()
      .doRequest();
  } catch (error) {
    console.log(1, error);
    action.onError(error);
  }
}
function* forgotRequest(action) {
  try {
    let json = JSON.stringify(action.params);

    new APIRequest.Builder()
      .post()
      .reqURL(API_URL.FORGOT_REQUEST)
      .jsonParams(json)
      .response(action.onSuccess)
      .error(action.onError)
      .build()
      .doRequest();
  } catch (error) {
    console.log(1, error);
    action.onError(error);
  }
}
function* forgotConfirm(action) {
  try {
    let json = JSON.stringify(action.params);

    new APIRequest.Builder()
      .post()
      .reqURL(API_URL.FORGOT_CONFIRM)
      .jsonParams(json)
      .response(action.onSuccess)
      .error(action.onError)
      .build()
      .doRequest();
  } catch (error) {
    console.log(1, error);
    action.onError(error);
  }
}

export function* watchAuthNetwork() {
  yield takeLatest(ActionTypes.LOGIN_ACTION, login);
  yield takeLatest(ActionTypes.REGISTER_ACTION, register);
  yield takeLatest(ActionTypes.LOGIN_SOCIAL_NETWORK_ACTION, loginSocialNetwork);
  yield takeLatest(ActionTypes.FORGOT_REQUEST_ACTION, forgotRequest);
  yield takeLatest(ActionTypes.FORGOT_CONFIRM_ACTION, forgotConfirm);
}
