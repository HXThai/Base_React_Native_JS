import React, {useEffect, useState, useContext} from 'react';
import TermOfServiceComponent from '~/component/termOfService/TermOfService';
import {PreferencesContext} from '../../../PreferencesContext';
import {saveDarkTheme, getDarkTheme} from '~/utils/storage';
import {useTranslation} from 'react-i18next';

function TermOfServiceScreen(props) {
  const {navigation} = props;
  let {i18n} = useTranslation();

  let onPressFlag = country => {
    console.log({country});
    switch (country) {
      case 'uk':
        i18n.changeLanguage('en');
        return;
      case 'jp':
        i18n.changeLanguage('ja');
        return;
      case 'vn':
      default:
        i18n.changeLanguage('vi');
        return;
    }
  };

  return <TermOfServiceComponent onPressFlag={onPressFlag} />;
}

export default TermOfServiceScreen;
