/* eslint-disable prettier/prettier */
import types from '../actionstypes';

const initLoading = false;

const loadingReducer = (state = initLoading, action) => {
  switch (action.type) {
    case types.LOADING_ACTION: {
      return action.isLoading;
    }
    default:
      return state;
  }
};

export default loadingReducer;
