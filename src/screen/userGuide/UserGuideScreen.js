import React, {useEffect, useState, useContext} from 'react';
import UserGuideComponent from '~/component/userGuide/UserGuideComponent';
import {PreferencesContext} from '../../../PreferencesContext';
import {saveDarkTheme, getDarkTheme} from '~/utils/storage';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {loadingAction} from '~/reduxSaga/actions/loadingAction';
import {Alert} from 'react-native';
import {userGuideAction} from '~/reduxSaga/actions/generalAction';
import {ResponseCode} from '~/utils/constant';

function UserGuideScreen(props) {
  const {navigation} = props;
  const dispatch = useDispatch();
  let {i18n} = useTranslation();
  const [contentUserGuide, setContentUserGuide] = useState({});

  useEffect(() => {
    dispatch(loadingAction(true));
    dispatch(userGuideAction(onGetUserGuideSuccess, onGetUserGuideError));
  }, []);

  const onGetUserGuideSuccess = response => {
    dispatch(loadingAction(false));
    if (response) {
      if (response.statusCode === ResponseCode.OK) {
        var dataFilterLang = {};
        response.content?.items?.forEach(element => {
          if (
            element?.userGuideTranslations[0]?.languageCode === i18n.language
          ) {
            dataFilterLang = element;
          }
        });
        setContentUserGuide(dataFilterLang);
      } else {
        Alert.alert(i18n.t('feedback.error'), i18n.t('general.errorRQapi'), [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
      }
    }
  };

  const onGetUserGuideError = error => {
    dispatch(loadingAction(false));
    Alert.alert(i18n.t('feedback.error'), i18n.t('general.errorRQapi'), [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  };

  return <UserGuideComponent contentUserGuide={contentUserGuide} />;
}

export default UserGuideScreen;
