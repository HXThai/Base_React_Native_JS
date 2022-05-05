/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import * as Colors from '~/utils/Colors';
import {StyleSheet, View, StatusBar, TouchableOpacity} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Text, HeaderComponent, AppHeader} from '~/component/componentExtension';
import sizings from '~/utils/sizings';
import {useTranslation} from 'react-i18next';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {FlagIcon} from '~/assets/icons';

const mapFlag = lang => {
  switch (lang) {
    case 'en':
      return 'uk';
    case 'vi':
      return 'vn';
    case 'ja':
      return 'jp';
    default:
      return 'uk';
  }
};

function FlagIconComponent({country, onPressFlag, isChoose}) {
  let _onPress = () => {
    onPressFlag && onPressFlag(country);
  };
  return (
    <TouchableOpacity style={styles.flagTouch} onPress={_onPress}>
      {!isChoose && <View style={styles.overlayFlag} />}
      <FlagIcon style={styles.flag} country={country} />
    </TouchableOpacity>
  );
}

export default function TermOfServiceComponent(props) {
  const {onPressFlag} = props;
  const {colors} = useTheme();
  let {i18n} = useTranslation();
  let [currentFlag, setcurrentFlag] = useState(mapFlag(i18n.language));

  return (
    <View style={styles.container}>
      <AppHeader
        style={[
          styles.container,
          {backgroundColor: colors.PRIMARY_BACKGROUND_COLOR},
        ]}>
        <StatusBar barStyle="dark-content" hidden={false} />
        <HeaderComponent
          title={'term.termTitle'}
          backIconColor={colors.BACK_ICON_COLOR}
        />
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          style={styles.mainContainer}>
          {/* <Text style={{marginBottom: 20}} MontserratBold fs14 centered>
            {i18n.t('setting.language')}
          </Text>
          <View style={styles.iconLine}>
            <FlagIconComponent
              isChoose={currentFlag === 'uk'}
              country={'uk'}
              onPressFlag={_ => {
                setcurrentFlag('uk');
                onPressFlag && onPressFlag('uk');
              }}
            />
            <FlagIconComponent
              isChoose={currentFlag === 'vn'}
              country={'vn'}
              onPressFlag={_ => {
                setcurrentFlag('vn');
                onPressFlag && onPressFlag('vn');
              }}
            />
            <FlagIconComponent
              isChoose={currentFlag === 'jp'}
              country={'jp'}
              onPressFlag={_ => {
                setcurrentFlag('jp');
                onPressFlag && onPressFlag('jp');
              }}
            />
          </View> */}
          <Text style={{marginTop: 20}} fs12 Montserrat>
            {i18n.t('term.firstTerm')}
          </Text>
          <Text mgt10 fs12 Montserrat>
            {i18n.t('term.secondTerm')}
          </Text>
          <Text mgt10 fs12 Montserrat>
            {i18n.t('term.thirdTerm')}
          </Text>
        </KeyboardAwareScrollView>
      </AppHeader>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: 30,
  },
  styleCard: {
    borderRadius: 20,
    width: sizings.percent_100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 30,
    marginTop: 40,
    borderWidth: 2,
  },
  iconLine: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 30,
    marginVertical: 10,
  },
  flagTouch: {
    width: 34,
    height: 34,
  },
  overlayFlag: {
    zIndex: 40,
    backgroundColor: '#ffffff70',
    position: 'absolute',
    top: 5.31,
    left: 0,
    width: 34,
    height: 23.38,
    borderRadius: 5,
  },
  flag: {
    zIndex: 10,
  },
});
