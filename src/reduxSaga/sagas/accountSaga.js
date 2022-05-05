import {takeLatest, call, all, put} from 'redux-saga/effects';
import ActionTypes from '../actionstypes';
import {APIRequest} from '../../network/api-request';
import {API_URL} from '../../network/config';
import {ResponseCode} from '~/utils/constant';
import {
  getCurrentAccountSuccess,
  getCurrentAccountFaild,
} from '~/reduxSaga/actions/accountAction';

function* getCurrentAccount(action) {
  try {
    const data = yield new APIRequest.Builder()
      .get()
      .reqURL(API_URL.CURRENT_ACCOUNT)
      .build()
      .doRequestReturnResponseForReducer();

    if (data && data.statusCode === ResponseCode.OK) {
      yield put(getCurrentAccountSuccess(data));
    }
  } catch (error) {
    yield put(getCurrentAccountFaild(error));
  }
}

function* sendFeedback(action) {
  try {
    let json = JSON.stringify(action.params);
    new APIRequest.Builder()
      .post()
      .reqURL(API_URL.SEND_FEEDBACK)
      .jsonParams(json)
      .response(action.onSuccess)
      .error(action.onError)
      .build()
      .doRequest();
  } catch (error) {
    action.onError(error);
  }
}

function* updateAccount(action) {
  try {
    let json = JSON.stringify(action.params.body);
    new APIRequest.Builder()
      .put()
      .reqURL(`${API_URL.UPDATE_ACCOUNT}/${action.params.endPointAccId}`)
      .jsonParams(json)
      .response(action.onSuccess)
      .error(action.onError)
      .build()
      .doRequest();
  } catch (error) {
    action.onError(error);
  }
}

function* uploadFile(action) {
  try {
    let json = JSON.stringify(action.params);
    new APIRequest.Builder()
      .post()
      .reqURL(API_URL.UPLOAD_FILE)
      .params('file', action.params)
      .response(action.onSuccess)
      .error(action.onError)
      .build()
      .doRequest();
  } catch (error) {
    action.onError(error);
  }
}

function* updateAvatar(action) {
  try {
    let json = JSON.stringify(action.params);
    new APIRequest.Builder()
      .put()
      .reqURL(API_URL.UPDATE_AVATAR)
      .jsonParams(json)
      .response(action.onSuccess)
      .error(action.onError)
      .build()
      .doRequest();
  } catch (error) {
    action.onError(error);
  }
}

export function* watchAccount() {
  yield takeLatest(ActionTypes.GET_CURRENT_ACCOUNT_ACTION, getCurrentAccount);
  yield takeLatest(ActionTypes.SEND_FEEDBACK_ACTION, sendFeedback);
  yield takeLatest(ActionTypes.UPDATE_ACCOUNT_ACTION, updateAccount);
  yield takeLatest(ActionTypes.UPLOAD_FILE_ACTION, uploadFile);
  yield takeLatest(ActionTypes.UPDATE_AVATAR_ACTION, updateAvatar);
}
