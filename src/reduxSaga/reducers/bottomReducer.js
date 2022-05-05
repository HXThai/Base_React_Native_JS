/* eslint-disable prettier/prettier */
import types from '../actionstypes';

const initailState = {isNavOpen: false};

export default (state = initailState, action = {}) => {
  switch (action.type) {
    case types.OPEN_NAV_REDUCER:
      return {
        ...state,
        isNavOpen: true,
      };

    case types.CLOSE_NAV_REDUCER:
      return {
        ...state,
        isNavOpen: false,
      };

    default:
      return state;
  }
};
