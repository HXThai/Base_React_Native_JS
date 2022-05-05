import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import * as Colors from '../../utils/Colors';
import {Text} from '~/component/componentExtension';

const CategoryHorizontal = ({data}) => {
  return (
    <View style={{flex: 1, flexDirection: 'row'}}>
      {data.map((item, index) => {
        return <Text key={index}>{item}</Text>;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  styleSafe: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: Colors.Background,
  },
});

export default CategoryHorizontal;
