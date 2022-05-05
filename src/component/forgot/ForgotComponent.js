/* eslint-disable prettier/prettier */
import React, {useContext, useState} from 'react';
import {StyleSheet, View, StatusBar, TextInput} from 'react-native';
import AppHeader from '~/component/componentExtension/AppHeader';
import {
  Text,
  HeaderComponent,
  Button,
  TextInputComponent,
} from '~/component/componentExtension';
import EmailIcon from '~/assets/icons/emailIcon';
import {Sizings, Colors, Fonts} from '~/utils';
import {useTheme} from '@react-navigation/native';
import {Sizes} from '~/utils/fontSize';

export default function ForgotComponent({
  onSendCode,
  email,
  onEmailChange,
  validateEmail,
}) {
  const {colors} = useTheme();
  let _onSendCode = () => {
    onSendCode && onSendCode({email});
  };
  return (
    <AppHeader
      style={[
        styles.container,
        {backgroundColor: colors.PRIMARY_BACKGROUND_COLOR},
      ]}>
      <StatusBar hidden={false} backgroundColor={Colors.Teal_Blue} />
      <HeaderComponent title={'general.forgotPassword'} />
      <View style={styles.main}>
        <Text fs36 MontserratBold transKey={'forgot.forgotPassword2line'} />
        <View
          style={[
            styles.emailComponent,
            {backgroundColor: colors.PRIMARY_TEXTINPUT_COLOR},
          ]}>
          <View style={styles.EmailIcon}>
            <EmailIcon color={Colors.textPrimary} />
          </View>
          <TextInputComponent
            placeholderTextColor={Colors.textPrimary}
            placeholder="forgot.inputEmailPlaceholder"
            containerTextInputStyle={styles.containerInput}
            textInputStyle={styles.input}
            value={email}
            onChangeText={_ => onEmailChange(String(_).trim())}
          />
        </View>
        {validateEmail ? (
          <Text secondary mb10 fs12 transKey={validateEmail} />
        ) : null}
        <Text secondary>
          {'* '}
          <Text fs12 Montserrat transKey={'forgot.sendEmailDescription'} />
        </Text>

        <View style={styles.button}>
          <Button
            buttonStyle={styles.styleBtn}
            title={'forgot.sendCode'}
            onPress={_onSendCode}
            titleStyle={styles.btn}
          />
        </View>
      </View>
    </AppHeader>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    flex: 1,
    width: Sizings.percent_80,
    alignSelf: 'center',
    paddingTop: 20,
  },
  emailComponent: {
    backgroundColor: 'white',
    borderRadius: 10,
    flexDirection: 'row',
    height: 55,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
    width: Sizings.percent_100,
  },
  EmailIcon: {
    paddingHorizontal: 10,
    width: Sizings.percent_10,
    paddingLeft: 15,
  },
  containerInput: {
    width: Sizings.percent_90,
  },
  input: {
    width: Sizings.percent_100,
    overflow: 'scroll',
    fontSize: Sizes.size_12,
    fontFamily: Fonts.fontFamilyPrimaryRegular,
    color: Colors.textPrimary,
  },
  button: {
    marginVertical: 15,
  },
  styleBtn: {
    fontFamily: Fonts.fontFamilyPrimaryBold,
    fontSize: Sizes.size_18,
    marginTop: 10,
  },
  btn: {
    fontFamily: Fonts.fontFamilyPrimaryBold,
    fontSize: 18,
  },
});
