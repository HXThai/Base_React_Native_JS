/* eslint-disable prettier/prettier */
import {all, fork} from 'redux-saga/effects';

import {watchLogout} from './homeSaga';
import {watchCloseX, watchOpenX} from './bottomSaga';
import {networkSaga} from 'react-native-offline';
import {watchAuthNetwork} from './authSaga';
import {watchAccount} from './accountSaga';
import {watchGeneral} from './generalSaga';
import {watchLearn} from './learnSaga';

export default function* rootSaga() {
  yield all([
    watchLogout(),
    watchCloseX(),
    watchOpenX(),
    watchAuthNetwork(),
    watchAccount(),
    watchGeneral(),
    watchLearn(),
    fork(networkSaga, {pingInterval: 20000}),
  ]);
}
