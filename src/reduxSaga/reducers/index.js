/* eslint-disable prettier/prettier */
import {combineReducers} from 'redux';
import homeReducers from './homeReducer';
import bottomReducer from './bottomReducer';
import loadingReducer from './loadingReducer';
import accountReducer from './accountReducer';
import {reducer as network} from 'react-native-offline';
const Reducers = combineReducers({
  homeReducers: homeReducers,
  bottomReducer: bottomReducer,
  isLoading: loadingReducer,
  currentAccount: accountReducer,
  network,
});

export default Reducers;
