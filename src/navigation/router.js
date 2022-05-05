/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import * as ScreenName from '~/utils/ScreenName';
import {createStackNavigator} from '@react-navigation/stack';
import LoadingComponent from '~/component/componentExtension/LoadingComponent';
import {BottomTabBar} from './BottomTabBar';

import LoginScreen from '~/screen/login/LoginScreen';
import ForgotScreen from '~/screen/forgot/ForgotScreen';
import CourseScreen from '~/screen/course/CourseScreen';
import ProfileScreen from '~/screen/profile/ProfileScreen';
import LearnFlashcardScreen from '~/screen/learn/flashcard/LearnFlashcardScreen';
import LearnAudioScreen from '~/screen/learn/audio/LearnAudioScreen';
import LearnPracticeScreen from '~/screen/learn/practice/LearnPracticeScreen';
import LearnSpeakScreen from '~/screen/learn/speak/LearnSpeakScreen';
import KnowledgeScreen from '~/screen/learn/knowledge/KnowledgeScreen';
import LearnWritingScreen from '~/screen/learn/writing/LearnWritingScreen';
import SkillChooseScreen from '~/screen/learn/skillchoose/SkillChooseScreen';
import SettingScreen from '~/screen/setting/SettingScreen';
import AboutUsScreen from '~/screen/aboutUs/AboutUsScreen';
import TermOfServiceScreen from '~/screen/termOfService/TermOfServiceScreen';
import UserGuideScreen from '~/screen/userGuide/UserGuideScreen';
import SplashScreen from '~/screen/splash/SplashScreen';
import LearnPracticeResultScreen from '~/screen/learn/practiceResult/LearnPracticeResultScreen';
//for Test
import TestScreen from '~/screen/test/TestScreen';

const Stack = createStackNavigator();

function Router(props) {
  return (
    <>
      <Stack.Navigator
        initialRouteName={ScreenName.SPLASH_SCREEN}
        // initialRouteName={ScreenName.LEARN_PRACTICE_RESULT_SCREEN}
        screenOptions={{headerShown: false}}>
        {/* splash screen */}
        <Stack.Screen
          name={ScreenName.SPLASH_SCREEN}
          component={SplashScreen}
        />

        {/* login-signup screen */}
        <Stack.Screen name="LoginScreen" component={LoginScreen} />

        {/* Forgot password screen */}
        <Stack.Screen name="ForgotScreen" component={ForgotScreen} />

        {/* MainStack: Home, Course, Setting, Profile,... */}
        <Stack.Screen name="MainStack" component={BottomTabBar} />

        {/* Courses stack */}
        <Stack.Screen
          name={ScreenName.COURSE_SCREEN}
          component={CourseScreen}
        />

        {/* Choose kill to learn screen: Writing, Listen, Read, Speak and Practice */}
        <Stack.Screen
          name={ScreenName.LEARN_SKILLCHOOSE_SCREEN}
          component={SkillChooseScreen}
        />

        {/* Audio screen: Listen audio practice Unit 0 */}
        <Stack.Screen
          name={ScreenName.LEARN_AUDIO_SCREEN}
          component={LearnAudioScreen}
        />

        {/* Speak screen: speak practice Unit 0 */}
        <Stack.Screen
          name={ScreenName.LEARN_SPEAK_SCREEN}
          component={LearnSpeakScreen}
        />

        {/* Knowledge screen */}
        <Stack.Screen
          name={ScreenName.KNOWLEDGE_SCREEN}
          component={KnowledgeScreen}
        />

        {/* Learn Flashcard screen: unit 1,2,3... */}
        <Stack.Screen
          name={ScreenName.LEARN_FLASHCARD_SCREEN}
          component={LearnFlashcardScreen}
        />

        {/* Practice screen: Practice General  */}
        <Stack.Screen
          name={ScreenName.LEARN_PRACTICE_SCREEN}
          component={LearnPracticeScreen}
        />

        {/* Learn Writing screen: unit 0 */}
        <Stack.Screen
          name={ScreenName.LEARN_WRITING_SCREEN}
          component={LearnWritingScreen}
        />

        {/* Learn Writing screen: unit 0 */}
        <Stack.Screen
          name={ScreenName.LEARN_PRACTICE_RESULT_SCREEN}
          component={LearnPracticeResultScreen}
        />

        {/* profile screen */}
        <Stack.Screen
          name={ScreenName.PROFILE_SCREEN}
          component={ProfileScreen}
        />

        {/* setting screen */}
        <Stack.Screen
          name={ScreenName.SETTING_SCREEN}
          component={SettingScreen}
        />

        <Stack.Screen
          name={ScreenName.ABOUT_US_SCREEN}
          component={AboutUsScreen}
        />

        <Stack.Screen
          name={ScreenName.USER_GUIDE_SCREEN}
          component={UserGuideScreen}
        />
        <Stack.Screen
          name={ScreenName.TERM_OF_SERVICE}
          component={TermOfServiceScreen}
        />

        {/* test screen */}
        <Stack.Screen name={ScreenName.TEST_SCREEN} component={TestScreen} />
      </Stack.Navigator>
      <LoadingComponent />
    </>
  );
}

export default Router;
