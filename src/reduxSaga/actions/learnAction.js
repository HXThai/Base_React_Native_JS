import ActionTypes from '../actionstypes';

export const getListCourseAction = (onSuccess, onError) => {
  return {
    type: ActionTypes.GET_LIST_COURSE,
    onSuccess,
    onError,
  };
};

export const getListLessonAction = (courseId, onSuccess, onError) => {
  return {
    type: ActionTypes.GET_LIST_LESSON,
    courseId,
    onSuccess,
    onError,
  };
};
