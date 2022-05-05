/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import CourseComponent from '~/component/course/CourseComponent';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {getListLessonAction} from '~/reduxSaga/actions/learnAction';
import {ResponseCode} from '~/utils/constant';
import {Alert} from 'react-native';
import {loadingAction} from '~/reduxSaga/actions/loadingAction';
import _ from 'lodash';

function CourseScreen(props) {
  const {navigation, route} = props;
  let {i18n} = useTranslation();
  const dispatch = useDispatch();

  const [dataLesson, setDataLesson] = useState([]);

  // console.log(route.params.paramsCourse.id);

  useEffect(() => {
    dispatch(loadingAction(true));
    dispatch(
      getListLessonAction(
        route.params.paramsCourse.id,
        onGetListLessonSuccess,
        onGetListLessonError,
      ),
    );
  }, []);

  const onGetListLessonSuccess = response => {
    dispatch(loadingAction(false));
    if (response) {
      if (response.statusCode === ResponseCode.OK) {
        var newDataLesson = response.content.items;
        newDataLesson = _.orderBy(newDataLesson, 'ordinalNumber', 'asc');
        setDataLesson(newDataLesson);
      } else {
        Alert.alert(i18n.t('feedback.error'), i18n.t('general.errorRQapi'), [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
      }
    }
  };

  const onGetListLessonError = error => {
    dispatch(loadingAction(false));
    Alert.alert(i18n.t('feedback.error'), i18n.t('general.errorRQapi'), [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  };

  return (
    <CourseComponent
      dataLesson={dataLesson}
      dataCourse={route.params.paramsCourse}
    />
  );
}

export default CourseScreen;
