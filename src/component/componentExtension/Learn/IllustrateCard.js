import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View, Pressable} from 'react-native';
import * as Colors from '~/utils/Colors';
import {Text} from '~/component/componentExtension';
import Sizings from '~/utils/sizings';
import {persentlWidth, persentHeight} from '~/utils/dimension';
import FastImage from 'react-native-fast-image';
import {LeftIcon, RightIcon} from '~/assets/icons';
import {SvgXml} from 'react-native-svg';
var RNFS = require('react-native-fs');
import {TextSubjectTrans} from '~/component/componentExtension';

let ContainerHeight = persentHeight(30);
let ImageHeight = ContainerHeight * 0.8;

//Need optimize re-render: current render twice
let RenderImage = React.memo(({image}) => {
  if (!image)
    return (
      <View
        width={ImageHeight}
        height={ImageHeight}
        style={{backgroundColor: '#ffffff25'}}
      />
    );

  let [xml, setxml] = useState(null);
  let loading = path => {
    RNFS.exists(path)
      .then(result => {
        result &&
          RNFS.readFile(image, 'utf8')
            .then(e => setxml(e))
            .catch();
      })
      .catch();
  };
  let type = image && image.split('.').slice(-1)?.[0];

  useEffect(
    _ => {
      if (type === 'svg') {
        loading(image);
      }
    },
    [image],
  );

  return (
    <View>
      {xml ? (
        <View width={ImageHeight} height={ImageHeight}>
          <SvgXml
            fill={'black'}
            width={ImageHeight}
            height={ImageHeight}
            xml={xml}
          />
        </View>
      ) : (
        <FastImage
          style={{width: ImageHeight, height: ImageHeight}}
          source={{uri: image}}
          onError={_ => {
            console.log(_.nativeEvent);
          }}
          onLoadEnd={_ => {
            console.log(_.nativeEvent);
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
      )}
    </View>
  );
});

const IllustrateCard = ({
  onPress,
  style,
  subject_translation = '',
  content_translation = '',
  image,
  haveButton,
  onPressButton,
}) => {
  // console.log(2, {image});

  return (
    <Pressable onPress={onPress} style={[styles.container, style]}>
      <View style={styles.imageView}>
        <RenderImage image={image} />
      </View>
      <View style={styles.textView}>
        <View
          style={[
            styles.transView,
            styles.viewButton,
            !haveButton && {justifyContent: 'center'},
          ]}>
          {haveButton && (
            <TouchableOpacity
              style={styles.button}
              onPress={_ => onPressButton && onPressButton({side: 'left'})}>
              <LeftIcon />
            </TouchableOpacity>
          )}
          <TextSubjectTrans raw={subject_translation} />

          {haveButton && (
            <TouchableOpacity
              style={styles.button}
              onPress={_ => onPressButton && onPressButton({side: 'right'})}>
              <RightIcon />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.transView}>
          <Text fs14 MontserratSB centered>
            {content_translation}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: ContainerHeight,
    width: persentlWidth(90),
    borderRadius: 20,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    alignSelf: 'center',
  },
  imageView: {width: ImageHeight, height: ImageHeight},
  textView: {
    justifyContent: 'center',
    width: Sizings.percent_100,
  },
  transView: {
    // marginVertical: 10,
  },

  viewButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  transText: {
    alignSelf: 'center',
    // backgroundColor: 'red',
  },
  button: {
    width: 50,
    height: 50,
    // borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default React.memo(IllustrateCard);
