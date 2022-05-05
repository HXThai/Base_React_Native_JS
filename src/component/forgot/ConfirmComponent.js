/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {StyleSheet, View, StatusBar, TouchableOpacity} from 'react-native';
import AppHeader from '~/component/componentExtension/AppHeader';
import {Text, HeaderComponent, Button} from '~/component/componentExtension';
import {Sizings, Colors, Fonts} from '~/utils';
import {TextInputComponent} from '~/component/componentExtension';
import {useTheme} from '@react-navigation/native';
import fonts from '~/utils/font';
import {Sizes} from '~/utils/fontSize';

export default function ConfirmComponent({
  onPressConfirm,
  code,
  setCode,
  password,
  confirmPass,
  setPassword,
  setConfirmPass,
  handleBack,
  validate,
  handleBlur,
  onResend,
  countDown,
  isDisableResend,
}) {
  let _onPressConfirm = () => {
    onPressConfirm && onPressConfirm();
  };
  let {codeValidate, passwordValidate, confirmPasswordValidate} = validate;
  const {colors} = useTheme();
  return (
    <AppHeader
      style={[
        styles.container,
        {backgroundColor: colors.PRIMARY_BACKGROUND_COLOR},
      ]}>
      <StatusBar hidden={false} backgroundColor={Colors.Teal_Blue} />
      <HeaderComponent
        customHandleBack={handleBack}
        title={'general.forgotPassword'}
      />
      <View style={styles.main}>
        <Text fs36 MontserratBold transKey={'forgot.forgotPassword2line'} />
        <View style={styles.line}>
          <TextInputComponent
            textInputStyle={styles.enterTheCodeStyle}
            placeholderStyle={styles.enterTheCodeStyle}
            placeholderTextColor={Colors.textPrimary}
            value={code}
            onChangeText={_ => setCode(String(_).replace(/[^0-9.]/, ''))}
            containerTextInputStyle={styles.input}
            keyboardType={'numeric'}
            maxLength={6}
            placeholder={'forgot.enterYourCode'}
            onBlur={_ => handleBlur && handleBlur('forgot.code')}
          />

          <View style={styles.resend}>
            <Text fs16 tertiary Poppins transKey={'forgot.notReceived'} />
            <TouchableOpacity
              disabled={isDisableResend}
              style={styles.resendcd}
              onPress={onResend}>
              <Text
                style={{opacity: isDisableResend ? 0.5 : 1}}
                fs16
                MontserratBold
                secondary
                transKey={'forgot.resend'}
              />
              {countDown && countDown > 0 ? (
                <Text fs12 Montserrat>{` ( ${countDown}s )`}</Text>
              ) : null}
            </TouchableOpacity>
          </View>
        </View>
        {codeValidate ? <Text secondary fs12 transKey={codeValidate} /> : null}
        <TextInputComponent
          textInputStyle={styles.stylePassword}
          placeholderStyle={styles.stylePassword}
          placeholderTextColor={Colors.textPrimary}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholder={'forgot.newPassword'}
          onBlur={_ => handleBlur && handleBlur('forgot.newPassword')}
          maxLength={254}
        />
        {passwordValidate ? (
          <Text secondary fs12 transKey={passwordValidate} />
        ) : null}
        <TextInputComponent
          textInputStyle={styles.stylePassword}
          placeholderStyle={styles.stylePassword}
          placeholderTextColor={Colors.textPrimary}
          secureTextEntry
          value={confirmPass}
          onChangeText={setConfirmPass}
          placeholder={'forgot.confirmNewPassword'}
          onBlur={_ => handleBlur && handleBlur('forgot.confirmNewPassword')}
          maxLength={254}
        />
        {confirmPasswordValidate ? (
          <Text secondary fs12 transKey={confirmPasswordValidate} />
        ) : null}

        <View style={styles.button}>
          <Button
            buttonStyle={styles.styleBtn}
            onPress={_onPressConfirm}
            title={'forgot.confirm'}
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
  line: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
  },
  input: {
    width: Sizings.percent_50,
  },
  resend: {
    paddingHorizontal: 20,
    width: Sizings.percent_50,
  },
  resendcd: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    marginVertical: 20,
  },
  enterTheCodeStyle: {
    fontSize: Sizes.size_12,
    color: Colors.textPrimary,
    fontFamily: fonts.fontFamilyPrimaryMedium,
  },
  stylePassword: {
    fontSize: Sizes.size_12,
    color: Colors.textPrimary,
    fontFamily: fonts.fontFamilyPrimaryMedium,
  },
  styleBtn: {
    fontFamily: fonts.fontFamilyPrimaryBold,
    fontSize: Sizes.size_18,
  },
  btn: {
    fontFamily: Fonts.fontFamilyPrimaryBold,
    fontSize: 18,
  },
});
