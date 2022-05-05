/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import HomeComponent from '../../component/home/HomeComponent';
import {useDispatch, useSelector} from 'react-redux';
import {getCurrentAccountAction} from '~/reduxSaga/actions/accountAction';
import {getListCourseAction} from '~/reduxSaga/actions/learnAction';
import {useTranslation} from 'react-i18next';
import {ResponseCode} from '~/utils/constant';
import {Alert} from 'react-native';
import {loadingAction} from '~/reduxSaga/actions/loadingAction';
import {ScreenName} from '~/utils';
import {navigate} from '~/screen/NavigationService';

function HomeScreen(props) {
  const {navigation} = props;
  const dispatch = useDispatch();
  let {i18n} = useTranslation();
  const userProfile = useSelector(state => state?.currentAccount);

  const [dataListCourses, setDataListCourses] = useState([]);

  useEffect(() => {
    dispatch(getCurrentAccountAction());
    dispatch(getListCourseAction(onGetListCourseSuccess, onGetListCourseError));
  }, []);

  useEffect(() => {
    dispatch(getListCourseAction(onGetListCourseSuccess, onGetListCourseError));
  }, [i18n.language]);

  const onGetListCourseSuccess = response => {
    dispatch(loadingAction(false));
    if (response) {
      if (response.statusCode === ResponseCode.OK) {
        setDataListCourses(response?.content?.items);
      } else {
        Alert.alert(i18n.t('feedback.error', i18n.t('general.errorRQapi')), [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
      }
    }
  };

  const onGetListCourseError = error => {
    dispatch(loadingAction(false));
    Alert.alert(i18n.t('feedback.error', i18n.t('general.errorRQapi')), [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  };

  const onCoursePress = x => {
    if (x.type === 'Basic') {
      navigate(ScreenName.COURSE_SCREEN, {paramsCourse: x});
    }
  };

  return (
    <HomeComponent
      userProfile={userProfile}
      dataListCourses={dataListCourses}
      onCoursePress={onCoursePress}
      currentLanguage={i18n.language}
    />
  );
}

export default HomeScreen;
