import React, {useState, useCallback, useMemo, useEffect} from 'react';

import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {NetworkProvider} from 'react-native-offline';
import {Provider} from 'react-redux';
import {StatusBar, LogBox, Platform} from 'react-native';
import {PersistGate} from 'redux-persist/integration/react';

import {navigationRef} from './src/screen/NavigationService';
import {PreferencesContext} from './PreferencesContext';
import {lightTheme, darkTheme} from '~/utils/theme';

// polyfill crypto.getRandomValues for realm
import 'react-native-get-random-values';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {RealmProvider} from '~/database';

import Router from './src/navigation/router';
import {store, persistor} from '~/reduxSaga';
import {getDarkTheme, saveDarkTheme} from '~/utils/storage';

import {GoogleSignin} from '@react-native-google-signin/google-signin';

GoogleSignin.configure();

if (__DEV__) {
  import('./ReactotronConfig').then(() => {});
}

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);
import '~/utils/Language/i18n';

const App = () => {
  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...lightTheme,
    },
  };

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...darkTheme,
    },
  };

  const [isThemeDark, setIsThemeDark] = useState(false);

  let theme = isThemeDark ? CustomDarkTheme : CustomDefaultTheme;

  useEffect(() => {
    getTheme();
  }, []);

  const getTheme = async () => {
    const typeTheme = await getDarkTheme();
    if (typeTheme != '') {
      if (typeTheme == 'dayMode') {
        setIsThemeDark(false);
      } else {
        setIsThemeDark(true);
      }
    } else {
      saveDarkTheme('dayMode');
      setIsThemeDark(false);
    }
  };

  const toggleTheme = useCallback(themeDark => {
    if (themeDark) return setIsThemeDark(true);
    return setIsThemeDark(false);
  }, []);

  const preferences = useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
    }),
    [toggleTheme, isThemeDark],
  );

  return (
    <GestureHandlerRootView flex={1}>
      <PreferencesContext.Provider value={preferences}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <NetworkProvider>
              <RealmProvider>
                <NavigationContainer ref={navigationRef} theme={theme}>
                  <StatusBar
                    hide={false}
                    barStyle={
                      Platform === 'ios' ? 'dark-content' : 'dark-content'
                    }
                    backgroundColor="white"
                  />
                  <Router />
                </NavigationContainer>
              </RealmProvider>
            </NetworkProvider>
          </PersistGate>
        </Provider>
      </PreferencesContext.Provider>
    </GestureHandlerRootView>
  );
};

export default App;
