/* eslint-disable prettier/prettier */
import React, {useState, useMemo, useEffect} from 'react';
import * as Colors from '~/utils/Colors';
import Sizings from '~/utils/sizings';
import {
  StyleSheet,
  View,
  StatusBar,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {
  Text,
  HeaderComponent,
  Button,
  AccumulateCard,
  ListCourse,
  AppHeader,
} from '~/component/componentExtension';
import fonts from '~/utils/font';
import {isIphoneXorAbove} from '~/utils/configuration';
import {myHeight, myWidth} from '~/utils/dimension';
import {
  FirstPointIcon,
  SecondPointIcon,
  ThirdPointIcon,
  FourthPointIcon,
} from '~/assets/icons';
import {goback} from '~/screen/NavigationService';
import {useRealm, useQuery, Units} from '~/database';
import {useTranslation} from 'react-i18next';
const dataLessons = [
  {
    isDownloaded: true,
    isPlaying: false,
    title: 'Unit 0: Alphabet Hiragana, Katakana, Numbers',
    uri: 'https://api.honkidenihongo.com/storage/download/lesson/basic1/v4/lession_00.zip',
    lesson: 'lesson_00',
    firstPoint: 100,
    secondPoint: 100,
    thirdPoint: 100,
    fourthPoint: 100,
  },
  {
    isDownloaded: false,
    isPlaying: false,
    title: 'Unit 1: Self introduction',
    firstPoint: 100,
    secondPoint: 100,
    thirdPoint: 100,
    fourthPoint: 100,
  },
  {
    isDownloaded: false,
    isPlaying: false,
    title: 'Unit 2: Object',
    firstPoint: 100,
    secondPoint: 100,
    thirdPoint: 100,
    fourthPoint: 100,
  },
  {
    isDownloaded: false,
    isPlaying: false,
    title: 'Unit 3: Place',
    firstPoint: 100,
    secondPoint: 100,
    thirdPoint: 100,
    fourthPoint: 100,
  },
  {
    isDownloaded: false,
    isPlaying: false,
    title: 'Unit 4: Thời Gian',
    firstPoint: 100,
    secondPoint: 100,
    thirdPoint: 100,
    fourthPoint: 100,
  },
  {
    isDownloaded: false,
    isPlaying: false,
    title: 'Unit 1: Self introduction',
    firstPoint: 100,
    secondPoint: 100,
    thirdPoint: 100,
    fourthPoint: 100,
  },
];
export default function CourseComponent(props) {
  const {dataCourse, dataLesson} = props;
  const {colors} = useTheme();
  const result = useQuery(Units);
  const realm = useRealm();
  const units = useMemo(() => result.sorted('createdAt'), [result]);
  const [isListUnit, setIsListUnit] = useState(false);
  let {i18n} = useTranslation();
  var dataFilterLanguage = {};
  dataCourse.courseTranslations.map((item, index) => {
    if (item.language.code === i18n.language) {
      dataFilterLanguage = item;
    }
  });
  // useEffect(() => {
  //   if (!units.length) {
  //     console.log('unit length < 1', units.length);
  //     realm.write(() => {
  //       dataLessons.forEach((item, index) => {
  //         realm.create(
  //           'Units',
  //           Units.generate({
  //             title: item?.title,
  //             uri: item?.uri,
  //             order: index,
  //             lesson: item?.lesson,
  //             isDownloaded: false,
  //             isPlaying: false,
  //             createdAt: Date.now(),
  //             firstPoint: item?.firstPoint,
  //             secondPoint: item?.secondPoint,
  //             thirdPoint: item?.thirdPoint,
  //             fourthPoint: item?.fourthPoint,
  //           }),
  //         );
  //       });
  //     });
  //   }
  // }, [units]);

  const headerUnit = () => {
    return (
      <>
        <Text fs18 MontserratBold style={styles.styleTextAlign}>
          {dataFilterLanguage?.name}
        </Text>
        <Text mgt5 style={styles.styleTextAlign}>
          <Text fs10 MontserratBold>
            {'Mar 01.2022   '}
          </Text>
          <Text fs10 MontserratBold transKey={'course.leanringTime'} />
          <Text fs10 MontserratBold>
            {' 1h32m'}
          </Text>
        </Text>
      </>
    );
  };

  return (
    <AppHeader style={styles.container}>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" hidden={false} />
        <View style={styles.viewHeader}>
          <ImageBackground
            style={styles.imageHeaderBG}
            source={{
              uri: 'https://cdn.dribbble.com/users/361038/screenshots/15255814/untitled-3.jpg',
            }}>
            <HeaderComponent
              title={dataFilterLanguage?.name}
              styleTitle={styles.titleStyle}
              hasNotification
              backIconColor={Colors.WHITE}
              // styleHeader={[{marginTop: isIphoneXorAbove() ? 30 : 5}]}
              customHandleBack={() => {
                if (isListUnit) {
                  setIsListUnit(false);
                } else {
                  goback();
                }
              }}
            />
            <ScrollView style={{flex: 1}}>
              <View style={{paddingBottom: 5}}>
                {dataCourse.courseTranslations.map((item, index) => {
                  return i18n.language === item.language.code ? (
                    <Text
                      key={index}
                      fs12
                      white
                      MontserratMedium
                      style={[
                        styles.styleDescription,
                        // {marginTop: isIphoneXorAbove() ? 90 : 60},
                      ]}>
                      {item.description}
                    </Text>
                  ) : null;
                })}
              </View>
            </ScrollView>
          </ImageBackground>
        </View>

        <View
          style={[
            styles.mainContainer,
            {
              backgroundColor: colors.PRIMARY_BACKGROUND_COLOR,
              paddingHorizontal: isListUnit ? 30 : 50,
            },
          ]}>
          {isListUnit ? (
            <View style={styles.styleContentScroll}>
              {headerUnit()}
              <Text fs10 MontserratBold style={styles.styleButtonDownload}>
                Download all
              </Text>
              <ListCourse data={dataLesson} />
            </View>
          ) : (
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.styleContentScroll}>
              {headerUnit()}
              <View style={styles.containerPointCard}>
                <AccumulateCard
                  disable={true}
                  backgroundLineColor={Colors.firstPointIconColor}
                  currentPoint={60}
                  iconComponent={
                    <FirstPointIcon
                      height={57}
                      width={57}
                      color={Colors.firstPointIconColor}
                    />
                  }
                  style={styles.styleCardPoint}
                />
                <AccumulateCard
                  disable={true}
                  backgroundLineColor={Colors.secondPointIconColor}
                  currentPoint={60}
                  iconComponent={
                    <SecondPointIcon
                      height={57}
                      width={57}
                      color={Colors.secondPointIconColor}
                    />
                  }
                  style={styles.styleCardPoint}
                />
                <AccumulateCard
                  disable={true}
                  backgroundLineColor={Colors.thirdPointIconColor}
                  currentPoint={60}
                  iconComponent={
                    <ThirdPointIcon
                      height={57}
                      width={57}
                      color={Colors.thirdPointIconColor}
                    />
                  }
                  style={styles.styleCardPoint}
                />
                <AccumulateCard
                  disable={true}
                  backgroundLineColor={Colors.fourthPointIconColor}
                  currentPoint={60}
                  iconComponent={
                    <FourthPointIcon
                      height={57}
                      width={57}
                      color={Colors.fourthPointIconColor}
                    />
                  }
                  style={styles.styleCardPoint}
                />
              </View>
              <Button
                buttonStyle={styles.buttonStyle}
                title={'general.start'}
                onPress={() => {
                  setIsListUnit(true);
                }}
              />
            </ScrollView>
          )}
        </View>
      </View>
    </AppHeader>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageHeaderBG: {
    width: Sizings.percent_100,
    height: 198,
  },
  titleStyle: {
    fontFamily: fonts.fontFamilyPrimaryBold,
    color: Colors.WHITE,
  },
  styleDescription: {
    textAlign: 'center',
    width: Sizings.percent_70,
    alignSelf: 'center',
  },
  mainContainer: {
    // width: Sizings.percent_100,
    // height: Sizings.percent_80,
    // position: 'absolute',
    // bottom: 0,
    // height: myHeight - 260,
    // alignItems: 'center',
    paddingVertical: 20,
    flex: 1,
  },
  containerPointCard: {
    width: Sizings.percent_100,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 10,
  },
  styleCardPoint: {
    marginTop: myWidth * 0.035,
  },
  buttonStyle: {
    marginTop: 30,
  },
  buttonSCStyle: {
    marginTop: 10,
  },
  styleContentScroll: {
    width: Sizings.percent_100,
    // height: Sizings.percent_100,
    flex: 1,
  },
  viewHeader: {
    // position: 'absolute',
    // top: 0,
    // width: '100%',
    height: 198,
  },
  styleTextAlign: {
    textAlign: 'center',
  },
  styleButtonDownload: {
    alignSelf: 'center',
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    paddingBottom: 20,
    paddingTop: 20,
  },
});
