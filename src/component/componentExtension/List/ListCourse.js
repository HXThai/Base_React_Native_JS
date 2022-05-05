/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, TouchableOpacity, FlatList, View} from 'react-native';
import Text from '../Text';
import {
  DownloadedCourseIcon,
  ContinueIcon,
  FirstPointIcon,
  SecondPointIcon,
  ThirdPointIcon,
  FourthPointIcon,
  DownloadIcon,
  EarnedIcon,
  PracticeTypeIcon,
} from '~/assets/icons';
import {navigate} from '~/screen/NavigationService';
import {ScreenName, Colors} from '~/utils';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

let renderPoint = (type, point) => {
  if (isNaN(point) || point === null) {
    return null;
  }
  switch (type) {
    case 'firstPoint':
      return (
        <View style={styles.containerPointDetail}>
          <FirstPointIcon />
          {/* <Text>{' ' + point}</Text> */}
        </View>
      );
    case 'secondPoint':
      return (
        <View style={styles.containerPointDetail}>
          <SecondPointIcon />
          {/* <Text>{' ' + point}</Text> */}
        </View>
      );
    case 'thirdPoint':
      return (
        <View style={styles.containerPointDetail}>
          <ThirdPointIcon />
          {/* <Text>{' ' + point}</Text> */}
        </View>
      );
    case 'fourthPoint':
    default:
      return (
        <View style={styles.containerPointDetail}>
          <FourthPointIcon />
          {/* <Text>{' ' + point}</Text> */}
        </View>
      );
  }
};

const ListCourse = ({
  data,
  styleContainerItem,
  styleContainerCarousel,
  onPressDownload,
  onPressPlay,
  //type = 'practice' | 'listCourse'
  type = 'listCourse',
  //listType = 'arraymap' | 'flatlist' | scrollview
  listType = 'flatlist',
}) => {
  let {i18n} = useTranslation();
  console.log('data lesson=====', data);
  const {colors} = useTheme();
  let renderIconLeft = (isDownloaded, isEarned, practiceType) => {
    if (type === 'listCourse') {
      if (isDownloaded) {
        return <DownloadedCourseIcon color={Colors.primaryColor} />;
      } else {
        return <DownloadIcon />;
      }
    } else {
      if (isEarned) {
        return <EarnedIcon />;
      }
      return <PracticeTypeIcon practiceType={practiceType} />;
    }
  };
  let renderIconRight = (isDownloaded, isEarned) => {
    if (type === 'listCourse') {
      if (isDownloaded) {
        return (
          <TouchableOpacity style={styles.btnCountiues} onPress={onPressPlay}>
            <ContinueIcon />
          </TouchableOpacity>
        );
      } else {
        return <View style={styles.containerSpacePlayIcon} />;
      }
    } else {
      if (isEarned) {
        return (
          <Text
            MontserratSB
            fs14
            secondary
            transKey={'learn.skillchoose.earned'}
          />
        );
      }
      return <View style={styles.containerSpacePlayIcon} />;
    }
  };

  const renderItem = ({item, index}) => {
    let {
      firstPoint,
      isDownloaded,
      thirdPoint,
      secondPoint,
      fourthPoint,
      title,
      isEarned,
      practiceType,
      uri,
      lesson,
    } = item;
    var dataFilterLanguage = {};
    item.lessonTranslations.map((item, index) => {
      if (item.language.code === i18n.language) {
        dataFilterLanguage = item;
      }
    });
    let _handleOnPress = () => {
      // if (type === 'listCourse') {
      //   if (isDownloaded) {
      //     navigate(ScreenName.LEARN_SKILLCHOOSE_SCREEN, {unit: '0'});
      //   }
      // } else {
      //   navigate(ScreenName.LEARN_PRACTICE_SCREEN);
      // }
    };
    return (
      <TouchableOpacity
        key={'listCourse' + index}
        onPress={_handleOnPress}
        style={[
          styles.itemContainerStyle,
          styleContainerItem,
          {
            borderTopWidth: index === 0 ? 0.5 : 0,
            backgroundColor: colors.PRIMARY_BACKGROUND_COLOR,
          },
        ]}>
        <TouchableOpacity
          style={styles.iconLeftView}
          disabled={isDownloaded}
          onPress={onPressDownload && onPressDownload()}>
          {renderIconLeft(isDownloaded, isEarned, practiceType)}
          <Text MontserratSB fs12 mgt5>
            {dataFilterLanguage.name}
          </Text>
        </TouchableOpacity>
        <View style={styles.mainContentItemCourse}>
          <Text MontserratSB fs14 secondary={isEarned}>
            {dataFilterLanguage.description || ''}
          </Text>
          <View style={styles.containerPoint}>
            {renderPoint('firstPoint', true)}
            {renderPoint('secondPoint', true)}
            {renderPoint('thirdPoint', true)}
            {renderPoint('fourthPoint', true)}
          </View>
        </View>
        <View style={styles.iconRightView}>
          {renderIconRight(isDownloaded, isEarned)}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.containerCarousel, styleContainerCarousel]}>
      {listType === 'flatlist' ? (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => (item.id ? item.id : index)}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        data?.map((item, index) => {
          return renderItem({item, index});
        })
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  containerCarousel: {
    flex: 1,
    // paddingBottom: 100,
  },
  itemContainerStyle: {
    flexDirection: 'row',
    backgroundColor: Colors.WHITE,
    justifyContent: 'space-between',
    flex: 1,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: Colors.colorBorder,
  },
  iconLeftView: {
    width: 60,
    alignItems: 'center',
  },
  mainContentItemCourse: {
    // justifyContent: 'space-around',
    alignItems: 'flex-start',
    flex: 1,
    paddingHorizontal: 5,
  },
  containerPoint: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  iconRightView: {
    position: 'absolute',
    textAlign: 'center',
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  btnCountiues: {
    justifyContent: 'center',
    // position: 'absolute',
    alignItems: 'center',
  },
  containerPointDetail: {
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: 10,
    width: 25,
  },
  containerSpacePlayIcon: {
    height: 26,
    width: 26,
  },
});

export default ListCourse;
