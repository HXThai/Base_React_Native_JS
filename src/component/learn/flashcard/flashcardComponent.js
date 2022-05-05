/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, View, StatusBar, TouchableOpacity} from 'react-native';
import {
  Text,
  HeaderComponent,
  AppHeader,
  SelectDropdown,
  IllustrateCard,
  TextSubjectTrans,
} from '~/component/componentExtension';
import {
  DropDownIcon,
  LearnCheckIcon,
  LearnUnCheckIcon,
  VoiceSpeakerIcon,
} from '~/assets/icons';

import {myWidth, persentlWidth, Colors} from '~/utils';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  FlingGestureHandler,
  Directions,
  State,
} from 'react-native-gesture-handler';
import {useTranslation} from 'react-i18next';

let DetailBlock = ({content, explanation, example, example_trans}) => {
  return (
    <>
      <View style={styles.blockView}>
        <View style={styles.title}>
          <Text fs14 transKey="learn.flashcard.meaning" />
        </View>
        <View style={styles.content}>
          <Text MontserratBold fs14>
            {content}
          </Text>
        </View>
      </View>
      {explanation ? (
        <View style={styles.blockView}>
          <View style={styles.title}>
            <Text fs14 transKey="learn.flashcard.explanation" />
          </View>
          <View style={styles.content}>
            <Text MontserratBold fs14>
              {explanation}
            </Text>
          </View>
        </View>
      ) : null}
      <View style={styles.blockView}>
        <View style={styles.title}>
          <Text fs14 transKey="learn.flashcard.example" />
        </View>
        <View style={styles.content}>
          <View>
            <TextSubjectTrans
              fsMain={{fs14: true, MontserratBold: true}}
              raw={example}
            />
          </View>
          <View>
            <Text fs14 MontserratBold>
              {example_trans}
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default FlashcardComponent = ({
  dropdownRef,
  onPressButton,
  onDropdownSelect,
  onPressMemo,
  onPlayVoice,
  subject,
  content,
  explanation,
  example,
  example_trans,
  picture_file,
  voice_file,
  isCurrentMemorizied,
}) => {
  let {t} = useTranslation();

  let dataDropDown = [
    t('learn.flashcard.all'),
    t('learn.flashcard.memorized'),
    t('learn.flashcard.notmemorized'),
  ];

  let handleSwipeL = ({nativeEvent}) => {
    if (nativeEvent.state === State.ACTIVE) {
      onPressButton({side: 'right'});
    }
  };
  let handleSwipeR = ({nativeEvent}) => {
    if (nativeEvent.state === State.ACTIVE) {
      onPressButton({side: 'left'});
    }
  };

  return (
    <AppHeader style={styles.container}>
      <StatusBar hidden={false} backgroundColor={Colors.Teal_Blue} />
      <HeaderComponent title={'learn.flashcard.header'} />
      <FlingGestureHandler
        direction={Directions.RIGHT}
        onHandlerStateChange={handleSwipeR}>
        <FlingGestureHandler
          direction={Directions.LEFT}
          onHandlerStateChange={handleSwipeL}>
          <View style={styles.main}>
            <View style={styles.charSelectView}>
              <Text fs18 transKey={'learn.flashcard.pleaseSelect'} />
              <SelectDropdown
                ref={dropdownRef}
                renderDropdownIcon={_ => <DropDownIcon />}
                data={dataDropDown}
                defaultValueByIndex={2}
                style={styles.dropdown}
                onSelect={onDropdownSelect}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  return item;
                }}
              />
            </View>
            <IllustrateCard
              onPress={_ => console.log('onPress IllustrateCard')}
              onPressButton={onPressButton}
              image={picture_file}
              subject_translation={subject}
              haveButton
            />
            {voice_file && (
              <TouchableOpacity onPress={onPlayVoice} style={styles.voice}>
                <VoiceSpeakerIcon />
              </TouchableOpacity>
            )}
            <KeyboardAwareScrollView
              flex={1}
              showsVerticalScrollIndicator={false}>
              <DetailBlock
                content={content}
                explanation={explanation}
                example={example}
                example_trans={example_trans}
              />
            </KeyboardAwareScrollView>
            <View>
              <TouchableOpacity onPress={onPressMemo} style={styles.btnMemo}>
                {isCurrentMemorizied ? (
                  <LearnCheckIcon />
                ) : (
                  <LearnUnCheckIcon />
                )}
                <Text
                  mh5
                  fs14
                  MontserratBold
                  transKey={'learn.flashcard.memorized'}
                />
              </TouchableOpacity>
            </View>
          </View>
        </FlingGestureHandler>
      </FlingGestureHandler>
    </AppHeader>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  main: {
    flex: 1,
    alignSelf: 'center',
  },
  charSelectView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: persentlWidth(80),
  },
  dropdown: {
    width: myWidth / 2,
  },
  voice: {
    alignSelf: 'center',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blockView: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: persentlWidth(80),
    paddingVertical: 20,
  },
  title: {
    width: 100,
  },
  content: {
    flex: 1,
  },
  btnMemo: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
});
