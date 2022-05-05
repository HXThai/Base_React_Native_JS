import React from 'react';
import {StyleSheet, TouchableOpacity, Keyboard} from 'react-native';
import * as Colors from '~/utils/Colors';
import Text from './Text';

const Button = ({
  onPress,
  title,
  disabled,
  titleStyle,
  buttonStyle,
  testID,
  rounded,
  hasBorder,
  borderColor = Colors.colorBottomGray,
  noBackground,
  xlarge,
  large,
  medium,
  small,
  xsmall,
  mv5,
  buttonComponent,
  hiddenKeyboardOnPress = true,
}) => {
  const _onPress = () => {
    if (hiddenKeyboardOnPress) {
      Keyboard.dismiss();
    }
    onPress && onPress();
  };
  return (
    <TouchableOpacity
      testID={testID}
      style={[
        styles.buttonContainer,
        rounded && styles.rounded,
        hasBorder && styles.border,
        hasBorder && {borderColor: borderColor},
        noBackground && styles.noBackground,
        xlarge && {height: 60},
        large && {height: 56},
        medium && {height: 51},
        small && {height: 40},
        mv5 && {marginVertical: 5},
        xsmall && {height: 24},
        buttonStyle,
      ]}
      onPress={_onPress}
      disabled={disabled}>
      {buttonComponent}
      <Text fs17 white MontserratSB style={titleStyle} transKey={title} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    borderRadius: 30,
    backgroundColor: Colors.primaryColor,
    paddingHorizontal: 20,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    width: '100%',
  },
  icon: {
    paddingRight: 8,
  },
  rounded: {width: 50, height: 50, borderRadius: 50},
  border: {
    borderWidth: 2,
    backgroundColor: Colors.transparent,
  },
  noBackground: {borderWidth: 0, backgroundColor: Colors.transparent},
});

export default Button;
