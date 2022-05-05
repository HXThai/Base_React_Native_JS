/* eslint-disable react-hooks/exhaustive-deps */
import React, {useRef, useState} from 'react';
import {StyleSheet, View, TextInput, Platform} from 'react-native';
import * as Colors from '~/utils/Colors';
import {Sizes} from '~/utils/fontSize';
import fonts from '~/utils/font';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';

function TextInputComponent({
  placeholder,
  placeholderStyle,
  containerTextInputStyle,
  textInputStyle,
  onChangeText,
  value,
  isAutoFocus,
  handleFocus,
  handleBlur,
  style,
  autoScrollToStart = false,
  ...otherProps
}) {
  let {t} = useTranslation();
  const {colors} = useTheme();
  let textInputRef = useRef();
  let [select, setselect] = useState(null);

  let flated = StyleSheet.flatten([
    styles.input,
    textInputStyle,
    {
      backgroundColor: colors.PRIMARY_TEXTINPUT_COLOR,
    },
    style,
  ]);
  let _handleBlur = () => {
    handleBlur && handleBlur();
    if (autoScrollToStart) {
      if (Platform.OS === 'android') {
        setselect({start: 0, end: 0});
      }
    }
  };
  let _handleFocus = () => {
    handleFocus && handleFocus();
    if (autoScrollToStart) {
      if (Platform.OS === 'android') {
        setselect(null);
      }
    }
  };
  if (autoScrollToStart) {
    if (select) {
      setTimeout(_ => {
        setselect(null);
      }, 10);
    }
  }
  return (
    <View style={[styles.container, containerTextInputStyle]}>
      <TextInput
        selection={select}
        ref={textInputRef}
        autoFocus={isAutoFocus}
        onFocus={_handleFocus}
        onBlur={_handleBlur}
        placeholder={placeholder && t(placeholder)}
        value={value}
        style={flated}
        placeholderTextColor="#4A484F"
        onChangeText={text => onChangeText && onChangeText(text)}
        {...otherProps}
      />
    </View>
  );
}
let styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  input: {
    height: 56,
    backgroundColor: 'white',
    borderRadius: 10,
    fontSize: Sizes.size_16,
    paddingHorizontal: 10,
    fontFamily: fonts.fontFamilySecondaryMedium,
    color: Colors.textPrimary,
    textAlignVertical: 'center',
  },
});
export default TextInputComponent;
