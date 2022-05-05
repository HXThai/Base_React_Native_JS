import ActionTypes from '../actionstypes';

export const registerAction = (params, onSuccess, onError) => {
  return {
    type: ActionTypes.REGISTER_ACTION,
    params,
    onSuccess,
    onError,
  };
};
export const forgotRequestAction = (params, onSuccess, onError) => {
  return {
    type: ActionTypes.FORGOT_REQUEST_ACTION,
    params,
    onSuccess,
    onError,
  };
};
export const forgotConfirmAction = (params, onSuccess, onError) => {
  return {
    type: ActionTypes.FORGOT_CONFIRM_ACTION,
    params,
    onSuccess,
    onError,
  };
};

export const loginAction = (params, onSuccess, onError) => {
  return {
    type: ActionTypes.LOGIN_ACTION,
    params,
    onSuccess,
    onError,
  };
};
export const logoutAction = () => {
  return {
    type: ActionTypes.LOGOUT_ACTION,
  };
};
export const loginSuccessAction = params => {
  return {
    type: ActionTypes.LOGIN_SUCCESS_ACTION,
    params,
  };
};
export const refreshTokenAction = (params, onSuccess, onError) => {
  return {
    type: ActionTypes.REFRESH_TOKEN_ACTION,
    params,
    onSuccess,
    onError,
  };
};

export const loginSocialNetworkAction = (params, onSuccess, onError) => {
  return {
    type: ActionTypes.LOGIN_SOCIAL_NETWORK_ACTION,
    params,
    onSuccess,
    onError,
  };
};
