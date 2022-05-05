import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {SocialIcon} from '~/assets/icons';
import {useTheme} from '@react-navigation/native';
import {persentHeight, persentlWidth} from '~/utils';
import {TextInputComponent, Text} from '~/component/componentExtension';
import FastImage from 'react-native-fast-image';
import {Logo} from '~/assets/images';
const LogoComponent = ({showText = false}) => {
  const {colors} = useTheme();

  return (
    <View>
      <View
        style={[
          styles.header,
          {backgroundColor: colors.PRIMARY_BACKGROUND_COLOR},
        ]}>
        {showText ? (
          <Text
            style={styles.logoText}
            MontserratBold
            fs24
            transKey={'general.welcome'}
          />
        ) : (
          <View style={styles.logoView}>
            <FastImage
              style={styles.logo}
              resizeMode={FastImage.resizeMode.contain}
              source={Logo}
            />
          </View>
        )}
      </View>
    </View>
  );
};
export default LogoComponent;
let styles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
    height: persentHeight(25),
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontWeight: '800',
  },
  logoView: {
    height: 45,
    width: 180,
    justifyContent: 'center',
  },
  logo: {
    height: 42,
  },
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  tab: {
    height: 600,
    flex: 1,
  },
});
