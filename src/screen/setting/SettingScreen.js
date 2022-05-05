import React, {useEffect, useState, useContext} from 'react';
import SettingComponent from '~/component/setting/SettingComponent';
import {PreferencesContext} from '../../../PreferencesContext';
import {saveDarkTheme, getDarkTheme} from '~/utils/storage';
import {useTranslation} from 'react-i18next';

function SettingScreen(props) {
  const {navigation} = props;

  const [itemSelected, setItemSelected] = useState(0);

  const dataLanguage = [
    {
      id: 0,
      language: 'Viet Nam',
      country: 'vn',
      langCode: 'vi',
    },
    {
      id: 1,
      language: 'UK',
      country: 'uk',
      langCode: 'en',
    },
    {
      id: 2,
      language: 'Japan',
      country: 'jp',
      langCode: 'ja',
    },
  ];

  let {i18n} = useTranslation();

  console.log('language====', i18n.language);

  const [isDayMode, setIsDayMode] = useState(true);

  const {toggleTheme, isThemeDark} = useContext(PreferencesContext);

  const onPressCardLanguage = index => {
    setItemSelected(index);
    i18n.changeLanguage(dataLanguage[index].langCode);
  };

  const handleChangeMode = dayMode => {
    if (dayMode) {
      setIsDayMode(true);
      toggleTheme(false);
      saveDarkTheme('dayMode');
    } else {
      setIsDayMode(false);
      toggleTheme(true);
      saveDarkTheme('darkMode');
    }
  };

  useEffect(() => {
    getTheme();
  }, []);

  const getTheme = async () => {
    const typeTheme = await getDarkTheme();
    if (typeTheme == 'dayMode') {
      setIsDayMode(true);
    } else {
      setIsDayMode(false);
    }
  };

  return (
    <SettingComponent
      toggleTheme={toggleTheme}
      handleChangeMode={handleChangeMode}
      isDayMode={isDayMode}
      itemSelected={itemSelected}
      onPressCardLanguage={onPressCardLanguage}
      dataLanguage={dataLanguage}
    />
  );
}

export default SettingScreen;
