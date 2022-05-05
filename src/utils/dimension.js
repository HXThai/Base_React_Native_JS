/* eslint-disable prettier/prettier */
import {Dimensions} from 'react-native';

const myWidth = Dimensions.get('window').width;
const myHeight = Dimensions.get('window').height;

const relativeWidth = num => (myWidth * num) / 100;
const relativeHeight = num => (myHeight * num) / 100;

const persentlWidth = num => (myWidth / 100) * num;
const persentHeight = num => (myHeight / 100) * num;

export {
  relativeWidth,
  relativeHeight,
  myWidth,
  myHeight,
  persentlWidth,
  persentHeight,
};
