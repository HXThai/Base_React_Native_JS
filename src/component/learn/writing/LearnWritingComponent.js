/* eslint-disable prettier/prettier */
import React, {forwardRef, useEffect, useImperativeHandle, useRef} from 'react';
import {StyleSheet, View, StatusBar, TouchableOpacity} from 'react-native';
import {
  Text,
  HeaderComponent,
  AppHeader,
  IllustrateCard,
  DrawLetterSpace,
  SelectDropdown,
} from '~/component/componentExtension';
import {myWidth, Colors, persentlWidth, persentHeight} from '~/utils';
import {useMockWriting} from '~/component/customHook';
import {useTranslation} from 'react-i18next';
import {
  DropDownIcon,
  LearnCheckIcon,
  LearnUnCheckIcon,
  VoiceSpeakerIcon,
} from '~/assets/icons';
let ContainerHeight = persentHeight(30);
function LearnWritingComponent(
  {
    picture_file,
    writing_file,
    subject_translation,
    onPressButton,
    onDropdownSelect,
    onPressMemo,
    onVoicePress,
    dropdownRef,
    isCurrentMemorizied,
  },
  ref,
) {
  let {t} = useTranslation();
  let drawRef = useRef();
  let dataDropDown = [
    t('learn.flashcard.all'),
    t('learn.flashcard.memorized'),
    t('learn.flashcard.notmemorized'),
  ];
  useImperativeHandle(ref, () => ({
    clear: () => {
      drawRef.current.clear();
    },
  }));

  return (
    <AppHeader style={styles.container}>
      <StatusBar hidden={false} backgroundColor={Colors.Teal_Blue} />
      <HeaderComponent />
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
          // onPress={_ => console.log('onPress IllustrateCard')}
          onPressButton={onPressButton}
          image={picture_file}
          subject_translation={subject_translation}
          haveButton
        />
        <DrawLetterSpace
          ref={drawRef}
          image={writing_file}
          onVoicePress={onVoicePress}
          style={styles.DrawLetterSpace}
          spaceHight={ContainerHeight}
        />
        <View>
          <TouchableOpacity onPress={onPressMemo} style={styles.btnMemo}>
            {isCurrentMemorizied ? <LearnCheckIcon /> : <LearnUnCheckIcon />}
            <Text
              mh5
              fs14
              MontserratBold
              transKey={'learn.flashcard.memorized'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </AppHeader>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },

  main: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'space-between',
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
  btnMemo: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  DrawLetterSpace: {},
});

export default forwardRef(LearnWritingComponent);
