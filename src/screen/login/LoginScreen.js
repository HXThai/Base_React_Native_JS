/* eslint-disable react/self-closing-comp */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useTranslation} from 'react-i18next';
import {navigate, navigateAndSetToTop} from '~/screen/NavigationService';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import LoginComponent from '~/component/login/LoginComponent';
import SignUpComponent from '~/component/login/SignUpComponent';
import NavComponent from '~/component/login/NavComponent';
import LogoComponent from '~/component/login/LogoComponent';
import {persentHeight, ScreenName} from '~/utils';
import {useTheme} from '@react-navigation/native';
import {
  Text,
  HeaderComponent,
  AppHeader,
  Card,
} from '~/component/componentExtension';
import {LoginManager, AccessToken, Settings} from 'react-native-fbsdk-next';
import {useDispatch} from 'react-redux';
import {
  registerAction,
  loginAction,
  loginSuccessAction,
  loginSocialNetworkAction,
} from '~/reduxSaga/actions/authAction';
import {ResponseCode} from '~/utils/constant';
import {loadingAction} from '~/reduxSaga/actions/loadingAction';
import {
  validateEmail,
  validateSpecialCharacter,
  validatePassword,
} from '~/utils/validate';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const Tab = createMaterialTopTabNavigator();
let handleTabBar = tabbarprops => {
  return <NavComponent {...tabbarprops} />;
};

