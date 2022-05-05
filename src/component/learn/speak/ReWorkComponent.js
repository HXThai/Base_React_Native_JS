/* eslint-disable prettier/prettier */
import React, {useCallback} from 'react';
import {
  StyleSheet,
  View,
  Pressable,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import {Text, TextSubjectTrans} from '~/component/componentExtension';
import {myHeight, myWidth} from '~/utils';
import {useFocusEffect} from '@react-navigation/native';
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  useAnimatedGestureHandler,
} from 'react-native-reanimated';
import {
  BackIcon,
  HourGlassIcon,
  PlaycirleIcon,
  LeftIcon,
  RightIcon,
  AudioIcon,
  MicroIcon,
} from '~/assets/icons';

let ReWorkComponent = ({
  onPressBack,
  translateText,
  data,
  initWordIndex,
  wordSelected = [],

  handleMove,
  onPressControl,
  currentStatus,
  currentIndex,
  number,
}) => {
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        onPressBack && onPressBack();
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );
  const x = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: x.value,
        },
      ],
    };
  });
  let originText = data?.[wordSelected[currentIndex]]?.originText;
  return (
    <Pressable style={styles.main}>
      <View style={styles.content}>
        <View style={styles.contentView}>
          <TextSubjectTrans
            haveExplain={false}
            fsMain={{fs16: true, PoppinsMedium: true}}
            raw={originText}
          />
        </View>
        <View style={styles.control}>
          <TouchableOpacity onPress={_ => handleMove({side: 'prev'})}>
            <LeftIcon />
          </TouchableOpacity>
          <Text>{`${currentIndex + 1}/${wordSelected?.length}`}</Text>
          <TouchableOpacity onPress={_ => handleMove({side: 'next'})}>
            <RightIcon />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bottom}>
        <TouchableOpacity style={styles.hourView}>
          {currentStatus === 'recording' && (
            <>
              <MicroIcon />
              <Text>{`${number} s`}</Text>
            </>
          )}
          {currentStatus === 'playing' && (
            <>
              <Animated.View style={[styles.icon, animatedStyle]}>
                <HourGlassIcon width={26} height={26} />
              </Animated.View>

              <Text>{`${number} s`}</Text>
            </>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressControl} style={styles.start}>
          {currentStatus === 'playing' && (
            <>
              <AudioIcon width={16} height={20} name={'stop'} />
              <Text ml5 transKey={'learn.speak.stopPlaying'} />
            </>
          )}
          {currentStatus === 'recording' && (
            <>
              <AudioIcon width={16} height={20} name={'stop'} />
              <Text ml5 transKey={'learn.speak.stopRecord'} />
            </>
          )}
          {currentStatus === 'ready' && (
            <>
              <PlaycirleIcon />
              <Text ml5 transKey={'learn.speak.start'} />
            </>
          )}
        </TouchableOpacity>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: myWidth,
    height: myHeight,
    backgroundColor: '#00000078',
    zIndex: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
  main: {
    height: 320,
    backgroundColor: 'white',
    borderRadius: 20,
    width: myWidth - 100,
  },
  btnBack: {
    paddingHorizontal: 5,
  },
  title: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
  },
  content: {
    flex: 1,
    width: '100%',
  },
  control: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '60%',
    justifyContent: 'space-around',
    alignSelf: 'center',
  },
  bottom: {
    height: 40,
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  hourView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {width: 26, height: 26},
  start: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentView: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
});
export default ReWorkComponent;
