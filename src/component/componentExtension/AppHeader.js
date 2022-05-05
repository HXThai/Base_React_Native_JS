import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import * as Colors from '../../utils/Colors';

const AppHeader = ({children, style}) => {
  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={[styles.styleSafe, style]}>
        <View style={{flex: 1}}>{children}</View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  styleSafe: {
    flex: 1,
    position: 'relative',
    height: '100%',
    width: '100%',
    backgroundColor: Colors.Background,
  },
});

export default AppHeader;
