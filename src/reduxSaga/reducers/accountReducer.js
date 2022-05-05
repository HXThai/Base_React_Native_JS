/* eslint-disable prettier/prettier */
import types from '../actionstypes';
import {navigate, navigateAndSetToTop} from '~/screen/NavigationService';

const initReducer = {
  token: '',
  refreshToken: '',
};

const accountReducer = (state = initReducer, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS_ACTION: {
      let {token, refreshToken} = action.params;
      return {
        ...state,
        token,
        refreshToken,
      };
    }
    case types.LOGOUT_ACTION: {
      return {
        ...initReducer,
      };
    }
    case types.GET_CURRENT_ACCOUNT_SUCCESS: {
      return {
        ...state,
        ...action.payload.content,
      };
    }
    case types.GET_CURRENT_ACCOUNT_FAILD: {
      // return action.payload.errorMessage;
      return {
        ...state,
        // ...action.payload.content,
      };
    }
    default:
      return state;
  }
};

export default accountReducer;
