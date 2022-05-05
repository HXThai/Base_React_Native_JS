/* eslint-disable prettier/prettier */
import React from 'react';
import {View, StatusBar, StyleSheet} from 'react-native';
import * as Colors from '../../utils/Colors';
import {Font} from '../../utils/constant';
import sizings from '../../utils/sizings';
import ImageCustom from '../../utils/Images';
import AppHeader from '../componentExtension/AppHeader';
import LoadingView from '../componentExtension/loading';

export default function BlogComponent(props) {
  const {isLoading} = props;

  const renderLoading = () => {
      if (isLoading) return <LoadingView />;
      return null;
  };

  return (
    <View style={styles.container}>
      <AppHeader style={styles.container}>
        <StatusBar hidden={false} backgroundColor={Colors.Teal_Blue} />
        {renderLoading()}
      </AppHeader>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Teal_Blue,
  },
});
