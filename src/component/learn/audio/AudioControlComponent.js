/* eslint-disable prettier/prettier */
import React, {useCallback, useContext, useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import AppHeader from '~/component/componentExtension/AppHeader';
import {
  Text,
  HeaderComponent,
  Button,
  TextInputComponent,
} from '~/component/componentExtension';
import * as Colors from '~/utils/Colors';
import EmailIcon from '~/assets/icons/emailIcon';
import {Sizes} from '~/utils/fontSize';
import Sizings from '~/utils/sizings';
import {myWidth, persentlWidth} from '~/utils/dimension';
import {
  RepeatIcon,
  AudioIcon,
  SpeakerIcon,
  SpeedReadIcon,
} from '~/assets/icons';
// import Slider from '@react-native-community/slider';
import Slider from 'react-native-slider';
import TrackPlayer, {State, RepeatMode} from 'react-native-track-player';

export default function AudioControlComponent({
  currentIndex,
  total,
  onControlPress,
  onSlidingComplete,
  playbackState,
}) {
  let [vol, setVol] = useState(0);
  let [lastVol, setLastVol] = useState(0);
  let [speed, setSpeed] = useState(0);
  let [lastSpeed, setLastSpeed] = useState(0);
  let [repeatMode, setrepeatMode] = useState(RepeatMode.Off);
  useEffect(_ => {
    TrackPlayer.getVolume().then(e => {
      setVol(e);
      e > 0 && setLastVol(e);
    });
    TrackPlayer.getRepeatMode().then(e => {
      setrepeatMode(e);
    });
    TrackPlayer.getRate().then(e => {
      setSpeed(e);
      e > 0 && setLastSpeed(e);
    });
  }, []);
  let _onSlidingComplete = val => {
    setVol(val);
    val > 0 && setLastVol(val);
    console.log({vol});
    TrackPlayer.setVolume(val);
  };

  const onSetSpeed = async val => {
    console.log('speed', val);
    setSpeed(val);
    await TrackPlayer.setRate(val);
    val > 0 && setLastSpeed(val);
  };

  let _onVolPress = () => {
    console.log('tjha');
    TrackPlayer.getVolume().then(e => {
      if (e > 0) {
        setLastVol(e);
        setVol(0);
        TrackPlayer.setVolume(0);
      } else {
        setVol(lastVol > 0 ? lastVol : 0.5);
        TrackPlayer.setVolume(lastVol > 0 ? lastVol : 0.5);
      }
    });
  };
  const toggleRepeatMode = async value => {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    if (currentTrack == null) {
      // TODO: Perhaps present an error or restart the playlist?
    } else {
      if (value !== RepeatMode.Track) {
        await TrackPlayer.setRepeatMode(RepeatMode.Track);
        setrepeatMode(RepeatMode.Track);
      } else {
        await TrackPlayer.setRepeatMode(RepeatMode.Off);
        setrepeatMode(RepeatMode.Off);
      }
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.line1}>
        <TouchableOpacity
          onPress={_ => toggleRepeatMode(repeatMode)}
          style={styles.line1Info}>
          <RepeatIcon
            width={repeatMode !== RepeatMode.Off ? 21 : 26}
            height={repeatMode !== RepeatMode.Off ? 21 : 26}
            status={repeatMode === RepeatMode.Off}
          />
        </TouchableOpacity>
        <View style={styles.bar}>
          <Slider
            style={styles.progressContainer}
            value={isNaN(currentIndex) ? 0 : currentIndex}
            minimumValue={0}
            maximumValue={isNaN(total) ? 0 : total}
            thumbTintColor="#414035"
            minimumTrackTintColor="#414035"
            maximumTrackTintColor="#BBBBBB"
            thumbStyle={styles.thumbStyle}
            onSlidingComplete={onSlidingComplete}
          />
        </View>
        <View style={styles.line1Info}>
          <Text fs14 MontserratBold>
            {`${currentIndex}/${total}`}
          </Text>
        </View>
      </View>
      <View style={styles.line2}>
        <View style={styles.line2Info}>
          <TouchableOpacity onPress={_onVolPress} style={styles.volumeButton}>
            <SpeakerIcon
              width={!vol ? 33 : 28}
              height={!vol ? 28 : 28}
              status={vol !== 0}
              color={vol ? '#414035' : '#CBCBCD'}
            />
          </TouchableOpacity>
          <View style={styles.volumeBar}>
            <Slider
              style={styles.progressVolumeContainer}
              value={vol}
              minimumValue={0}
              maximumValue={1}
              thumbTintColor="#414035"
              minimumTrackTintColor="#414035"
              maximumTrackTintColor="#BBBBBB"
              thumbStyle={styles.thumbStyle}
              onSlidingComplete={_onSlidingComplete}
            />
          </View>
        </View>
        <View style={styles.controlView}>
          <TouchableOpacity
            onPress={_ => onControlPress({button: 'previous'})}
            style={styles.controlButton}>
            <AudioIcon width={30} height={30} name="previous" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={_ =>
              onControlPress({button: 'playStop', action: playbackState})
            }
            style={styles.controlButton}>
            <AudioIcon
              width={playbackState === State.Playing ? 16 : 34}
              height={playbackState === State.Playing ? 20 : 34}
              name={playbackState !== State.Playing ? 'play' : 'stop'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={_ => onControlPress({button: 'next'})}
            style={styles.controlButton}>
            <AudioIcon width={30} height={30} name="next" />
          </TouchableOpacity>
        </View>
        <View style={styles.line2Info}>
          <View style={styles.speedReadIconStyle}>
            <SpeedReadIcon />
          </View>
          <View style={styles.volumeBar}>
            <Slider
              style={styles.progressVolumeContainer}
              value={speed}
              minimumValue={0}
              maximumValue={1}
              thumbTintColor="#414035"
              minimumTrackTintColor="#414035"
              maximumTrackTintColor="#BBBBBB"
              thumbStyle={styles.thumbStyle}
              onSlidingComplete={onSetSpeed}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    height: 100,
    // backgroundColor: 'grey',
    width: myWidth,
  },
  line1: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: '#00000064',
  },
  line1Info: {
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bar: {
    // backgroundColor: '#00000064',
    height: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressContainer: {
    height: 5,
    width: myWidth - 120,
    // flexDirection: 'row',
    // backgroundColor: 'white',
  },
  barPlayed: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 3,
    width: persentlWidth(40),
    backgroundColor: '#DC8D8D',
  },

  line2: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },

  controlView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  line2Info: {
    width: persentlWidth(30),
    // backgroundColor: 'grey',
    alignItems: 'center',
    flexDirection: 'row',
  },
  controlButton: {
    width: 35,
    alignItems: 'center',
    // marginHorizontal: 5,
  },
  volumeButton: {
    marginLeft: 5,
    // width: 0,
  },
  volumeBar: {
    height: 10,
    // backgroundColor: 'red',
    flex: 1,
  },

  progressVolumeContainer: {
    height: 10,
    flex: 1,
    width: persentlWidth(20),
  },
  thumbStyle: {
    height: 10,
    width: 10,
  },
  speedReadIconStyle: {
    marginRight: 8,
  },
});
