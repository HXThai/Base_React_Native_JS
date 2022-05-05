/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState, useContext} from 'react';
import SplashComponent from '~/component/splash/SplashComponent';
import {navigateAndSetToTop} from '~/screen/NavigationService';
import {useDispatch, useSelector} from 'react-redux';

function SplashScreen(props) {
  const {navigation} = props;
  const token = useSelector(state => state.currentAccount?.token);

  // console.log('token', token);

  useEffect(() => {
    setTimeout(
      () => {
        navigateAndSetToTop(token ? 'MainStack' : 'LoginScreen');
      },
      __DEV__ ? 100 : 1500,
    );
  }, []);

  return <SplashComponent />;
}

export default SplashScreen;
