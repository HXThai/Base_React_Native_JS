import ActionTypes from '../actionstypes';

export const userGuideAction = (onSuccess, onError) => {
  return {
    type: ActionTypes.USER_GUIDE,
    onSuccess,
    onError,
  };
};

export const aboutUsAction = (onSuccess, onError) => {
  return {
    type: ActionTypes.ABOUT_US,
    onSuccess,
    onError,
  };
};
