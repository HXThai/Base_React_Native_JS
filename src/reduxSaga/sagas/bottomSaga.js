/* eslint-disable prettier/prettier */
import {takeLatest, call, all, put} from 'redux-saga/effects';
import ActionTypes from '../actionstypes';
import {APIRequest} from '../../network/api-request';
import {API_URL} from '../../network/config';

function* openX() {
  yield put({
    type: ActionTypes.OPEN_NAV_REDUCER,
  });
}

export function* watchOpenX() {
  yield takeLatest(ActionTypes.OPEN_NAV, openX);
}

function* closeX() {
  yield put({
    type: ActionTypes.CLOSE_NAV_REDUCER,
  });
}

export function* watchCloseX() {
  yield takeLatest(ActionTypes.CLOSE_NAV, closeX);
}
