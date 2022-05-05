/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useContext, useState, useMemo, useCallback} from 'react';
import * as Colors from '~/utils/Colors';
import {
  StyleSheet,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  Pressable,
  Platform,
} from 'react-native';
import {
  Text,
  HeaderComponent,
  Button,
  Card,
  CarouselComponent,
  ListCourse,
  BackgroundGardient,
} from '~/component/componentExtension';
import {useTheme} from '@react-navigation/native';
import {navigate} from '~/screen/NavigationService';
import {ScreenName, Sizings} from '~/utils';
import {isIphoneXorAbove} from '~/utils/configuration';

export default function UserComponent({style, userProfile}) {
  return (
    <Pressable
      style={[styles.container, style]}
      onPress={_ => navigate(ScreenName.PROFILE_SCREEN)}>
      <View style={styles.avatarView}>
        <Image
          style={styles.avatar}
          source={{
            uri:
              userProfile?.avatar ||
              'https://i.pinimg.com/564x/bc/75/88/bc75882d906b263fbe0550fe59dc7b21.jpg',
          }}
        />
      </View>
      <View style={styles.infoView}>
        <Text
          style={{
            width:
              Platform.OS === 'android'
                ? '80%'
                : isIphoneXorAbove()
                ? '80%'
                : '70%',
          }}
          numberOfLines={1}
          noTextDarkTheme
          fs18
          MontserratBold>
          {userProfile?.firstName + ' ' + userProfile?.lastName}
        </Text>
        <View>
          <Text noTextDarkTheme fs14>
            Code:{' '}
            <Text noTextDarkTheme fs14 Montserrat>
              {userProfile?.userName}
            </Text>
          </Text>
          <Text
            style={{
              width:
                Platform.OS === 'android'
                  ? '80%'
                  : isIphoneXorAbove()
                  ? '90%'
                  : '80%',
            }}
            numberOfLines={1}
            noTextDarkTheme
            fs14
            Montserrat>
            {userProfile?.email}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: 132,
    width: Sizings.percent_90,
    backgroundColor: '#FFFFFF',
    alignSelf: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  avatarView: {
    height: 100,
    width: 100,
    marginHorizontal: 10,
    borderRadius: 50,
    overflow: 'hidden',
  },
  avatar: {
    height: 100,
    width: 100,
  },
  email: {
    overflow: 'hidden',
  },
  infoView: {
    marginHorizontal: 20,
    height: 80,
    textAlign: 'left',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
});
