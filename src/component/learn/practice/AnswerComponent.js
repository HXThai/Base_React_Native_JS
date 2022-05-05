/* eslint-disable prettier/prettier */
import React, {
  useCallback,
  useContext,
  useState,
  useMemo,
  useEffect,
} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {
  Text,
  HeaderComponent,
  Button,
  TextInputComponent,
  IllustrateCard,
  AppHeader,
  QuestionComponent,
  TextSubjectTrans,
} from '~/component/componentExtension';
import {Sizes} from '~/utils/fontSize';
import Sizings from '~/utils/sizings';
import {myWidth, persentlWidth} from '~/utils/dimension';
import * as Colors from '~/utils/Colors';
import {useMockData} from '~/component/customHook';
import {useTheme} from '@react-navigation/native';

export default AnswerComponent = ({content, onPress, answerStatus}) => {
  const {colors} = useTheme();
  console.log({answerStatus});
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        {backgroundColor: colors.PRIMARY_TEXTINPUT_COLOR},
        answerStatus === 1 && styles.rightStatus,
        answerStatus === 0 && styles.falseStatus,
      ]}>
      <TextSubjectTrans fsMain={{fs16: true}} raw={content} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 70,
    borderWidth: 1,
    borderColor: '#BBBBBB',
    borderRadius: 10,
    marginVertical: 5,
    width: persentlWidth(80),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightStatus: {
    backgroundColor: '#83E84A',
  },
  falseStatus: {
    backgroundColor: '#E03F07',
  },
});