function LoginScreen({}) {
  let {i18n} = useTranslation();
  const {colors} = useTheme();
  let [first, setFirst] = useState('');
  let [last, setLast] = useState('');
  let [email, setEmail] = useState('');
  let [pass, setPass] = useState('');
  let [confirmPass, setConfirmPass] = useState('');

  let [username, setUsername] = useState('');
  let [password, setPassword] = useState('');

  const [isValidateEmail, setIsValidateEmail] = useState('');
  const [isValidatePassword, setisValidatePassword] = useState('');
  const [registerValidate, setRegisterValidate] = useState({
    nameValidate: '',
    emailValidate: '',
    passwordValidate: '',
    confirmPasswordValidate: '',
  });

  const [isShowText, setIsShowText] = useState(false);

  const dispatch = useDispatch();

  let onPressSocial = async name => {
    dispatch(loadingAction(true));
    try {
      let accessToken =
        name === 'gg' ? await loginGoogle() : await loginFacebook();
      if (!accessToken) {
        console.log('have error,accessToken = null ');
        return;
      } else {
        console.log(`loging with ${name}`, {accessToken});
        let params = {
          provider: name === 'gg' ? 'Google' : 'Facebook',
          accessToken,
        };
        dispatch(
          loginSocialNetworkAction(params, onLoginSuccess, onLoginError),
        );
      }
    } catch (err) {
      dispatch(loadingAction(false));
      console.log(err);
    }
  };

  async function loginGoogle() {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signIn();
      let {accessToken} = await GoogleSignin.getTokens();
      console.log('login google ok');
      return accessToken;
    } catch (err) {
      if (err.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('user cancelled the login flow');
      } else if (err.code === statusCodes.IN_PROGRESS) {
        console.log('operation (e.g. sign in) is in progress already');
      } else if (err.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('play services not available or outdated');
      } else {
        console.log(err);
      }
      dispatch(loadingAction(false));
      return null;
    }
  }
  async function loginFacebook() {
    Settings.setAppID('2250068218561267');
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      console.log('User cancelled the login process');
      dispatch(loadingAction(false));
      return null;
    }
    const data = await AccessToken.getCurrentAccessToken();
    if (!data) {
      console.log('Something went wrong obtaining access token');
      dispatch(loadingAction(false));

      return null;
    }
    // console.log({data});
    console.log('login facebook ok');
    return data.accessToken;
  }

  let onPressFlag = country => {
    console.log({country});
    switch (country) {
      case 'uk':
        i18n.changeLanguage('en');
        return;
      case 'jp':
        i18n.changeLanguage('ja');
        return;
      case 'vn':
      default:
        i18n.changeLanguage('vi');
        return;
    }
  };

  let onLoginPress = ({username, password}) => {
    if (!checkValid('login')) {
      return;
    }
    dispatch(loadingAction(true));
    const params = {
      email: username.trim(),
      password: password.trim(),
    };
    dispatch(loginAction(params, onLoginSuccess, onLoginError));
  };

  let onPressSignup = () => {
    if (!checkValid('signup', true)) {
      return console.log('Error');
    }
    const params = {
      firstName: first,
      lastName: last,
      email: email,
      password: pass,
      confirmPassword: confirmPass,
    };
    dispatch(registerAction(params, onRegisterSuccess, onRegisterError));
  };

  const onRegisterSuccess = response => {
    console.log('response register success', response);
    if (response) {
      if (response.statusCode === ResponseCode.OK) {
        setFirst('');
        setLast('');
        setEmail('');
        setPass('');
        setConfirmPass('');
        Alert.alert(
          i18n.t('login.notice'),
          i18n.t('login.registerSuccessful'),
          [
            {
              text: 'OK',
              onPress: () => {
                console.log('OK Pressed');
                navigate('LoginPartScreen');
              },
            },
          ],
        );
      } else {
        let errObj = response?.content;
        if (errObj) {
          for (let err of errObj) {
            let errString =
              err?.errorCode === 'AccountExist'
                ? i18n.t('signup.AccountExist')
                : i18n.t('signup.registerFail');
            Alert.alert(i18n.t('signup.error'), errString, [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]);
            break;
          }
        }
      }
    }
  };

  const onRegisterError = error => {
    console.log('response register error', error);
  };

  const onLoginSuccess = response => {
    dispatch(loadingAction(false));
    console.log('onLoginSuccess ok');
    if (response) {
      if (response.statusCode === ResponseCode.OK) {
        if (response.content && response.content.token) {
          let params = {
            token: response.content.token,
            refreshToken: response.content.refreshToken,
          };
          dispatch(loginSuccessAction(params));
          navigateAndSetToTop('MainStack');
        }
      } else {
        setPassword('');
        Alert.alert(
          i18n.t('login.error'),
          i18n.t('login.wrongEmailorPassword'),
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        );
      }
    }
  };

  const onLoginError = error => {
    dispatch(loadingAction(false));
    console.log('response login error', error);
  };
  const checkValid = (type = 'login', checkAll = false) => {
    let isValid = 1;
    if (type === 'login') {
      if (!username) {
        setIsValidateEmail('login.emailIsRequire');
        isValid = !1;
      } else if (!validateEmail(username)) {
        setIsValidateEmail('login.invalidEmail');
        isValid = !1;
      } else {
        setIsValidateEmail('');
      }

      if (!password) {
        setisValidatePassword('login.passwordIsRequire');
        isValid = !1;
      } else {
        setisValidatePassword('');
      }
      return isValid;
    }

    if (type === 'signup') {
      console.log({first, last, email, pass, confirmPass});
      if (!first || !last) {
        console.log('name empty');
        setRegisterValidate(_ => {
          return {..._, nameValidate: 'signup.firstAndLastNameisRequire'};
        });
        isValid = !1;
      } else if (
        (first && validateSpecialCharacter(first)) ||
        (last && validateSpecialCharacter(last))
      ) {
        setRegisterValidate(_ => {
          return {
            ..._,
            nameValidate: 'signup.firstAndLastNameHaveSpeacialCharacter',
          };
        });
        isValid = !1;
      } else {
        setRegisterValidate(_ => {
          return {
            ..._,
            nameValidate: '',
          };
        });
      }

      if (!email) {
        setRegisterValidate(_ => {
          return {..._, emailValidate: 'signup.emailisRequire'};
        });
        isValid = !1;
      } else if (!validateEmail(email)) {
        setRegisterValidate(_ => {
          return {..._, emailValidate: 'signup.invalidEmail'};
        });
        isValid = !1;
      } else {
        setRegisterValidate(_ => {
          return {..._, emailValidate: ''};
        });
      }

      let vldPassword = validatePassword(pass);
      if (vldPassword !== 'ok') {
        setRegisterValidate(_ => {
          return {..._, passwordValidate: `signup.${vldPassword}`};
        });
        isValid = !1;
      } else {
        setRegisterValidate(_ => {
          return {..._, passwordValidate: ''};
        });
      }
      let vldConfirmPass = validatePassword(confirmPass);
      console.log({vldConfirmPass});
      if (vldConfirmPass !== 'ok') {
        setRegisterValidate(_ => {
          return {..._, confirmPasswordValidate: `signup.${vldConfirmPass}`};
        });
        isValid = !1;
      } else if (confirmPass !== pass) {
        setRegisterValidate(_ => {
          return {
            ..._,
            confirmPasswordValidate: 'signup.confirmPassAndPassMustSame',
          };
        });
        isValid = !1;
      } else {
        setRegisterValidate(_ => {
          return {..._, confirmPasswordValidate: ''};
        });
      }

      console.log({isValid});
      return isValid;
    }
  };
  const handleBlur = key => {};
  const onFocus = name => {
    console.log({name});
    setIsShowText(name !== 'Login' ? false : true);
  };
  const onPressTerm = () => {
    navigate(ScreenName.TERM_OF_SERVICE);
  };

  useEffect(() => {
    if (username) {
      setIsValidateEmail('');
    }
  }, [username]);
  useEffect(() => {
    if (password) {
      setisValidatePassword('');
    }
  }, [password]);

  //for signup component
  useEffect(() => {
    if (first || last) {
      setRegisterValidate(_ => {
        return {..._, nameValidate: ''};
      });
    }
  }, [first, last]);

  useEffect(() => {
    if (email) {
      setRegisterValidate(_ => {
        return {..._, emailValidate: ''};
      });
    }
  }, [email]);
  useEffect(() => {
    if (pass) {
      setRegisterValidate(_ => {
        return {..._, passwordValidate: ''};
      });
    }
  }, [pass]);
  useEffect(() => {
    if (confirmPass) {
      setRegisterValidate(_ => {
        return {..._, confirmPasswordValidate: ''};
      });
    }
  }, [confirmPass]);

  return (
    <AppHeader
      style={[
        styles.container,
        {backgroundColor: colors.PRIMARY_BACKGROUND_COLOR},
      ]}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        style={[
          styles.container,
          {backgroundColor: colors.PRIMARY_BACKGROUND_COLOR},
        ]}>
        <LogoComponent showText={isShowText} />

        <Tab.Navigator
          tabBar={handleTabBar}
          screenOptions={{
            tabBarStyle: {
              height: 50,
            },
          }}
          sceneContainerStyle={{
            backgroundColor: colors.PRIMARY_BACKGROUND_COLOR,
          }}
          style={styles.tab}>
          <Tab.Screen
            name="LoginPartScreen"
            options={{tabBarLabel: 'general.login'}}>
            {props => (
              <LoginComponent
                onPressSocial={onPressSocial}
                onPressFlag={onPressFlag}
                onLoginPress={onLoginPress}
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                isValidateEmail={isValidateEmail}
                isValidatePassword={isValidatePassword}
                handleBlur={handleBlur}
                onFocus={onFocus}
                {...props}
              />
            )}
          </Tab.Screen>

          <Tab.Screen
            name="SignUpPartScreen"
            options={{tabBarLabel: 'general.signup'}}>
            {props => (
              <SignUpComponent
                onPressSocial={onPressSocial}
                onPressSignup={onPressSignup}
                onPressTerm={onPressTerm}
                first={first}
                setFirst={setFirst}
                last={last}
                setLast={setLast}
                email={email}
                setEmail={setEmail}
                pass={pass}
                setPass={setPass}
                confirmPass={confirmPass}
                setConfirmPass={setConfirmPass}
                registerValidate={registerValidate}
                handleBlur={handleBlur}
                onFocus={onFocus}
                {...props}
              />
            )}
          </Tab.Screen>
        </Tab.Navigator>
      </KeyboardAwareScrollView>
    </AppHeader>
  );
}
let styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#F2F2F2',
  },
  tab: {
    height: persentHeight(80),
    overflow: 'visible',
    flex: 1,
  },
});
export default LoginScreen;
