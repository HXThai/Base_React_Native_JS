import ActionTypes from '../actionstypes';

export const getCurrentAccountAction = () => {
  return {
    type: ActionTypes.GET_CURRENT_ACCOUNT_ACTION,
  };
};

export const getCurrentAccountSuccess = payload => {
  return {
    type: ActionTypes.GET_CURRENT_ACCOUNT_SUCCESS,
    payload,
  };
};

export const getCurrentAccountFaild = err => {
  return {
    type: ActionTypes.GET_CURRENT_ACCOUNT_FAILD,
    err,
  };
};

export const updateAccountAction = (params, onSuccess, onError) => {
  return {
    type: ActionTypes.UPDATE_ACCOUNT_ACTION,
    params,
    onSuccess,
    onError,
  };
};

export const uploadFileAction = (params, onSuccess, onError) => {
  return {
    type: ActionTypes.UPLOAD_FILE_ACTION,
    params,
    onSuccess,
    onError,
  };
};

export const updateAvatarAction = (params, onSuccess, onError) => {
  return {
    type: ActionTypes.UPDATE_AVATAR_ACTION,
    params,
    onSuccess,
    onError,
  };
};

export const sendFeedbackAction = (params, onSuccess, onError) => {
  return {
    type: ActionTypes.SEND_FEEDBACK_ACTION,
    params,
    onSuccess,
    onError,
  };
};
