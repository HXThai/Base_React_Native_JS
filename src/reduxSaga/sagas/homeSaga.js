/* eslint-disable prettier/prettier */
import {takeLatest, call, all, put} from 'redux-saga/effects';
import ActionTypes from '../actionstypes';
import {APIRequest} from '../../network/api-request';
import {API_URL} from '../../network/config';

function* logOut() {
  yield put({
    type: ActionTypes.LOG_OUT_REDUCER,
  });
}

export function* watchLogout() {
  yield takeLatest(ActionTypes.LOG_OUT, logOut);
}

// function* register(action) {
//   try {
//     let json = JSON.stringify(action.params);
//     new APIRequest.Builder()
//       .post()
//       .reqURL(API_URL.API_REGISTER)
//       .jsonParams(json)
//       .response(action.onSuccess)
//       .error(action.onError)
//       .build()
//       .doRequest();
//   } catch (error) {
//     action.onError(error);
//   }
// }

// export function* watchRegister() {
//   yield takeLatest(ActionTypes.REGISTER_ACTION, register);
// }

// function* login(action) {
//   try {
//     let json = JSON.stringify(action.params);
//     const data = yield new APIRequest.Builder()
//       .post()
//       .reqURL(API_URL.API_LOGIN)
//       .jsonParams(json)
//       .build()
//       .doRequestReturnResponseForReducer();

//     if (data && data.Authorization && data.Authorization.AccessToken) {
//       yield put({
//         type: ActionTypes.SAVE_TOKEN,
//         params: data.Authorization
//       })
//       action.onSuccess(data);
//     } else {
//       action.onError(data);
//     }
//   } catch (error) {
//     action.onError(error);
//   }
// }

// export function* watchLogin() {
//   yield takeLatest(ActionTypes.LOGIN_ACTION, login);
// }
