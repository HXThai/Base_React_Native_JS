/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, StatusBar, TouchableOpacity} from 'react-native';
import {Text, HeaderComponent, AppHeader} from '~/component/componentExtension';
import {myWidth, persentlWidth} from '~/utils/dimension';
import * as Colors from '~/utils/Colors';
import AnswerComponent from '~/component/learn/practice/AnswerComponent';
import {useTheme} from '@react-navigation/native';
import {ResultIcon, CorrectIcon, ChartIcon} from '~/assets/icons';
import {ScrollView} from 'react-native-gesture-handler';

const resultDataInit = [
  {
    id: 1,
    originalText: 'はじめまして',
    translatedText: 'ka',
    time: '2.15s',
    isCorrect: false,
  },
  {
    id: 2,
    originalText: 'はじめまして',
    translatedText: 'ka',
    time: '2.15s',
    isCorrect: true,
  },
  {
    id: 3,
    originalText: 'はじめまして',
    translatedText: 'ka',
    time: '2.15s',
    isCorrect: true,
  },
  {
    id: 4,
    originalText: 'はじめまして',
    translatedText: 'ka',
    time: '2.11s',
    isCorrect: true,
  },
  {
    id: 5,
    originalText: 'はじめまして',
    translatedText: 'ka',
    time: '4.15s',
    isCorrect: false,
  },
  {
    id: 6,
    originalText: 'はじめまして',
    translatedText: 'ka',
    time: '2.15s',
    isCorrect: true,
  },
  {
    id: 7,
    originalText: 'はじめまして',
    translatedText: 'ka',
    time: '2.11s',
    isCorrect: true,
  },
  {
    id: 8,
    originalText: 'はじめまして',
    translatedText: 'ka',
    time: '4.15s',
    isCorrect: false,
  },
  {
    id: 9,
    originalText: 'はじめまして',
    translatedText: 'ka',
    time: '2.15s',
    isCorrect: false,
  },
  {
    id: 10,
    originalText: 'はじめまして',
    translatedText: 'ka',
    time: '2.15s',
    isCorrect: true,
  },
  {
    id: 11,
    originalText: 'はじめまして',
    translatedText: 'ka',
    time: '2.15s',
    isCorrect: true,
  },
  {
    id: 12,
    originalText: 'はじめまして',
    translatedText: 'ka',
    time: '2.11s',
    isCorrect: true,
  },
  {
    id: 13,
    originalText: 'はじめまして',
    translatedText: 'ka',
    time: '4.15s',
    isCorrect: false,
  },
  {
    id: 14,
    originalText: 'はじめまして',
    translatedText: 'ka',
    time: '2.15s',
    isCorrect: true,
  },
  {
    id: 15,
    originalText: 'はじめまして',
    translatedText: 'ka',
    time: '2.11s',
    isCorrect: true,
  },
  {
    id: 16,
    originalText: 'はじめまして',
    translatedText: 'ka',
    time: '4.15s',
    isCorrect: false,
  },
];

const AnswerCard = ({originalText, translatedText, isCorrect, time, id}) => {
  let textColor = {white: isCorrect ? false : true};
  return (
    <View key={id} style={[styles.card, !isCorrect && styles.cardInCorrect]}>
      <View style={styles.textView}>
        <Text {...textColor} MontserratMedium fs16>
          {originalText}
        </Text>
        <Text {...textColor} MontserratMedium fs12>
          {translatedText}
        </Text>
      </View>
      <View style={styles.timeView}>
        <Text {...textColor} fs12>
          {time}
        </Text>
      </View>
    </View>
  );
};

const PracticeResultComponent = ({
  practiceName = 'Hiragana/Practice',
  correctCount = 22,
  totalQuestion = 121,
  resultData = resultDataInit,
}) => {
  const {colors} = useTheme();
  let renderCard = e => {
    return (
      <AnswerCard
        translatedText={e?.translatedText}
        originalText={e?.originalText}
        time={e?.time}
        isCorrect={e?.isCorrect}
        id={e?.id}
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
        </View>

        <View style={styles.resultScoreWrapView}>
          <View style={styles.ChartIconView}>
            <ChartIcon />
          </View>
          <View style={styles.resultScoreView}>
            <View style={styles.resultLineView}>
              <View style={styles.resultTitle}>
                <View style={styles.resultIcon}>
                  <CorrectIcon />
                </View>
                <Text
                  fs14
                  MontserratBold
                  transKey={'learn.practiceResult.correctAnswers'}
                />
              </View>
              <Text
                fs14
                MontserratBold>{`${correctCount} / ${totalQuestion}`}</Text>
            </View>
            <View style={styles.resultLineView}>
              <View style={styles.resultTitle}>
                <View style={styles.resultIcon}>
                  <ResultIcon />
                </View>

                <Text
                  fs14
                  MontserratBold
                  transKey={'learn.practiceResult.result'}
                />
              </View>
              <Text fs14 MontserratBold>{`${Math.round(
                (correctCount / totalQuestion) * 100,
              )}%`}</Text>
            </View>
          </View>
        </View>

        <View style={styles.buttonView}>
          <TouchableOpacity style={[styles.button, styles.buttonMistake]}>
            <Text
              centered
              fs14
              MontserratSB
              white
              transKey="learn.practiceResult.retryMistake"
            />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.buttonAll]}>
            <Text
              centered
              fs14
              MontserratSB
              white
              transKey="learn.practiceResult.retryAll"
            />
          </TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.resultCardView}>
            {resultData.map(renderCard)}
          </View>
        </ScrollView>
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
  resultScoreWrapView: {
    // borderWidth: 1,
  },
  ChartIconView: {
    alignSelf: 'center',
    zIndex: 20,
  },
  resultScoreView: {
    marginTop: -38,
    paddingTop: 50,
    zIndex: 10,
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
  },
  resultLineView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  resultTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resultIcon: {
    width: 25,
  },

  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  button: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    flex: 1,
  },
  buttonMistake: {
    marginRight: 10,
    backgroundColor: '#C84E23',
  },
  buttonAll: {
    marginLeft: 10,
    backgroundColor: '#23C115',
  },

  resultCardView: {
    marginTop: 10,
  },

  // for card

  card: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#BBBBBB',
    marginBottom: 2,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 56,
  },
  cardInCorrect: {
    backgroundColor: '#C84E23',
  },
});
export default PracticeResultComponent;
