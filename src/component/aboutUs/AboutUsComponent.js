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

export default function AboutUsComponent(props) {
  const {contentAboutUs} = props;
  const {colors} = useTheme();

  console.log('contentAboutUs===', contentAboutUs);

  return (
    <View style={styles.container}>
      <AppHeader
        style={[
          styles.container,
          {backgroundColor: colors.PRIMARY_BACKGROUND_COLOR},
        ]}>
        <StatusBar barStyle="dark-content" hidden={false} />
        <HeaderComponent
          title={'setting.aboutUs'}
          backIconColor={colors.BACK_ICON_COLOR}
        />
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          style={styles.mainContainer}>
          <Text>{contentAboutUs?.aboutUsTranslations?.[0]?.text}</Text>
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
});
