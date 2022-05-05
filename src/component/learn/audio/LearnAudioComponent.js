/* eslint-disable prettier/prettier */
import React, {
  useCallback,
  useContext,
  useState,
  useMemo,
  useEffect,
} from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {
  Text,
  HeaderComponent,
  Button,
  TextInputComponent,
  IllustrateCard,
  AppHeader,
} from '~/component/componentExtension';
import * as Colors from '~/utils/Colors';
import Sizings from '~/utils/sizings';
import {myWidth} from '~/utils/dimension';
import AudioControlComponent from '~/component/learn/audio/AudioControlComponent';
import ListWordComponent from '~/component/learn/audio/ListWordComponent';
import {useMockData} from '~/component/customHook';
import TrackPlayer, {
  usePlaybackState,
  useProgress,
  Capability,
  RepeatMode,
  useTrackPlayerEvents,
  Event,
  State,
} from 'react-native-track-player';
const setupIfNecessary = async ({trackList}) => {
  const currentTrack = await TrackPlayer.getCurrentTrack();
  if (currentTrack !== null) {
    return;
  }

  await TrackPlayer.setupPlayer({});
  await TrackPlayer.updateOptions({
    stopWithApp: true,
    capabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.Skip,
      Capability.SkipToNext,
      Capability.SkipToPrevious,
      Capability.Stop,
    ],
    forwardJumpInterval: 2000,
    backwardJumpInterval: 2000,
    compactCapabilities: [
      Capability.Play,
      Capability.JumpBackward,
      Capability.JumpForward,
    ],
    alwaysPauseOnInterruption: true,
  });

  await TrackPlayer.add(trackList);
  await TrackPlayer.setRate(0.8);
  await TrackPlayer.setRepeatMode(RepeatMode.Queue);
};

const togglePlayback = async playbackState => {
  const currentTrack = await TrackPlayer.getCurrentTrack();
  if (currentTrack == null) {
    console.log(1, 'currentTrack == null');
    // TODO: Perhaps present an error or restart the playlist?
  } else {
    if (playbackState !== State.Playing) {
      await TrackPlayer.play();
    } else {
      await TrackPlayer.pause();
    }
  }
};

const onSlidingComplete = async value => {
  console.log('onSlidingComplete', value);
  await TrackPlayer.skip(value);
};

export default function LearnAudioComponent({}) {
  let [learnLanguage, setLearnLanguage] = useState('en');
  let {data, lessonPath, isLoading} = useMockData({learnLanguage: 'en'});
  let [currentIndex, setCurrentIndex] = useState(0);
  const playbackState = usePlaybackState();
  let handleOneItemPress = useCallback(
    async ({item, index}) => {
      console.log({index});
      await TrackPlayer.skip(index);
      setCurrentIndex(index);
    },
    [data],
  );
  let handleOnControlPress = useCallback(
    async ({button, action}) => {
      console.log({button, action});

      switch (button) {
        case 'playStop':
          togglePlayback(action);
          return;
        case 'previous':
          await TrackPlayer.skipToPrevious();
          return;
        case 'next':
          await TrackPlayer.skipToNext();
          return;
        default:
          return;
      }
    },
    [data],
  );

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    if (
      event.type === Event.PlaybackTrackChanged &&
      event.nextTrack !== undefined
    ) {
      const track = await TrackPlayer.getTrack(event.nextTrack);
      const {title, id} = track || {};
      console.log({title, id});
      setCurrentIndex(id);
    }
  });

  useEffect(() => {
    if (!isLoading) {
      let trackList = data.map((e, index) => {
        return {
          url: e.voice_file,
          title: e?.content_translations?.en,
          artist: '',
          id: index,
        };
      });

      setupIfNecessary({trackList});
      return () => {
        TrackPlayer.destroy();
      };
    }
  }, [isLoading]);

  let _handleOnPressButton = useCallback(
    async ({side}) => {
      if (side === 'left') {
        currentIndex > 1 &&
          data.length > 1 &&
          setCurrentIndex(currentIndex - 1);
        await TrackPlayer.skip(currentIndex - 1);
      } else {
        currentIndex < data.length - 1 &&
          data.length > 1 &&
          setCurrentIndex(currentIndex + 1);
        await TrackPlayer.skip(currentIndex - 1);
      }
    },
    [data],
  );

  // let voice_file = data?.[currentIndex]?.voice_file;
  let subject_translation = data?.[currentIndex]?.subject_translations?.ja;
  let content_translation =
    data?.[currentIndex]?.content_translations?.[learnLanguage];
  let picture_file = data?.[currentIndex]?.picture_file;

  return (
    <AppHeader style={styles.container}>
      <StatusBar hidden={false} backgroundColor={Colors.Teal_Blue} />
      <HeaderComponent
        title={'Unit 0'}
        subTitle={'Alphabet Hiragana, Katakana, Number'}
      />
      <View style={styles.main}>
        {/* <View height={50} /> */}
        <IllustrateCard
          // onPress={_ => console.log('onPress IllustrateCard')}
          // onPressButton={_handleOnPressButton}
          image={picture_file}
          subject_translation={subject_translation}
          content_translation={content_translation}
          // haveButton
        />
        <AudioControlComponent
          onControlPress={handleOnControlPress}
          currentIndex={currentIndex + 1}
          total={data.length}
          playbackState={playbackState}
          onSlidingComplete={onSlidingComplete}
        />

        <ListWordComponent onItemPress={handleOneItemPress} data={data} />
      </View>
    </AppHeader>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  main: {
    flex: 1,
    alignSelf: 'center',
  },
  listText: {
    backgroundColor: 'white',
    width: myWidth,
    borderRadius: 30,
    padding: 10,
    paddingHorizontal: 30,
    flex: 1,
  },
  textItemRowView: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
  },
  line: {
    position: 'absolute',
    bottom: 0,
    height: 0.5,
    backgroundColor: '#EDEDED',
    width: Sizings.percent_100,
  },
});
