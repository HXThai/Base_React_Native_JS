/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import * as Colors from '~/utils/Colors';
import * as ScreenName from '~/utils/ScreenName';
import {
  HomeIcon,
  CourseIcon,
  ShopIcon,
  SettingIcon,
  MoreIcon,
} from '~/assets/icons';

const TabBarItem = props => {
  const {navigation, route, index, active} = props;

  const navigateTo = () => {
    navigation.navigate(route.name);
  };

  const getLinkImage = () => {
    if (route.name === ScreenName.HOME_SCREEN) {
      return (
        <HomeIcon
          color={
            active
              ? Colors.iconBottomBarSelected
              : Colors.iconBottomBarUnselected
          }
        />
      );
    } else if (route.name === ScreenName.CATEGOTY_SETTING_SCREEN) {
      return (
        <MoreIcon
          color={
            active
              ? Colors.iconBottomBarSelected
              : Colors.iconBottomBarUnselected
          }
        />
      );
    }
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={navigateTo} style={styles.item}>
        <View style={styles.tabWrapper}>
          <View style={active ? styles.boxShadow : styles.imageWrapper}>
            {getLinkImage()}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

export default TabBarItem;

const styles = StyleSheet.create({
  item: {
    height: '100%',
    minWidth: 60,
  },

  tabWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 60,
    paddingHorizontal: 20,
  },
  imageWrapper: {
    height: 35,
    width: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 1,
  },
  boxShadow: {
    height: 35,
    width: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 1,
  },
});
