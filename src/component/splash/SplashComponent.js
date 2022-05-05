/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import * as Colors from '~/utils/Colors';
import {StyleSheet, View, StatusBar, Image} from 'react-native';
import {useTheme} from '@react-navigation/native';
export default function SplashComponent() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" hidden={false} />
      <Image style={styles.logo} source={require('~/assets/images').Logo} />
      <Image
        style={styles.deco_bot}
        source={require('~/assets/images').deco_sp_bot}
      />
      <Image
        style={styles.deco_top}
        source={require('~/assets/images').deco_sp_top}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: 50,
    width: 220,
  },
  deco_bot: {
    height: 266,
    width: 238,
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  deco_top: {
    height: 100,
    width: 90,
    position: 'absolute',
    top: 0,
    right: 0,
  },
});
