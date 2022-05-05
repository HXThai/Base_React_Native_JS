import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import * as CustomColor from '../../utils/Colors';

export default function loadingView() {
  return (
    <View style={styles.loadingStyle}>
      <ActivityIndicator size="large" color={CustomColor.WHITE} />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingStyle: {
    flex: 1,
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: CustomColor.BG_LOADING,
    zIndex: 1000,
  },
});
