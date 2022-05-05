import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View, Pressable} from 'react-native';
import * as Colors from '~/utils/Colors';
import {Text} from '~/component/componentExtension';
import Sizings from '~/utils/sizings';
import {myWidth} from '~/utils/dimension';

export default QuestionComponent = ({voice_file, content}) => {
  return (
    <View style={styles.container}>
      <Text fs36 MontserratSB>
        {content}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    width: myWidth,
    paddingHorizontal: 20,
  },
});
