/* eslint-disable prettier/prettier */
import * as RNLocalize from 'react-native-localize';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './locales/en.js';
import vi from './locales/vi.js';
import ja from './locales/ja.js';
const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: cb => {
    let locales = RNLocalize.getLocales();
    if (Array.isArray(locales)) {
      cb(locales[0].languageCode);
    } else {
      cb('vi');
    }
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'vi',
    debug: false,
    compatibilityJSON: 'v3',
    resources: {
      en: {
        translation: en,
      },
      vi: {
        translation: vi,
      },
      ja: {
        translation: ja,
      },
    },
  });

export default i18n;
