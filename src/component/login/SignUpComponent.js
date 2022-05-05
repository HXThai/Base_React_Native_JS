/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import Text from '~/component/componentExtension/Text';
import {Colors, persentlWidth, Fonts} from '~/utils';
import {navigate} from '~/screen/NavigationService';
import {TextInputComponent, Button} from '~/component/componentExtension';
import SocialIconComponent from './SocialIconComponent';
import {useIsFocused} from '@react-navigation/native';
function SignUpComponent({
  onPressSocial,
  onPressSignup,
  first,
  setFirst,
  last,
  setLast,
  email,
  setEmail,
  pass,
  setPass,
  confirmPass,
  setConfirmPass,
  registerValidate,
  handleBlur,
  onFocus,
  onPressTerm,
}) {
  let _onPressSignup = () => {
    onPressSignup && onPressSignup({first, last, email, pass, confirmPass});
  };
  let isFocused = useIsFocused();

  useEffect(
    _ => {
      if (isFocused) {
        onFocus && onFocus('SignUp');
      }
    },
    [isFocused],
  );
  let {nameValidate, emailValidate, passwordValidate, confirmPasswordValidate} =
    registerValidate;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text primary fs36 MontserratBold transKey={'signup.register'} />
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
      <View style={styles.space} />
      <View>
        <View style={styles.inputLine}>
          <View style={styles.inputHalf}>
            <TextInputComponent
              containerTextInputStyle={styles.input}
              placeholderStyle={styles.placeholderStyle}
              textInputStyle={styles.textInputStyle}
              value={first}
              onChangeText={setFirst}
              placeholder={'signup.firstName'}
              handleBlur={_ => handleBlur && handleBlur('signup.firstname')}
              maxLength={35}
            />
          </View>
          <View style={{width: persentlWidth(5)}} />
          <View style={styles.inputHalf}>
            <TextInputComponent
              containerTextInputStyle={styles.input}
              placeholderStyle={styles.placeholderStyle}
              textInputStyle={styles.textInputStyle}
              value={last}
              onChangeText={setLast}
              placeholder={'signup.lastName'}
              handleBlur={_ => handleBlur && handleBlur('signup.lastname')}
              maxLength={35}
            />
          </View>
        </View>
        {nameValidate ? (
          <Text mgt5 secondary style={styles.forgot} transKey={nameValidate} />
        ) : null}
        <View style={styles.space} />
        <TextInputComponent
          containerTextInputStyle={styles.input}
          placeholderStyle={styles.placeholderStyle}
          textInputStyle={styles.textInputStyle}
          value={email}
          onChangeText={setEmail}
          placeholder={'general.email'}
          handleBlur={_ => handleBlur && handleBlur('signup.email')}
        />
        {emailValidate ? (
          <Text mgt5 secondary style={styles.forgot} transKey={emailValidate} />
        ) : null}
        <View style={styles.space} />
        <TextInputComponent
          containerTextInputStyle={styles.input}
          placeholderStyle={styles.placeholderStyle}
          textInputStyle={styles.textInputStyle}
          value={pass}
          secureTextEntry
          onChangeText={setPass}
          placeholder={'general.password'}
          maxLength={255}
          handleBlur={_ => handleBlur && handleBlur('signup.password')}
        />
        {passwordValidate ? (
          <Text
            mgt5
            secondary
            style={styles.forgot}
            transKey={passwordValidate}
          />
        ) : null}
        <View style={styles.space} />
        <TextInputComponent
          containerTextInputStyle={styles.input}
          placeholderStyle={styles.placeholderStyle}
          textInputStyle={styles.textInputStyle}
          value={confirmPass}
          secureTextEntry
          onChangeText={setConfirmPass}
          placeholder={'general.confirmPassword'}
          maxLength={255}
          handleBlur={_ => handleBlur && handleBlur('signup.confirmPassword')}
        />
        {confirmPasswordValidate ? (
          <Text
            mgt5
            secondary
            style={styles.forgot}
            transKey={confirmPasswordValidate}
          />
        ) : null}
      </View>
      <View style={styles.space} />
      <View style={styles.line}>
        <View style={styles.half}>
          <Button
            titleStyle={styles.btn}
            title={'general.signup'}
            onPress={_onPressSignup}
          />
        </View>
        <View style={styles.halfText}>
          <Text>
            <Text tertiary fs16 transKey={'signup.hasAccount'} />
            <Text
              fs16
              onPress={_ => {
                navigate('LoginPartScreen');
              }}
              MontserratBold
              secondary
              primary
              transKey={'general.login'}
            />
          </Text>
        </View>
      </View>
      <View style={styles.space} />
      <Text centered>
        <Text fs12 MontserratSB transKey={'signup.agreeTerm'} />
        <Text
          onPress={onPressTerm}
          fs12
          MontserratSB
          secondary
          transKey={'signup.term'}
        />
      </Text>
    </View>
  );
}

let styles = StyleSheet.create({
  container: {
    width: '80%',
    alignSelf: 'center',
    flex: 1,
    paddingBottom: 10,
    // justifyContent: 'space-around',
  },
  header: {
    // borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  line: {
    flexDirection: 'row',
    width: '100%',
  },
  space: {
    width: persentlWidth(5),
    height: persentlWidth(5),
  },
  socialLine: {
    // borderWidth: 1,
    flexDirection: 'row',
    marginRight: 10,
    overflow: 'visible',
  },
  iconSocial: {
    marginHorizontal: 7,
    overflow: 'visible',
  },
  inputLine: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    // borderWidth: 1,
  },
  inputHalf: {
    justifyContent: 'center',
    flex: 1,
    // width: '45%',
  },
  input: {
    marginVertical: 0,
    // color: Colors.textSecondary,
    // borderWidth: 1,
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
  half: {
    justifyContent: 'center',
    flex: 1,
    // width: '50%',
  },
  halfText: {
    justifyContent: 'center',
    width: '50%',
    flex: 1,
    // paddingLeft: 5,
    paddingHorizontal: 10,
    // alignItems: 'flex-end',
    // flexDirection: 'row',
    // flexWrap: 'wrap',
  },
  btn: {
    fontFamily: Fonts.fontFamilyPrimaryBold,
    fontSize: 18,
  },
  forgot: {
    fontSize: 12,
  },
  txtOrLanguage: {
    color: Colors.textPrimary,
    fontSize: 20,
  },
  termView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default SignUpComponent;
