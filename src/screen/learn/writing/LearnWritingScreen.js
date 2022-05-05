import React, {useCallback, useState, useEffect, useRef, useMemo} from 'react';
import LearnWritingComponent from '~/component/learn/writing/LearnWritingComponent';
import {useMockWriting, useForceUpdate} from '~/component/customHook';
import TrackPlayer, {Capability, RepeatMode} from 'react-native-track-player';

const setupIfNecessary = async () => {
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
      Capability.Stop,
    ],
    forwardJumpInterval: 2000,
    backwardJumpInterval: 2000,

    alwaysPauseOnInterruption: true,
  });

  await TrackPlayer.setRate(0.8);
  await TrackPlayer.setRepeatMode(RepeatMode.Off);
};
export default function LearnWritingScreen({navigation}) {
  let [learnLanguage, setLearnLanguage] = useState('en');
  let [initStatus, setinitStatus] = useState(false);
  let [currentIndex, setCurrentIndex] = useState(0);
  let [dropdownIndex, setDropdownIndex] = useState(2);
  let writingRef = useRef();
  let forceUpdate = useForceUpdate();

  //category 11 for hina
  //category 12 for kana
  let {data, lesson, isLoading} = useMockWriting({
    learnLanguage: learnLanguage,
    lesson: 'lesson_00',
    category: 11,
  });
  let dropdownRef = useRef();
  let all = useRef(new Set());
  let memorized = useRef(new Set());
  let notmemorized = useRef(new Set());
  useEffect(() => {
    if (!isLoading) {
      data.forEach((e, i) => {
        all.current.add(i);
        notmemorized.current.add(i);
      });
      setinitStatus(true);
    }
    setupIfNecessary();
    return () => {
      TrackPlayer.destroy();
    };
  }, [isLoading]);
  let arrDataNow = useMemo(
    _ => {
      if (!initStatus) return [];
      console.log('update setDataNow', {isLoading, dropdownIndex});
      if (dropdownIndex === 0) return Array.from(all.current);
      if (dropdownIndex === 1) {
        if (memorized.current.size) return Array.from(memorized.current);
        else {
          setDropdownIndex(0);
          setCurrentIndex(0);
          return Array.from(all.current);
        }
      }

      if (dropdownIndex === 2) {
        if (notmemorized.current.size) return Array.from(notmemorized.current);
        else {
          setDropdownIndex(0);
          setCurrentIndex(0);
          return Array.from(all.current);
        }
      }
    },
    [
      initStatus,
      memorized.current.size,
      notmemorized.current.size,
      dropdownIndex,
    ],
  );

  let onPressButton = ({side}) => {
    setCurrentIndex(currentIndex => {
      console.log({side, currentIndex, le: arrDataNow.length});
      writingRef.current.clear();

      if (side === 'right') {
        if (currentIndex < arrDataNow.length - 1) {
          return ++currentIndex;
        }
        return 0;
      } else {
        if (currentIndex > 0 && arrDataNow.length > 0) {
          return --currentIndex;
        }
        return arrDataNow.length - 1;
      }
    });
  };
  let onDropdownSelect = (item, index) => {
    console.log({item, index});
    if (index === 1 && memorized.current.size === 0) {
      return false;
    }
    if (index === 2 && notmemorized.current.size === 0) {
      return false;
    }
    setDropdownIndex(index);
    setCurrentIndex(0);
  };
  let onPressMemo = () => {
    if (memorized.current.has(currentIndex)) {
      memorized.current.delete(currentIndex);
      notmemorized.current.add(currentIndex);
    } else {
      memorized.current.add(currentIndex);
      notmemorized.current.delete(currentIndex);
    }
    onPressButton({side: 'right'});
    forceUpdate();
  };
  let onVoicePress = async () => {
    await TrackPlayer.reset();
    await TrackPlayer.add([
      {title: subject_translation, index: 0, url: voice_file},
    ]);
    await TrackPlayer.seekTo(0);
    await TrackPlayer.setRepeatMode(RepeatMode.Off);
    await TrackPlayer.play();
  };

  let picture_file = data[currentIndex]?.picture_file;
  let voice_file = data[currentIndex]?.voice_file;
  let writing_file = data[currentIndex]?.writing_file;
  let subject_translation = data[currentIndex]?.subject_translations?.ja_kana;
  let isCurrentMemorizied = memorized.current.has(arrDataNow[currentIndex]);
  return (
    <LearnWritingComponent
      picture_file={picture_file}
      voice_file={voice_file}
      writing_file={writing_file}
      subject_translation={subject_translation}
      isCurrentMemorizied={isCurrentMemorizied}
      onPressButton={onPressButton}
      onDropdownSelect={onDropdownSelect}
      onPressMemo={onPressMemo}
      onVoicePress={onVoicePress}
      ref={writingRef}
      dropdownRef={dropdownRef}
    />
  );
}
