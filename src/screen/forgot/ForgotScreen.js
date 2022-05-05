/* eslint-disable curly */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {StyleSheet, Alert, Keyboard} from 'react-native';
import ForgotComponent from '~/component/forgot/ForgotComponent';
import ConfirmComponent from '~/component/forgot/ConfirmComponent';
import AppHeader from '~/component/componentExtension/AppHeader';
import {
  forgotConfirmAction,
  forgotRequestAction,
} from '~/reduxSaga/actions/authAction';
import {loadingAction} from '~/reduxSaga/actions/loadingAction';
import {validateEmail, validatePassword} from '~/utils/validate';
import {useTranslation} from 'react-i18next';
import {ResponseCode} from '~/utils/constant';

import {useDispatch} from 'react-redux';
import {navigate} from '../NavigationService';
import {useCountDown} from '~/component/customHook';

function ForgotScreen({}) {
  const dispatch = useDispatch();
  let {i18n} = useTranslation();

  const [email, setEmail] = useState('');
  const [emailVal, setEmailVal] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [confirmValidate, setConfirmValidate] = useState({
    codeValidate: '',
    passwordValidate: '',
    confirmPasswordValidate: '',
  });
  const [isDisableResend, setIsDisableResend] = useState(false);
  let {number: numberCD, reset, stop: stopCD} = useCountDown();

  useEffect(() => {
    if (numberCD > 0) {
      setIsDisableResend(true);
    } else {
      setIsDisableResend(false);
    }
  }, [numberCD]);

  const [step, setStep] = useState(1);
  let onSendCode = () => {
    Keyboard.dismiss();
    dispatch(loadingAction(true));
    if (!email) {
      setEmailVal('forgot.emailIsRequire');
      dispatch(loadingAction(false));
      return;
    } else if (!validateEmail(email)) {
      setEmailVal('forgot.invalidEmail');
      dispatch(loadingAction(false));
      return;
    } else {
      setEmailVal('');
    }
    const params = {
      email: email,
    };
    dispatch(
      forgotRequestAction(params, onForgotRequestSuccess, onRequestError),
    );
  };

  let updateConfirmValidate = (key, val) => {
    setConfirmValidate(_ => {
      return {..._, [key]: val};
    });
  };

  let valValue = () => {
    let isValOk = 1;

    if (!code) {
      console.log('forgot.codeIsRequire');
      updateConfirmValidate('codeValidate', 'forgot.codeIsRequire');
      isValOk = !1;
    } else if (code.length !== 6) {
      console.log('forgot.codeInvalid');
      updateConfirmValidate('codeValidate', 'forgot.codeInvalid');
      isValOk = !1;
    } else {
      console.log('forgot.ok');
      updateConfirmValidate('codeValidate', '');
    }

    let valPassword = validatePassword(password);
    if (valPassword !== 'ok') {
      updateConfirmValidate('passwordValidate', `forgot.${valPassword}`);
      isValOk = !1;
    } else {
      updateConfirmValidate('passwordValidate', '');
    }

    valPassword = validatePassword(confirmPass);
    if (confirmPass !== password) {
      updateConfirmValidate(
        'confirmPasswordValidate',
        'forgot.confirmPasswordMustSamePassword',
      );
      isValOk = !1;
    } else if (valPassword !== 'ok') {
      updateConfirmValidate('confirmPasswordValidate', `forgot.${valPassword}`);
      isValOk = !1;
    } else {
      updateConfirmValidate('confirmPasswordValidate', '');
    }
    return isValOk;
  };

  let onPressConfirm = () => {
    console.log({code, password, confirmPass});
    if (!valValue(true)) {
      return;
    }
    const params = {
      email: email,
      verificationCode: code,
      password: password,
      confirmPassword: confirmPass,
    };
    dispatch(
      forgotConfirmAction(params, onForgotConfirmSuccess, onRequestError),
    );
  };

  const handleBack = () => {
    setStep(1);
    updateConfirmValidate('codeValidate', '');
    updateConfirmValidate('passwordValidate', '');
    updateConfirmValidate('confirmPasswordValidate', '');
    reset(0);
  };
  const handleBlur = () => {
    // valValue();
  };

  useEffect(
    _ => {
      if (code) updateConfirmValidate('codeValidate', '');
    },
    [code],
  );
  useEffect(
    _ => {
      if (password) updateConfirmValidate('passwordValidate', '');
    },
    [password],
  );
  useEffect(
    _ => {
      if (confirmPass) updateConfirmValidate('confirmPasswordValidate', '');
    },
    [confirmPass],
  );

  const onForgotConfirmSuccess = response => {
    console.log('onForgotConfirmSuccess', response);
    if (response) {
      if (response.statusCode === ResponseCode.OK) {
        Alert.alert(
          i18n.t('forgot.notice'),
          i18n.t('forgot.resetPasswordSuccessful'),
          [
            {
              text: 'OK',
              onPress: () => {
                console.log('OK Pressed');
                navigate('LoginScreen');
              },
            },
          ],
        );
      } else {
        console.log(response);
        if (typeof response?.content === 'object') {
          for (let x of response?.content) {
            console.log(x);
            let {errorCode} = x;
            if (errorCode === 'TokenInvalid') {
              Alert.alert(
                i18n.t('forgot.notice'),
                i18n.t('forgot.yourCodeIsNotValid'),
                [
                  {
                    text: 'OK',
                    onPress: () => {
                      console.log('OK Pressed');
                      setCode('');
                    },
                  },
                ],
              );
              return;
            }
            if (errorCode === 'AccountNotExist') {
              Alert.alert(
                i18n.t('forgot.notice'),
                i18n.t('forgot.accountIsNotExist'),
                [
                  {
                    text: 'OK',
                    onPress: () => {
                      console.log('OK Pressed');
                      setCode('');
                    },
                  },
                ],
              );
              return;
            }
            Alert.alert(
              i18n.t('forgot.notice'),
              i18n.t('forgot.forgotConfirmFail'),
              [
                {
                  text: 'OK',
                  onPress: () => {
                    console.log('OK Pressed');
                    setCode('');
                  },
                },
              ],
            );
          }
        }
      }
    }
  };
  const onForgotRequestSuccess = response => {
    dispatch(loadingAction(false));
    if (response) {
      if (response.statusCode === ResponseCode.OK) {
        Alert.alert(
          i18n.t('forgot.notice'),
          i18n.t('forgot.pleaseCheckYourEmail'),
          [
            {
              text: 'OK',
              onPress: () => {
                console.log('OK Pressed');
                setStep(2);
              },
            },
          ],
        );
        reset(120);
      } else {
        console.log('forgot request', response);
        for (let item of response?.content) {
          let errString =
            item?.errorCode === 'AccountNotExist'
              ? i18n.t('forgot.forgotRequestAccountNotExist')
              : i18n.t('forgot.forgotRequestFail');
          Alert.alert(i18n.t('forgot.error'), errString, [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]);
          break;
        }
      }
    }
  };

  const onRequestError = error => {
    dispatch(loadingAction(false));
    console.log('response register error', error);
  };

  const onResend = () => {
    // if (numberCD) {
    //   return Alert.alert(
    //     i18n.t('forgot.notice'),
    //     i18n.t('forgot.waitSendNextEmail', {numberCD}),
    //     [
    //       {
    //         text: 'OK',
    //         onPress: () => {
    //           console.log('OK Pressed');
    //           setStep(2);
    //         },
    //       },
    //     ],
    //   );
    // }
    dispatch(loadingAction(true));
    const params = {
      email: email,
    };
    dispatch(
      forgotRequestAction(params, onForgotRequestSuccess, onRequestError),
    );
  };
  const _setEmail = val => {
    if (val) {
      setEmailVal('');
    }
    setEmail(val);
  };
  return (
    <AppHeader style={styles.container}>
      {step === 1 ? (
        <ForgotComponent
          email={email}
          onEmailChange={_setEmail}
          onSendCode={onSendCode}
          validateEmail={emailVal}
        />
      ) : (
        <ConfirmComponent
          code={code}
          countDown={numberCD}
          setCode={setCode}
          password={password}
          confirmPass={confirmPass}
          setPassword={setPassword}
          setConfirmPass={setConfirmPass}
          validate={confirmValidate}
          onPressConfirm={onPressConfirm}
          handleBack={handleBack}
          handleBlur={handleBlur}
          onResend={onResend}
          isDisableResend={isDisableResend}
        />
      )}
    </AppHeader>
  );
}
let styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default ForgotScreen;
