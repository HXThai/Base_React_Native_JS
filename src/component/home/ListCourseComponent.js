/* eslint-disable prettier/prettier */
import React, {useContext, useState, useMemo, useCallback} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {
  Text,
  HeaderComponent,
  Button,
  Card,
  CarouselComponent,
  ListCourse,
  BackgroundGardient,
} from '~/component/componentExtension';
import {navigate} from '~/screen/NavigationService';
import {useTheme} from '@react-navigation/native';
import {CourseBadge, ContinueIcon} from '~/assets/icons';
import sizings from '~/utils/sizings';
import {Colors, ScreenName, Sizings} from '~/utils';
const dataListCourses = [
  {
    title: 'Basic course',
    courseGroupID: 123,
    data: [
      {courseID: 1, courseName: 'Basic 1 - N5'},
      {courseID: 2, courseName: 'Basic 2 - N4'},
    ],
  },
  {
    title: 'JLPT course',
    courseGroupID: 124,
    data: [
      {courseID: 3, courseName: 'JLPT - N4'},
      {courseID: 4, courseName: 'JLPT - N3'},
      {courseID: 5, courseName: 'JLPT - N2'},
    ],
  },
];

const OneCourse = data => {
  console.log(data);
  return (
    <View id={data.courseGroupID}>
      <Text MontserratBold fs17>
        {data.title}
      </Text>
      <View style={styles.containerCards}>
        {data.data.map((item, index) => {
          return (
            <Card key={index} style={styles.containerCard}>
              <Text noTextDarkTheme fs18 MontserratBold>
                {item.courseName}
              </Text>
            </Card>
          );
        })}
      </View>
    </View>
  );
};

export default function ListCourseComponent({dataListCourses}) {
  return <View style={styles.container}>{dataListCourses.map(OneCourse)}</View>;
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: Sizings.percent_90,
    alignSelf: 'center',
    borderRadius: 20,
  },
  containerCards: {
    marginVertical: 10,
  },
  containerCard: {
    width: Sizings.percent_100,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
});
