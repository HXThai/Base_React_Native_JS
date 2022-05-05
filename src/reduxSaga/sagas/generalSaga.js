import {takeLatest, call, all, put} from 'redux-saga/effects';
import ActionTypes from '../actionstypes';
import {APIRequest} from '../../network/api-request';
import {API_URL} from '../../network/config';

function* getUserGuide(action) {
  try {
    new APIRequest.Builder()
      .get()
      .reqURL(API_URL.USER_GUIDE)
      .response(action.onSuccess)
      .error(action.onError)
      .build()
      .doRequest();
  } catch (error) {
    action.onError(error);
  }
}

function* getAboutUs(action) {
  try {
    new APIRequest.Builder()
      .get()
      .reqURL(API_URL.ABOUT_US)
      .response(action.onSuccess)
      .error(action.onError)
      .build()
      .doRequest();
  } catch (error) {
    action.onError(error);
  }
}

export function* watchGeneral() {
  yield takeLatest(ActionTypes.USER_GUIDE, getUserGuide);
  yield takeLatest(ActionTypes.ABOUT_US, getAboutUs);
}
