/* eslint-disable prettier/prettier */
import React, {useContext, useState, useMemo, useCallback} from 'react';
import * as Colors from '~/utils/Colors';
import {StyleSheet, View, StatusBar, Image} from 'react-native';
import {
  Text,
  HeaderComponent,
  Button,
  Card,
  CarouselComponent,
  ListCourse,
  BackgroundGardient,
} from '~/component/componentExtension';
import {useTheme} from '@react-navigation/native';
import sizings from '~/utils/sizings';
import {myWidth, persentlWidth} from '~/utils/dimension';
export default function ListLargeCourse({onPress, data}) {
  let renderItem = ({item}) => {
    return (
      <View style={styles.itemView}>
        <Image height={118} source={item.image} />
        <Text noTextDarkTheme fs17 MontserratSB>
          {item.title}
        </Text>
        <Text noTextDarkTheme fs17 Montserrat>
          {item.courseUnit}
        </Text>
        <Text noTextDarkTheme fs8 Montserrat>
          {item.description}
        </Text>
      </View>
    );
  };
  return (
    <View style={styles.courseView}>
      <View style={styles.courseTitle}>
        <Text primary fs20 PoppinsMedium transKey={'course.moreCourse'} />
        <Text
          primary
          fs14
          PoppinsMedium
          style={{color: '#A6978A'}}
          transKey={'course.chooseOtherCourse'}
        />
      </View>
      <CarouselComponent
        data={data}
        onPress={onPress}
        itemComponent={renderItem}
        styleContainerCarousel={styles.styleContainerCarousel}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},

  courseView: {
    alignSelf: 'center',
    backgroundColor: '#E7E49C',
    height: 300,
    width: sizings.percent_90,
    overflow: 'visible',
    borderRadius: 20,
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  styleContainerCarousel: {
    marginLeft: -persentlWidth(5),
    width: myWidth,
  },
  courseTitle: {
    marginHorizontal: 20,
    height: 40,
    // backgroundColor: 'grey',
  },
});
