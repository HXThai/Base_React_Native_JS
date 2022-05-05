/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, TouchableOpacity, FlatList, View} from 'react-native';
import * as Colors from '~/utils/Colors';
import Text from './Text';

const CarouselComponent = ({
  data,
  onPress,
  styleContainerItem,
  styleContainerCarousel,
  itemComponent,
  keyExtractor,
}) => {
  const renderItem = ({item, index}) => (
    <TouchableOpacity
      onPress={_ => onPress && onPress({item, index})}
      style={[
        styles.itemContainerStyle,
        styleContainerItem,
        {marginRight: data?.length == index + 1 ? 0 : 10},
      ]}>
      {itemComponent && itemComponent({item, index})}
    </TouchableOpacity>
  );

  return (
    <View style={[styles.containerCarousel, styleContainerCarousel]}>
      <FlatList
        horizontal={true}
        data={data}
        renderItem={renderItem}
        keyExtractor={
          typeof keyExtractor !== 'function' ? item => item?.id : keyExtractor
        }
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerCarousel: {
    height: 213,
  },
  itemContainerStyle: {
    width: 190,
    borderRadius: 13,
    backgroundColor: Colors.WHITE,
    // marginRight: 10,
  },
});

export default CarouselComponent;
