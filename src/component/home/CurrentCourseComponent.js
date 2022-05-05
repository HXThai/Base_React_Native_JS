/* eslint-disable prettier/prettier */
import React, {useContext, useState, useMemo, useCallback} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {
  Text,
  HeaderComponent,
  Button,
  Card,
  CarouselComponent,
  ListCourse,
  BackgroundGardient,
} from '~/component/componentExtension';
import {navigate} from '~/screen/NavigationService';
import {useTheme} from '@react-navigation/native';
import {CourseBadge, ContinueIcon} from '~/assets/icons';
import sizings from '~/utils/sizings';
import {
  FirstPointIcon,
  SecondPointIcon,
  ThirdPointIcon,
  FourthPointIcon,
} from '~/assets/icons';
import {Colors, ScreenName} from '~/utils';

export default function CurrentCourseComponent({style}) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.mainView}>
        <View style={styles.badgeView}>
          <CourseBadge width={60} height={60} color={Colors.primaryColor} />
        </View>

        <TouchableOpacity
          onPress={_ => {
            navigate(ScreenName.LEARN_SKILLCHOOSE_SCREEN, {unit: '0'});
          }}
          style={styles.mainContent}>
          <View style={styles.mainText}>
            <Text noTextDarkTheme fs14 MontserratBold>
              Unit 2: Self introduction
            </Text>

            <Text>
              <Text noTextDarkTheme fs10 MontserratMedium>
                {'Mar 01.2022'}
                {'  '}
              </Text>
              <Text
                noTextDarkTheme
                fs10
                MontserratMedium
                transKey={'course.leanringTime'}
              />
              <Text noTextDarkTheme fs10 MontserratMedium>
                {'1h32m'}
              </Text>
            </Text>
            <Text fs12 MontserratMedium transKey={'course.continueLearning'} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.badgeBottomView}>
        <View style={styles.containerPointDetail}>
          <FirstPointIcon />
        </View>
        <View style={styles.containerPointDetail}>
          <SecondPointIcon />
        </View>
        <View style={styles.containerPointDetail}>
          <ThirdPointIcon />
        </View>
        <View style={styles.containerPointDetail}>
          <FourthPointIcon />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: sizings.percent_90,
    // backgroundColor: '#FFFFFF',
    // borderColor: 'black',
    // borderWidth: 1,
    alignSelf: 'center',
    borderRadius: 20,
    // flexDirection: 'row',
    // alignItems: 'center',
  },
  mainView: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
  },
  mainText: {
    justifyContent: 'space-around',
    flex: 1,
    height: sizings.percent_60,
  },

  badgeView: {
    height: 60,
    width: 60,
    backgroundColor: 'white',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 12,
    marginHorizontal: 20,
  },
  badgeBottomView: {
    height: 23,
    width: sizings.percent_40,
    alignSelf: 'center',
    position: 'absolute',
    bottom: -10,
    right: 15,
    borderColor: '#C4C4C4',
    borderWidth: 0.67,
    backgroundColor: 'white',
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  containerPointDetail: {
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: 2,
  },
});
