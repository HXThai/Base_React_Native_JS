/* eslint-disable prettier/prettier */
import React, {useEffect, useCallback} from 'react';
import {View, TextInput} from 'react-native';
import * as ScreenName from '~/utils/ScreenName';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '~/screen/home/HomeScreen';
import AllCoursesScreen from '~/screen/course/AllCoursesScreen';
import ProfileScreen from '~/screen/profile/ProfileScreen';
import ShopScreen from '~/screen/shop/ShopScreen';
import CustomTabBar from './customBottomTab/index';
import CategorySettingScreen from '~/screen/setting/CategorySettingScreen';

const Tab = createBottomTabNavigator();
export const BottomTabBar = () => {
  return (
    <Tab.Navigator
      initialRouteName={ScreenName.HOME_SCREEN}
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{headerShown: false}}>
      {/* home screen */}
      <Tab.Screen name={ScreenName.HOME_SCREEN} component={HomeScreen} />

      {/* course screen */}
      {/* <Tab.Screen
        name={ScreenName.ALL_COURSES_SCREEN}
        component={AllCoursesScreen}
      /> */}

      {/* shopping screen */}
      {/* <Tab.Screen name={ScreenName.SHOP_SCREEN} component={ShopScreen} /> */}

      {/* setting screen */}
      <Tab.Screen
        name={ScreenName.CATEGOTY_SETTING_SCREEN}
        component={CategorySettingScreen}
      />
    </Tab.Navigator>
  );
};
