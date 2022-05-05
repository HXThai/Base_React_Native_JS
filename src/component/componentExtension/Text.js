/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {StyleSheet, Text as RNText} from 'react-native';
import * as Colors from '~/utils/Colors';
import fonts from '~/utils/font';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import alpha from 'color-alpha';
const Text = props => {
  const {colors} = useTheme();
  const {
    style,
    fs8,
    fs10,
    fs12,
    fs14,
    fs16,
    fs17,
    fs18,
    fs20,
    fs24,
    fs26,
    fs34,
    fs36,
    fs46,
    primary,
    secondary,
    tertiary,
    title,
    error,
    greenBland,
    white,
    pink,
    gray,
    Montserrat,
    MontserratThin,
    MontserratMedium,
    MontserratSB,
    MontserratBold,
    PoppinsSB,
    Poppins,
    PoppinsThin,
    PoppinsMedium,
    PoppinsBold,
    elevated,
    centered,
    noTextDarkTheme,
    flex,
    mgt5,
    mgt10,
    mb5,
    mb10,
    mh5,
    mh10,
    mv5,
    mv10,
    ml5,
    mr5,
    underline,
    transKey,
    children,
    ...otherProps
  } = props;
  let {t} = useTranslation();
  let translated = transKey ? t(transKey) : null;
  let [opacity, setopacity] = useState(!1);
  let onPressIn = () => {
    // console.log('onPressIn', transKey);
    setopacity(1);
  };
  let onPressOut = () => {
    // console.log('onPressOut', transKey);
    setopacity(!1);
  };
  let flated = StyleSheet.flatten([
    {color: noTextDarkTheme ? '#424242' : colors.PRIMARY_TEXT_COLOR},
    styles.text,
    fs8 && {fontSize: 8},
    fs10 && {fontSize: 10},
    fs12 && {fontSize: 12},
    fs14 && {fontSize: 14},
    fs16 && {fontSize: 16},
    fs17 && {fontSize: 17},
    fs18 && {fontSize: 18},
    fs20 && {fontSize: 20},
    fs24 && {fontSize: 24},
    fs26 && {fontSize: 26},
    fs34 && {fontSize: 34},
    fs36 && {fontSize: 36},
    fs46 && {fontSize: 46},
    mgt5 && {marginTop: 5},
    mgt10 && {marginTop: 10},
    mb5 && {marginBottom: 5},
    mb10 && {marginBottom: 10},
    mh5 && {marginHorizontal: 5},
    mh10 && {marginHorizontal: 10},
    mv5 && {marginVertical: 5},
    mv10 && {marginVertical: 10},
    ml5 && {marginLeft: 5},
    mr5 && {marginRight: 5},
    primary && {color: Colors.textPrimary},
    secondary && {color: Colors.textSecondary},
    tertiary && {color: Colors.textTertiary},
    title && {color: Colors.textPrimary},
    error && {color: Colors.RED},
    greenBland && {color: Colors.greenBland},
    white && {color: Colors.WHITE},
    pink && {color: Colors.pink},
    gray && {color: Colors.GRAY},
    Montserrat && {fontFamily: fonts.fontFamilyPrimaryRegular},
    MontserratThin && {fontFamily: fonts.fontFamilyPrimaryThin},
    MontserratMedium && {fontFamily: fonts.fontFamilyPrimaryMedium},
    MontserratSB && {fontFamily: fonts.fontFamilyPrimarySemiBold},
    MontserratBold && {fontFamily: fonts.fontFamilyPrimaryBold},
    PoppinsSB && {fontFamily: fonts.fontFamilySecondarySemiBold},
    Poppins && {fontFamily: fonts.fontFamilySecondaryRegular},
    PoppinsThin && {fontFamily: fonts.fontFamilySecondaryThin},
    PoppinsBold && {fontFamily: fonts.fontFamilySecondaryBold},
    PoppinsMedium && {fontFamily: fonts.fontFamilySecondaryMedium},
    elevated && styles.shadow,
    centered && {textAlign: 'center'},
    flex && {flex: 1},
    underline && {textDecorationLine: 'underline'},
    style,
  ]);
  if (flated?.color && opacity) {
    flated.color = alpha(flated?.color, 0.4);
  }
  return (
    <RNText
      allowFontScaling={false}
      style={flated}
      {...otherProps}
      onPressIn={onPressIn}
      onPressOut={onPressOut}>
      {children}
      {translated}
    </RNText>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: fonts.fontFamilyPrimaryRegular,
    fontSize: 14,
  },
  shadow: {
    textShadowColor: Colors.textPrimary,
    textShadowOffset: {
      width: 0,
      height: 1,
    },
    textShadowRadius: 4,
  },
});

Text.defaultProps = {
  children: null,
  style: [],
  fs10: false,
  fs12: false,
  fs14: false,
  fs16: false,
  fs20: false,
  fs26: false,
  primary: false,
  secondary: false,
  title: false,
  elevated: false,
  centered: false,
  flex: false,
  underline: false,
};

export default Text;
