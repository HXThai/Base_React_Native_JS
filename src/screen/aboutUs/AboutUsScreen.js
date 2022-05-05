import React, {useEffect, useState, useContext} from 'react';
import AboutUsComponent from '~/component/aboutUs/AboutUsComponent';
import {PreferencesContext} from '../../../PreferencesContext';
import {saveDarkTheme, getDarkTheme} from '~/utils/storage';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {loadingAction} from '~/reduxSaga/actions/loadingAction';
import {Alert} from 'react-native';
import {aboutUsAction} from '~/reduxSaga/actions/generalAction';
import {ResponseCode} from '~/utils/constant';

function AboutUsScreen(props) {
  const {navigation} = props;
  const dispatch = useDispatch();
  let {i18n} = useTranslation();
  const [contentAboutUs, setContentAboutUs] = useState({});

  useEffect(() => {
    dispatch(loadingAction(true));
    dispatch(aboutUsAction(onGetAboutUsSuccess, onGetAboutUsError));
  }, []);

  const onGetAboutUsSuccess = response => {
    dispatch(loadingAction(false));
    if (response) {
      if (response.statusCode === ResponseCode.OK) {
        var dataFilterLang = {};
        response.content?.items?.forEach(element => {
          if (element?.aboutUsTranslations[0]?.languageCode === i18n.language) {
            dataFilterLang = element;
          }
        });
        setContentAboutUs(dataFilterLang);
      } else {
        Alert.alert(i18n.t('feedback.error'), i18n.t('general.errorRQapi'), [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
      }
    }
  };

  const onGetAboutUsError = error => {
    dispatch(loadingAction(false));
    Alert.alert(i18n.t('feedback.error'), i18n.t('general.errorRQapi'), [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  };

  return <AboutUsComponent contentAboutUs={contentAboutUs} />;
}

export default AboutUsScreen;
