/* eslint-disable prettier/prettier */
import {Dimensions, Platform} from 'react-native';
import moment from 'moment';

export const checkNull = param => {
  if (!param) {
    return true;
  }
  const text = String(param);
  if (!text || text.trim() === '') {
    return true;
  }
  return false;
};

export const validateEmail = email => {
  const expression =
    /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
  return expression.test(String(email).toLowerCase());
};

export const validatePassword = data => {
  const expression = /[^a-zA-Z0-9]/;
  if (!data) {
    return 'passwordIsRequire';
  }
  if (data.length < 5) {
    return 'lengthErrorGreaterThan5';
  }
  if (data.length > 255) {
    return 'lengthErrorSmallerThan255';
  }
  if (!expression.test(data)) {
    return 'specialRequire';
  }
  return 'ok';
};
export const validateSpecialCharacter = data => {
  const expression = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  return expression.test(String(data));
};

export const validatePhone = phone => {
  if (!phone) {
    return false;
  }
  const phoneNum = phone.replace(/[^\d]/g, '');
  if (phoneNum.length > 9 && phoneNum.length < 13) {
    const phoneRegex =
      /^\+{0,2}([\-\. ])?(\(?\d{0,3}\))?([\-\. ])?\(?\d{0,3}\)?([\-\. ])?\d{3}([\-\. ])?\d{4}/;
    return phoneRegex.test(phone);
  }
  return false;
};

export const validateLink = link => {
  const expression =
    /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i;
  return !expression.test(String(link).toLowerCase());
};

export const verifyModelIphone = () => {
  const dim = Dimensions.get('window');
  if (Platform.OS === 'ios') {
    if (
      dim.height == 812 ||
      dim.height == 896 ||
      dim.width == 812 ||
      dim.width == 896
    ) {
      return true;
    }
  }
  return false;
};

export const formatDateTimeNews = date => {
  const _currentDay = new Date();
  let dateFormat = new Date(date);

  let lastNewsTime = moment(dateFormat).fromNow();

  if ((_currentDay.getTime() - dateFormat.getTime()) / 3600000 > 24) {
    lastNewsTime = moment(dateFormat).format('YYYY/MM/DD HH:mm');
  }

  return lastNewsTime;
};
