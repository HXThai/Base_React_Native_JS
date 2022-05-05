/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity, Platform} from 'react-native';
import {SocialIcon, FlagIcon} from '~/assets/icons';
import {Sizes, Colors, Fonts} from '~/utils';
import Button from '~/component/componentExtension/Button';
import {navigate} from '~/screen/NavigationService';
import {TextInputComponent, Text} from '~/component/componentExtension';
import SocialIconComponent from './SocialIconComponent';
import {useTheme, useIsFocused} from '@react-navigation/native';
import {Sizings} from '~/utils';
import {UserIcon, LockIcon} from '~/assets/icons';
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
import {useTranslation} from 'react-i18next';

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

function LoginComponent({
  onPressSocial,
  onPressFlag,
  onLoginPress,
  username,
  setUsername,
  password,
  setPassword,
  isValidateEmail,
  isValidatePassword,
  handleBlur,
  onFocus,
}) {
  const {colors} = useTheme();
  let isFocused = useIsFocused();
  let {i18n} = useTranslation();

  let [currentFlag, setcurrentFlag] = useState(mapFlag(i18n.language));
  let _onLoginPress = () => {
    onLoginPress && onLoginPress({username, password});
  };
  useEffect(
    _ => {
      if (isFocused) {
        onFocus && onFocus('Login');
      }
    },
    [isFocused],
  );
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: colors.PRIMARY_BACKGROUND_COLOR},
      ]}>
      <View>
        <View
          style={[
            styles.emailComponent,
            {backgroundColor: colors.PRIMARY_TEXTINPUT_COLOR},
          ]}>
          <View style={styles.icon}>
            <UserIcon color={'#676767'} />
          </View>
          <TextInputComponent
            onChangeText={_ => setUsername(String(_).trim())}
            value={username}
            placeholder={'login.email'}
            containerTextInputStyle={styles.containerInput}
            placeholderStyle={styles.placeholderStyle}
            textInputStyle={styles.textInputStyle}
            style={styles.input}
            handleBlur={_ => handleBlur && handleBlur('login.username')}
            numberOfLines={1}
            autoScrollToStart={Platform.OS === 'android' ? true : false}
          />
        </View>

        {isValidateEmail ? (
          <Text
            style={styles.inputInvalidate}
            secondary
            transKey={isValidateEmail}
          />
        ) : null}

        <View
          style={[
            styles.passwordComponent,
            {backgroundColor: colors.PRIMARY_TEXTINPUT_COLOR},
          ]}>
          <View style={styles.icon}>
            <LockIcon color={'#676767'} />
          </View>
          <TextInputComponent
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder={'general.password'}
            containerTextInputStyle={styles.containerInput}
            placeholderStyle={styles.placeholderStyle}
            textInputStyle={styles.textInputStyle}
            style={styles.input}
            handleBlur={_ => handleBlur && handleBlur('login.password')}
          />
        </View>

        {isValidatePassword ? (
          <Text
            style={styles.inputInvalidate}
            secondary
            transKey={isValidatePassword}
          />
        ) : null}
      </View>
      <Text
        style={styles.forgot}
        transKey={'forgot.forgotPassword'}
        onPress={_ => navigate('ForgotScreen')}
        primary
        MontserratBold
      />
      <Button
        title={'login.login'}
        onPress={_onLoginPress}
        titleStyle={styles.btn}
      />
      <View style={styles.viewTrialAccount}>
        <Text
          centered
          MontserratBold
          underline
          onPress={_ => {}}
          transKey={'login.trialAccount'}
        />
      </View>
      <View style={styles.lineLoginWith}>
        <Text
          noTextDarkTheme
          style={[styles.txtOrLanguage, {color: colors.SECONDARY_TEXT_COLOR}]}
          transKey={'login.or'}
        />
        <View style={styles.socialLine}>
          <SocialIconComponent
            style={styles.iconSocial}
            name={'gg'}
            onPressSocial={onPressSocial}
          />
          <SocialIconComponent
            style={styles.iconSocial}
            name={'fb'}
            onPressSocial={onPressSocial}
          />
        </View>
      </View>

      <Text
        MontserratBold
        fs14
        style={[styles.txtOrLanguage, {color: colors.SECONDARY_TEXT_COLOR}]}
        transKey={'general.language'}
      />
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
      </View>
    </View>
  );
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '80%',
    alignSelf: 'center',
    paddingVertical: 0,
    // justifyContent: 'space-around',
  },
  inputInvalidate: {
    fontSize: 12,
    marginTop: 5,
    alignSelf: 'flex-start',
  },
  forgot: {
    marginTop: 10,
    marginBottom: 30,
    alignSelf: 'flex-end',
  },
  txtOrLanguage: {
    alignSelf: 'center',
    marginVertical: 10,
  },
  emailComponent: {
    backgroundColor: 'white',
    borderRadius: 10,
    flexDirection: 'row',
    height: 55,
    alignItems: 'center',
    marginTop: 5,
    // marginBottom: 10,
    width: Sizings.percent_100,
  },
  passwordComponent: {
    backgroundColor: 'white',
    borderRadius: 10,
    flexDirection: 'row',
    height: 55,
    alignItems: 'center',
    marginTop: 20,
    // marginBottom: 10,
    width: Sizings.percent_100,
  },

  textInputStyle: {
    color: Colors.textPrimary,
    fontSize: 12,
    fontFamily: Fonts.fontFamilyPrimaryMedium,
  },
  placeholderStyle: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontFamily: Fonts.fontFamilyPrimaryMedium,
  },

  icon: {
    paddingHorizontal: 15,
    width: Sizings.percent_10,
  },
  containerInput: {
    paddingLeft: 5,
    width: Sizings.percent_85,
  },
  input: {
    width: Sizings.percent_100,
    overflow: 'scroll',
  },
  viewTrialAccount: {
    marginVertical: 15,
  },
  lineLoginWith: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 30,
  },
  socialLine: {
    flexDirection: 'row',
    marginRight: 10,
    marginLeft: 5,
    overflow: 'visible',
    // marginHorizontal: 100,
  },
  iconSocial: {
    marginHorizontal: 7,
    overflow: 'visible',
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
  btn: {
    fontFamily: Fonts.fontFamilyPrimaryBold,
    fontSize: 18,
  },
});
export default LoginComponent;
