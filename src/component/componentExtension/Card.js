/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

const Card = ({
  style,
  children,
  shape,
  type,
  size,
  onPress,
  disabled,
  testID,
}) => {
  return (
    <TouchableOpacity
      testID={testID}
      onPress={() => onPress && onPress()}
      disabled={!onPress || disabled}
      style={[
        styles.container,
        type === 'shadow' && {
          shadowColor: '#212119',
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.32,
          shadowRadius: 5.46,
          elevation: 9,
        },
        type === 'outline' && {
          borderWidth: 1,
          borderColor: '#C0C0C0',
        },
        type === 'placeholder' && {
          backgroundColor: '#fbfbfb',
        },
        shape === 'br8' && {
          borderRadius: 8,
          paddingHorizontal: 16,
          paddingVertical: 24,
        },
        shape === 'br5' && {
          borderRadius: 5,
          paddingHorizontal: 16,
          paddingVertical: 24,
        },
        shape === 'circle' &&
          Boolean(size) && {
            width: size,
            height: size,
            borderRadius: (size || 0) / 2,
            justifyContent: 'center',
            alignItems: 'center',
          },
        style,
      ]}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
});
export default Card;
