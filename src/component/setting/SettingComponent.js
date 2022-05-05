/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import * as Colors from '~/utils/Colors';
import {StyleSheet, View, StatusBar} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {
  Text,
  HeaderComponent,
  AppHeader,
  Card,
} from '~/component/componentExtension';
import sizings from '~/utils/sizings';
import {
  LightModeIcon,
  DarkModeIcon,
  FlagIcon,
  CheckedIcon,
  UncheckIcon,
} from '~/assets/icons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default function SettingComponent(props) {
  const {
    isDayMode,
    handleChangeMode,
    onPressCardLanguage,
    itemSelected,
    dataLanguage,
  } = props;
  const {colors} = useTheme();

  return (
    <View style={styles.container}>
      <AppHeader
        style={[
          styles.container,
          {backgroundColor: colors.PRIMARY_BACKGROUND_COLOR},
        ]}>
        <StatusBar barStyle="dark-content" hidden={false} />
        <HeaderComponent
          title={'setting.header'}
          backIconColor={colors.BACK_ICON_COLOR}
        />
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          style={styles.mainContainer}>
          <Text transKey={'setting.appTheme'} MontserratBold fs17 mgt10 />
          <Card
            onPress={() => handleChangeMode(true)}
            style={[
              styles.styleCard,
              {
                borderColor: isDayMode
                  ? colors.PRIMARY_BUTTON_COLOR
                  : 'transparent',
              },
            ]}>
            <LightModeIcon color={colors.PRIMARY_BUTTON_COLOR} />
            <Text
              transKey={'setting.dayMode'}
              style={[styles.styleText, {color: colors.PRIMARY_BUTTON_COLOR}]}
              fs24
              PoppinsMedium
            />
          </Card>
          <Card
            onPress={() => handleChangeMode(false)}
            style={[
              styles.styleCardDarkMode,
              {
                backgroundColor: Colors.bgCardDarkMode,
                borderColor: !isDayMode
                  ? colors.PRIMARY_BUTTON_COLOR
                  : 'transparent',
              },
            ]}>
            <DarkModeIcon />
            <Text
              transKey={'setting.nightMode'}
              style={[styles.styleText, {color: Colors.textColorCardDarkMode}]}
              fs24
              PoppinsMedium
            />
          </Card>
          <Text
            transKey={'setting.language'}
            style={{marginBottom: 15}}
            MontserratBold
            fs17
          />
          {dataLanguage.map((item, index) => {
            return (
              <Card
                key={index}
                onPress={() => onPressCardLanguage(index)}
                style={[
                  index === 0
                    ? styles.styleCardTop
                    : index === dataLanguage.length - 1
                    ? styles.styleCardBot
                    : styles.cardLanguage,
                ]}>
                <View style={{marginRight: 15}}>
                  {itemSelected === index ? <CheckedIcon /> : <UncheckIcon />}
                </View>
                <View style={{marginRight: 15}}>
                  <FlagIcon country={item.country} />
                </View>
                <Text noTextDarkTheme fs17 MontserratMedium>
                  {item.language}
                </Text>
              </Card>
            );
          })}
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
    marginTop: 15,
    borderWidth: 2,
  },
  styleCardDarkMode: {
    borderRadius: 20,
    width: sizings.percent_100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 30,
    marginTop: 20,
    marginBottom: 15,
    borderWidth: 2,
  },
  styleText: {
    marginRight: 30,
  },
  cardLanguage: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: Colors.colorBorder,
    flexDirection: 'row',
    alignItems: 'center',
  },
  styleCardTop: {
    padding: 15,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomWidth: 1,
    borderColor: Colors.colorBorder,
    flexDirection: 'row',
    alignItems: 'center',
  },
  styleCardBot: {
    padding: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
});
