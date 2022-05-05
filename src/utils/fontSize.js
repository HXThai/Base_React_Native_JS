/* eslint-disable prettier/prettier */
import {PixelRatio, Dimensions} from 'react-native';

export default FontSize = {
  fs_8: 8,
  fs_9: 9,
  fs_10: 10,
  fs_11: 11,
  fs_12: 12,
  fs_13: 13,
  fs_14: 14,
  fs_15: 15,
  fs_16: 16,
  fs_17: 17,
  fs_18: 18,
  fs_19: 19,
  fs_20: 20,
  fs_22: 22,
  fs_25: 25,
};

const {width, height} = Dimensions.get('window');
const realWidth = height > width ? width : height;

const isTablet = () => {
  let pixelDensity = PixelRatio.get();
  let adjustedWidth = width * pixelDensity;
  let adjustedHeight = height * pixelDensity;
  if (pixelDensity < 2 && (adjustedWidth >= 1000 || adjustedHeight >= 1000)) {
    return true;
  } else {
    return (
      pixelDensity === 2 && (adjustedWidth >= 1920 || adjustedHeight >= 1920)
    );
  }
};

const responsiveFontSize = fontSize => {
  let divider = isTablet() ? 600 : 375;
  return Math.round((fontSize * realWidth) / divider);
};

export const Sizes = {
  size_1: responsiveFontSize(1),
  size_2: responsiveFontSize(2),
  size_3: responsiveFontSize(3),
  size_4: responsiveFontSize(4),
  size_5: responsiveFontSize(5),
  size_6: responsiveFontSize(6),
  size_7: responsiveFontSize(7),
  size_8: responsiveFontSize(8),
  size_9: responsiveFontSize(9),
  size_10: responsiveFontSize(10),
  size_11: responsiveFontSize(11),
  size_12: responsiveFontSize(12),
  size_13: responsiveFontSize(13),
  size_14: responsiveFontSize(14),
  size_15: responsiveFontSize(15),
  size_16: responsiveFontSize(16),
  size_17: responsiveFontSize(17),
  size_18: responsiveFontSize(18),
  size_19: responsiveFontSize(19),
  size_20: responsiveFontSize(20),
  size_24: responsiveFontSize(24),
  size_25: responsiveFontSize(25),
  size_28: responsiveFontSize(28),
  size_30: responsiveFontSize(30),
  size_35: responsiveFontSize(35),
  size_40: responsiveFontSize(40),
  size_50: responsiveFontSize(50),
  size_60: responsiveFontSize(60),
};
