import {takeLatest, call, all, put} from 'redux-saga/effects';
import ActionTypes from '../actionstypes';
import {APIRequest} from '../../network/api-request';
import {API_URL} from '../../network/config';

function* getListCourse(action) {
  try {
    new APIRequest.Builder()
      .get()
      .reqURL(API_URL.GET_LIST_COURSE)
      .response(action.onSuccess)
      .error(action.onError)
      .build()
      .doRequest();
  } catch (error) {
    action.onError(error);
  }
}

function* getListLesson(action) {
  try {
    new APIRequest.Builder()
      .get()
      .reqURL(
        `${API_URL.GET_LIST_LESSON}?Filters[0].Field=CourseId&Filters[0].Value=${action.courseId}`,
      )
      .response(action.onSuccess)
      .error(action.onError)
      .build()
      .doRequest();
  } catch (error) {
    action.onError(error);
  }
}

export function* watchLearn() {
  yield takeLatest(ActionTypes.GET_LIST_COURSE, getListCourse);
  yield takeLatest(ActionTypes.GET_LIST_LESSON, getListLesson);
}
