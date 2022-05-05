import React, {useEffect, useState, useContext} from 'react';
import CategorySettingComponent from '~/component/setting/CategorySettingComponent';
import {
  SettingIcon,
  ProfileIcon,
  AboutIcon,
  UserGuideIcon,
  FeedBackIcon,
  LogoutIcon,
} from '~/assets/icons';
import {useTheme} from '@react-navigation/native';
import {navigate, navigateAndSetToTop} from '~/screen/NavigationService';

import * as ScreenName from '~/utils/ScreenName';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Alert, Keyboard} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {logoutAction} from '~/reduxSaga/actions/authAction';
import {setToken} from '~/network/api-instance';
import * as Colors from '~/utils/Colors';
import {useTranslation} from 'react-i18next';
import {loadingAction} from '~/reduxSaga/actions/loadingAction';
import {sendFeedbackAction} from '~/reduxSaga/actions/accountAction';
import {ResponseCode} from '~/utils/constant';

function CategorySettingScreen(props) {
  const dispatch = useDispatch();
  let {i18n} = useTranslation();
  const {colors} = useTheme();
  const {navigation} = props;
  const dataCategory = [
    {
      icon: <ProfileIcon color={colors.PRIMARY_TEXT_COLOR} />,
      title: 'setting.profile',
      id: 'profile',
    },
    {
      icon: <SettingIcon color={colors.PRIMARY_TEXT_COLOR} />,
      title: 'setting.setting',
      id: 'setting',
    },
    {
      icon: <AboutIcon color={colors.PRIMARY_TEXT_COLOR} />,
      title: 'setting.aboutUs',
      id: 'aboutUs',
    },
    {
      icon: <UserGuideIcon color={colors.PRIMARY_TEXT_COLOR} />,
      title: 'setting.userGuide',
      id: 'userGuide',
    },
    {
      icon: <FeedBackIcon color={colors.PRIMARY_TEXT_COLOR} />,
      title: 'setting.feedback',
      id: 'feedback',
    },
    {
      icon: <LogoutIcon color={Colors.warning} />,
      title: 'setting.logout',
      id: 'logout',
    },
  ];
  const [isVisibleModalFeedback, setIsVisibleModalFeedback] = useState(false);
  const [numberStar, setNumberStar] = useState(0);
  const [contentFeedback, setContentFeedback] = useState('');
  const userProfile = useSelector(state => state.currentAccount);
  let fullName = `${userProfile?.firstName} ${userProfile?.lastname}`;
  let email = userProfile?.email;

  useEffect(() => {
    if (!isVisibleModalFeedback) {
      setNumberStar(0);
      setContentFeedback('');
    }
  }, [isVisibleModalFeedback]);
  const handleSignout = async () => {
    try {
      Alert.alert(i18n.t('general.notice'), i18n.t('logout.confirmLogout'), [
        {
          text: i18n.t('general.ok'),
          onPress: async () => {
            await GoogleSignin.signOut();
            dispatch(logoutAction());
            navigateAndSetToTop('LoginScreen');
            setToken();
          },
        },
        {
          text: i18n.t('general.cancel'),
          onPress: () => console.log('OK Pressed'),
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  const onPressCategory = id => {
    switch (id) {
      case 'profile':
        return navigate(ScreenName.PROFILE_SCREEN);
      case 'setting':
        return navigate(ScreenName.SETTING_SCREEN);
      case 'aboutUs':
        return navigate(ScreenName.ABOUT_US_SCREEN);
      case 'userGuide':
        return navigate(ScreenName.USER_GUIDE_SCREEN);
      case 'feedback':
        return setIsVisibleModalFeedback(true);
      case 'logout':
        handleSignout();
        return;
      default:
        return null;
    }
  };
  const onPressStar = index => {
    setNumberStar(index + 1);
  };
  const handleSendFeedback = () => {
    if (!numberStar) {
      Alert.alert(i18n.t('feedback.notice'), i18n.t('feedback.needRateStar'), [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
      return;
    }
    dispatch(loadingAction(true));
    const params = {
      name: fullName !== 'NaN' ? fullName : '',
      email: email,
      rate: numberStar,
      content: contentFeedback,
    };
    dispatch(sendFeedbackAction(params, onSendFBSuccess, onSendFBError));
  };

  const onSendFBSuccess = response => {
    console.log(response.content);
    dispatch(loadingAction(false));
    if (response) {
      if (response.statusCode === ResponseCode.OK) {
        setIsVisibleModalFeedback(false);
        Alert.alert(i18n.t('feedback.notice'), i18n.t('feedback.sendSuccess'), [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
      } else {
        setIsVisibleModalFeedback(false);
        Alert.alert(i18n.t('feedback.error', i18n.t('feedback.sendError')), [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
      }
    }
  };

  const onSendFBError = error => {
    dispatch(loadingAction(false));
    setIsVisibleModalFeedback(false);
    Alert.alert(i18n.t('feedback.error', i18n.t('feedback.sendError')), [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  };

  const _setIsVisibleModalFeedback = val => {
    console.log({val});
    if (typeof val !== 'boolean') {
      return;
    }
    // console.log('setIsVisibleModalFeedback', val);
    setIsVisibleModalFeedback(val);
  };
  const onPressOutSide = () => {
    Keyboard.dismiss();
  };
  return (
    <CategorySettingComponent
      dataCategory={dataCategory}
      onPressCategory={onPressCategory}
      isVisibleModalFeedback={isVisibleModalFeedback}
      setIsVisibleModalFeedback={_setIsVisibleModalFeedback}
      numberStar={numberStar}
      onPressStar={onPressStar}
      contentFeedback={contentFeedback}
      setContentFeedback={setContentFeedback}
      handleSendFeedback={handleSendFeedback}
      onPressOutSide={onPressOutSide}
    />
  );
}

export default CategorySettingScreen;
