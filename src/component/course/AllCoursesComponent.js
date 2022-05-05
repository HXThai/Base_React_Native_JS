/* eslint-disable prettier/prettier */
import React, {useCallback} from 'react';
import * as Colors from '~/utils/Colors';
import Sizings from '~/utils/sizings';
import {StyleSheet, View, StatusBar} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {
  Text,
  HeaderComponent,
  AppHeader,
  Card,
  ListLargeCourse,
} from '~/component/componentExtension';
import fonts from '~/utils/font';
import {navigate} from '~/screen/NavigationService';
import {ScreenName} from '~/utils';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default function CourseComponent(props) {
  const {colors} = useTheme();

  const dataListCourses = [
    {
      id: 0,
      title: 'Basic 1 - N5',
    },
    {
      id: 1,
      title: 'Basic 2 - N4',
    },
    {
      id: 2,
      title: 'Advanced 1 - N3',
    },
  ];

  let tasks = [
    {
      id: 1,
      image: require('~/assets/images').largeCourse,
      title: 'Basic 1 - N5',
      courseUnit: '20 Unit',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
    },
    {
      id: 2,
      image: require('~/assets/images').largeCourse,
      title: 'Basic 2 - N4',
      courseUnit: '20 Unit',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
    },
    {
      id: 3,
      image: require('~/assets/images').largeCourse,
      title: 'Basic 3 - N3',
      courseUnit: '20 Unit',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
    },
  ];

  const onPressCourse = () => {
    navigate(ScreenName.COURSE_SCREEN);
  };

  return (
    <View style={styles.container}>
      <AppHeader
        style={[
          styles.container,
          {backgroundColor: colors.PRIMARY_BACKGROUND_COLOR},
        ]}>
        <StatusBar barStyle="dark-content" hidden={false} />
        <HeaderComponent
          title={'All courses'}
          styleTitle={styles.titleStyle}
          backIconColor={colors.BACK_ICON_COLOR}
        />
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false} flex={1}>
          <View style={styles.containterListCard}>
            {dataListCourses.map((item, index) => {
              return (
                <Card
                  key={index}
                  style={styles.containerCard}
                  onPress={onPressCourse}>
                  <Text noTextDarkTheme fs18 MontserratBold>
                    {item.title}
                  </Text>
                </Card>
              );
            })}
          </View>
          <ListLargeCourse
            data={tasks}
            onPress={_ => {
              navigate(ScreenName.COURSE_SCREEN);
            }}
          />
        </KeyboardAwareScrollView>
      </AppHeader>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleStyle: {
    fontFamily: fonts.fontFamilySecondaryRegular,
  },
  containterListCard: {
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  containerCard: {
    width: Sizings.percent_100,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: 10,
  },
});
