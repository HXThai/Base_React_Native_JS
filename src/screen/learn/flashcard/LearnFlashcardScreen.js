import React, {
  useCallback,
  useContext,
  useState,
  useRef,
  useEffect,
} from 'react';
import TrackPlayer, {Capability, RepeatMode} from 'react-native-track-player';
import FlashcardComponent from '~/component/learn/flashcard/flashcardComponent';
import {useMockFlashcard, useForceUpdate} from '~/component/customHook';

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

export default function LearnFlashcardScreen({navigation}) {
  let [learnLanguage, setLearnLanguage] = useState('en');
  let {data, isLoading} = useMockFlashcard({
    learnLanguage,
    lesson: 'lesson_03',
  });
  let forceUpdate = useForceUpdate();
  let all = useRef(new Set());
  let memorized = useRef(new Set());
  let notmemorized = useRef(new Set());
  let arrayIndex = useRef([]);
  let dropdownRef = useRef(null);
  let [currentIndex, setCurrentIndex] = useState(0);
  let [currentType, setcurrentType] = useState(2);

  useEffect(() => {
    if (!isLoading) {
      data.map((e, index) => {
        notmemorized.current.add(index);
        all.current.add(index);
      });
      forceUpdate();
      setupIfNecessary();
      console.log('loading done');
      return () => {
        TrackPlayer.destroy();
      };
    }
  }, [isLoading]);

  useEffect(() => {
    forceUpdate();
  }, [currentType]);
  arrayIndex.current =
    currentType === 0
      ? all.current
      : currentType === 1
      ? memorized.current
      : notmemorized.current;
  let _handleOnPressButton = useCallback(
    async ({side}) => {
      setCurrentIndex(currentIndex => {
        let arr = Array.from(arrayIndex.current);
        console.log({side, currentIndex, length: arr.length});
        if (side === 'left' && arr.length > 0) {
          if (currentIndex > 0) return currentIndex - 1;
          else return arr.length - 1;
        }
        if (side === 'right' && arr.length > 0) {
          if (arr.length - 1 === currentIndex) return 0;
          else return currentIndex + 1;
        } else {
          return currentIndex;
        }
      });
      await TrackPlayer.reset();
    },
    [data],
  );

  let _handleDropdownSelect = useCallback((item, index) => {
    console.log({item, index});
    let checkCard =
      index === 0
        ? all.current
        : index === 1
        ? memorized.current
        : notmemorized.current;
    if (!checkCard.size) return false;
    setcurrentType(index);
    setCurrentIndex(0);
  });

  let handleOnIndexOutSide = () => {
    let arr = Array.from(arrayIndex.current);
    console.log('handleOnIndexOutSide', arr[currentIndex]);
    if (arr.length > 0) {
      return setCurrentIndex(arr.length - 1);
    } else {
      if (currentType === 1 && notmemorized.current.size > 0) {
        _handleDropdownSelect(null, 2);
        return dropdownRef.current?.pickItemByIndex?.(2);
      }
      if (currentType === 2 && memorized.current.size > 0) {
        _handleDropdownSelect(null, 1);
        return dropdownRef.current?.pickItemByIndex?.(1);
      }
    }
  };

  let _onPressMemo = useCallback(() => {
    let arr = Array.from(arrayIndex.current);
    let realIndex = arr?.[currentIndex];
    if (isNaN(realIndex)) {
      console.log({realIndex});
      return;
    }
    console.log(currentIndex, memorized.current.has(realIndex));
    if (memorized.current.has(realIndex)) {
      memorized.current.delete(realIndex);
      notmemorized.current.add(realIndex);
    } else {
      memorized.current.add(realIndex);
      notmemorized.current.delete(realIndex);
    }
    handleOnIndexOutSide();
    forceUpdate();
  });
  let _playVoice = async () => {
    await TrackPlayer.reset();
    await TrackPlayer.add([{title: '1', index: 0, url: voice_file}]);
    await TrackPlayer.seekTo(0);
    await TrackPlayer.setRepeatMode(RepeatMode.Off);
    await TrackPlayer.play();
  };
  let arr = Array.from(arrayIndex.current);
  let currentItem = data?.[arr?.[currentIndex]];
  let subject = currentItem?.subject_translations?.ja;
  let content = currentItem?.content_translations?.[learnLanguage];
  let explanation = currentItem?.explanation_translations?.[learnLanguage];
  let example_trans = currentItem?.example_translations?.[learnLanguage];
  let example = currentItem?.example_translations?.['ja'];
  let picture_file = currentItem?.picture_file;
  let voice_file = currentItem?.voice_file;
  let isCurrentMemorizied = memorized.current.has(arr?.[currentIndex]);

  return (
    <FlashcardComponent
      dropdownRef={dropdownRef}
      onDropdownSelect={_handleDropdownSelect}
      onPressButton={_handleOnPressButton}
      onPressMemo={_onPressMemo}
      onPlayVoice={_playVoice}
      subject={subject}
      content={content}
      explanation={explanation}
      example={example}
      example_trans={example_trans}
      picture_file={picture_file}
      voice_file={voice_file}
      isCurrentMemorizied={isCurrentMemorizied}
    />
  );
}
