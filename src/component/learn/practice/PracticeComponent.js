/* eslint-disable prettier/prettier */
import React, {
  useCallback,
  useContext,
  useState,
  useMemo,
  useEffect,
} from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';
import {
  Text,
  HeaderComponent,
  Button,
  AppHeader,
  QuestionComponent,
} from '~/component/componentExtension';
import {Sizes} from '~/utils/fontSize';
import Sizings from '~/utils/sizings';
import {myWidth, persentlWidth} from '~/utils/dimension';
import * as Colors from '~/utils/Colors';
import AnswerComponent from '~/component/learn/practice/AnswerComponent';
import {useTheme} from '@react-navigation/native';

const PracticeComponent = ({
  currentQuestionIndex,
  totalQuestion,
  practiceName,
  qustionTran,
  arrAnswersCurrent = [],
  userAnswer,
  onAnsPress,
}) => {
  const {colors} = useTheme();
  console.log({userAnswer});
  const renderAns = (item, index) => {
    console.log(String(userAnswer?.split('_')?.[1]));
    let answerStatus = -1;
    let userAnswerNumber = String(userAnswer?.split('_')?.[1]);
    if (!userAnswer) {
      answerStatus = -1;
    } else {
      if (item?.is_correct) {
        answerStatus = 1;
      } else {
        if (String(item.number) === userAnswerNumber) {
          answerStatus = 0;
        }
      }
    }
    return (
      <AnswerComponent
        key={index}
        content={item?.content_translations?.['en']}
        onPress={_ => onAnsPress && onAnsPress(item)}
        answerStatus={answerStatus}
      />
    );
  };
  return (
    <AppHeader
      style={[
        styles.container,
        {backgroundColor: colors.PRIMARY_BACKGROUND_COLOR},
      ]}>
      <StatusBar hidden={false} backgroundColor={Colors.Teal_Blue} />
      <HeaderComponent
        backIconColor={colors.BACK_ICON_COLOR}
        title={'learn.practice.practiceHeader'}
      />
      <View style={styles.main}>
        <View style={styles.ViewHeader}>
          <View style={styles.practiceName}>
            <View style={styles.practiceNameIndicator} />
            <Text mh5 Poppins fs12>
              {practiceName}
            </Text>
          </View>
          <View style={styles.progessView}>
            <Text fs14 MontserratBold>{`${
              currentQuestionIndex + 1
            }/${totalQuestion}`}</Text>
          </View>
        </View>
        <QuestionComponent content={qustionTran} />
        <View style={styles.bottomView}>
          {arrAnswersCurrent.map(renderAns)}
        </View>
      </View>
    </AppHeader>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    flex: 1,
    alignSelf: 'center',
    width: persentlWidth(85),
  },
  practiceName: {
    flexDirection: 'row',
  },
  practiceNameIndicator: {
    width: 2,
    backgroundColor: '#B6F006',
    borderRadius: 2,
  },
  bottomView: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingVertical: 100,
  },
  progessView: {
    alignSelf: 'center',
    marginVertical: 20,
  },
});
export default PracticeComponent;
