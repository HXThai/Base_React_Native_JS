/* eslint-disable prettier/prettier */
import React, {useContext, useState, useMemo, useCallback} from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';
import {useIsConnected} from 'react-native-offline';
import {
  AppHeader,
  Text,
  HeaderComponent,
  Button,
  Card,
  CarouselComponent,
  ListLargeCourse,
  BackgroundGardient,
} from '~/component/componentExtension';
import UserComponent from './UserComponent';
import CurrentCourseComponent from './CurrentCourseComponent';
import ListCourseComponent from './ListCourseComponent';
import {useTheme} from '@react-navigation/native';
import {useRealm, useQuery, Task} from '~/database';
import sizings from '~/utils/sizings';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {navigate} from '~/screen/NavigationService';
import {Colors, ScreenName, Sizings} from '~/utils';

const OneCourse = ({currentLanguage, data, onPress}) => {
  return (
    <View style={styles.courseGroup}>
      {/* <Text
        MontserratBold
        fs17
        transKey={
          data.type === 'Basic' ? 'course.basicCourse' : 'course.jlptCourse'
        }
      /> */}
      <View style={styles.containerCards}>
        {data.courseTranslations.map((item, index) => {
          return item.language.code === currentLanguage ? (
            <Card
              key={index}
              style={styles.containerCard}
              onPress={_ => onPress(item)}>
              <Text noTextDarkTheme fs16 MontserratBold>
                {item.name}
              </Text>
            </Card>
          ) : null;
        })}
        {/* <Card style={styles.containerCard} onPress={_ => onPress()}>
          <Text noTextDarkTheme fs18 MontserratBold>
            {data.name}
          </Text>
        </Card> */}
      </View>
    </View>
  );
};

export default function HomeComponent(props) {
  const {userProfile, dataListCourses, onCoursePress, currentLanguage} = props;
  const {colors} = useTheme();
  return (
    <View style={styles.container}>
      <AppHeader
        style={[
          styles.container,
          {backgroundColor: colors.PRIMARY_BACKGROUND_COLOR},
        ]}>
        <StatusBar hidden={false} backgroundColor={Colors.Teal_Blue} />
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          style={[
            styles.container,
            {backgroundColor: colors.PRIMARY_BACKGROUND_COLOR},
          ]}>
          <View style={styles.viewHeader}>
            <View style={styles.viewHeaderBackground} />
            <UserComponent
              style={styles.userComponent}
              userProfile={userProfile}
            />
          </View>

          <View style={styles.spaces} />
          <CurrentCourseComponent />
          <View style={styles.spaces} />
          <View style={styles.listcourses}>
            <Text MontserratBold fs17 transKey={'course.basicCourse'} mb10 />
            {dataListCourses.map(data =>
              data.type === 'Basic' ? (
                <OneCourse
                  currentLanguage={currentLanguage}
                  data={data}
                  key={data.id}
                  onPress={() => onCoursePress(data)}
                />
              ) : null,
            )}
            <Text
              MontserratBold
              fs17
              transKey={'course.jlptCourse'}
              mb10
              style={{marginTop: 25}}
            />
            {dataListCourses.map(data =>
              data.type === 'JLPT' ? (
                <OneCourse
                  currentLanguage={currentLanguage}
                  data={data}
                  key={data.id}
                  onPress={() => onCoursePress(data)}
                />
              ) : null,
            )}
          </View>
        </KeyboardAwareScrollView>
      </AppHeader>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // borderWidth: 1,
  },
  viewHeader: {
    height: 196,
  },
  viewHeaderBackground: {
    height: 136,
    backgroundColor: Colors.primaryColor,
    borderBottomWidth: 6,
    borderBottomColor: Colors.borderGreenDark,
  },
  userComponent: {
    position: 'absolute',
    bottom: 0,
  },
  spaces: {
    height: 40,
  },
  courseGroup: {
    marginVertical: 5,
  },
  listcourses: {
    // height: 100,
    width: Sizings.percent_90,
    alignSelf: 'center',
    borderRadius: 20,
  },
  containerCards: {
    // marginVertical: 15,
  },
  containerCard: {
    width: Sizings.percent_100,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    // marginBottom: 5,
  },
});

/*<ListLargeCourse
  data={tasks}
  onPress={_ => {
    navigate(ScreenName.COURSE_SCREEN);
  }}
/> */
