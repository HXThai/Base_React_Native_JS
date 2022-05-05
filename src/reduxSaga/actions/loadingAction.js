import ActionTypes from '../actionstypes';

export const loadingAction = isLoading => {
  return {
    type: ActionTypes.LOADING_ACTION,
    isLoading,
  };
};
