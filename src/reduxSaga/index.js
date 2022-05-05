import {createStore, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import createSagaMiddleware from 'redux-saga';
import {createNetworkMiddleware} from 'react-native-offline';
import Reducers from './reducers/';
import rootSaga from './sagas/rootSaga';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['isLoading'],
};
const persistedReducer = persistReducer(persistConfig, Reducers);
const sagaMiddleware = createSagaMiddleware();
const networkMiddleware = createNetworkMiddleware({
  queueReleaseThrottle: 200,
});
const store = createStore(
  persistedReducer,
  applyMiddleware(networkMiddleware, sagaMiddleware),
);
const persistor = persistStore(store);
sagaMiddleware.run(rootSaga);

export {store, persistor};
