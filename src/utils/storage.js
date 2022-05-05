/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_TOKEN = 'USER_TOKEN';
const AUTO_LOGIN = 'CHECK_AUTO_LOGIN';
const TYPE_ACCOUNT = 'TYPE_ACCOUNT';
const DARK_THEME = 'DARK_THEME';

export const logOut = async value => {
  try {
    await AsyncStorage.removeItem(`@${USER_TOKEN}:key`);
    await AsyncStorage.removeItem(`@${AUTO_LOGIN}:key`);
    await AsyncStorage.removeItem(`@${TYPE_ACCOUNT}:key`);
    return true;
  } catch (error) {
    return false;
  }
};

export const getUser = async () => {
  try {
    const value = await AsyncStorage.getItem(`@${USER_TOKEN}:key`);
    if (value !== null) {
      return value;
    }
    return false;
  } catch (error) {
    return false;
  }
};

export const getUserObject = async () => {
  try {
    const value = await AsyncStorage.getItem(`@${USER_TOKEN}:key`);
    if (value !== null) {
      return JSON.parse(value);
    }
    return false;
  } catch (error) {
    return false;
  }
};

export const getAutoLogin = async () => {
  try {
    const value = await AsyncStorage.getItem(AUTO_LOGIN);
    if (value !== null) {
      return JSON.parse(value);
    }
    return false;
  } catch (error) {
    return false;
  }
};

export const setAutoLogin = async value => {
  try {
    await AsyncStorage.setItem(AUTO_LOGIN, JSON.stringify(value));
    return true;
  } catch (error) {
    return false;
  }
};

export const saveDarkTheme = async isDarkTheme => {
  try {
    await AsyncStorage.setItem(`@${DARK_THEME}:key`, isDarkTheme);
  } catch (error) {}
};

export const getDarkTheme = async () => {
  try {
    const value = await AsyncStorage.getItem(`@${DARK_THEME}:key`);
    if (value) {
      return value;
    }
    return '';
  } catch (error) {
    return '';
  }
};
export const getValue = async key => {
  try {
    const value = await AsyncStorage.getItem(`${key}`);
    if (value) {
      return value;
    }
    return '';
  } catch (error) {
    return '';
  }
};
export const setValue = async (key, val) => {
  try {
    const value = await AsyncStorage.setItem(`${key}`, `${val}`);
    if (value) {
      return value;
    }
    return '';
  } catch (error) {
    return '';
  }
};
