import * as React from 'react';
// import flattenStyle from 'react-native/StyleSheet/flattenStyle';
import {Image, View, StyleSheet} from 'react-native';
import sizings from '~/utils/sizings';
import LinearGradient from 'react-native-linear-gradient';
import {Text} from '~/component/componentExtension';
let BackgroundGardient = ({
  children,
  style,
  imageStyle,
  imageRef,
  ...props
}) => {
  let _viewRef = null;
  let _captureRef = ref => {
    _viewRef = ref;
  };
  const flattenedStyle = StyleSheet.flatten(style);
  return (
    <View
      accessibilityIgnoresInvertColors={true}
      style={style}
      ref={_captureRef}>
      <View style={[styles.containerBG, StyleSheet.absoluteFill]}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#CDA412', '#B9AB2A']}
          style={styles.linearGradient}>
          <LinearGradient
            colors={['#FFFFFF40', '#B9AB2A00']}
            style={styles.circle}
          />
          <LinearGradient
            colors={['#FFFFFF40', '#C4C4C400']}
            style={styles.smallCircle}
          />
        </LinearGradient>
      </View>
      {children}
    </View>
  );
};

let styles = StyleSheet.create({
  containerBG: {
    height: 236,
    width: sizings.percent_100,
    backgroundColor: 'grey',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
  },
  linearGradient: {
    flex: 1,
  },
  circle: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 200,
    transform: [{rotate: '-40deg'}],
    right: -50,
    top: -50,
  },
  smallCircle: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 100,
    left: 100,
    bottom: 48,
  },
});

export default BackgroundGardient;
