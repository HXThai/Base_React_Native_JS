import React, {useCallback, useState, useEffect, useRef} from 'react';
import KnowledgeComponent from '~/component/learn/knowledge/KnowledgeComponent';
import {useMockSpeak, useTimer, useCountDown} from '~/component/customHook';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
const audioRecorderPlayer = new AudioRecorderPlayer();
import {requestPermission} from '~/utils';
import TrackPlayer, {
  Capability,
  RepeatMode,
  useTrackPlayerEvents,
  Event,
} from 'react-native-track-player';
const setupIfNecessary = async () => {
  const currentTrack = await TrackPlayer.getCurrentTrack();
  if (currentTrack !== null) {
    return;
  }

  await TrackPlayer.setupPlayer({});
  await TrackPlayer.updateOptions({
    stopWithApp: true,
    capabilities: [Capability.Play, Capability.Stop],
    alwaysPauseOnInterruption: true,
  });

  await TrackPlayer.setRate(0.8);
  await TrackPlayer.setRepeatMode(RepeatMode.Queue);
};
export default function KnowledgeScreen({navigation}) {
  let [learnLanguage, setLearnLanguage] = useState('en');
  let [recordUri, setrecordUri] = useState('');
  let [isSelectAll, setisSelectAll] = useState(false);
  let [isShowWork, setisShowWork] = useState(false);
  let wordSelected = useRef(new Set()).current;
  let [initWordIndex, setinitWordIndex] = useState(0);
  let {data: raw, isLoading} = useMockSpeak({learnLanguage: 'en'});
  let [data, setdata] = useState([]);

  //state for rework component
  //ready - waiting user click begin
  //recording - record user voice in 5s
  //playing - play use voice recorded before
  const [currentStatus, setCurrentStatus] = useState('ready');
  let [currentIndex, setCurrentIndex] = useState(0);
  let {number: numberTimer, timePast, start, stop, isRunning} = useTimer();
  let {number: numberCD, reset, stop: stopCD} = useCountDown();
  let currentStatusRef = useRef();
  //end rework

  useEffect(
    _ => {
      if (!isLoading) {
        setupIfNecessary();
        raw = raw.map((e, index) => {
          let isSelected = Math.random() > 0.5 ? true : false;
          if (isSelected) wordSelected.add(index);
          return {
            index,
            id: e?.number,
            originText: e?.subject_translations?.ja,
            translateText: e?.content_translations?.[learnLanguage],
            isSelected,
          };
        });
        setdata(raw);
      }
      return () => {
        TrackPlayer.destroy();
      };
    },
    [isLoading, learnLanguage],
  );

  let onItemPressSelect = useCallback(
    ({id, index, isSelected}) => {
      console.log({id, isSelected});
      if (!isSelected) {
        setisSelectAll(false);
        wordSelected.delete(index);
      } else {
        wordSelected.add(index);
      }

      setdata(old => {
        let z = [...old];
        z[index].isSelected = isSelected;
        return z;
      });
    },
    [data],
  );
  let onItemPressMic = useCallback(
    ({id, index}) => {
      setinitWordIndex(index);
      console.log({index, initWordIndex});
      onItemPressSelect({id, index, isSelected: true});
      setisShowWork(true);
    },
    [data],
  );

  let onPressAll = useCallback(() => {
    let newData = [...data];
    if (isSelectAll) {
      console.log('clear wordSelected');
      wordSelected.clear();
    }
    newData = newData.map((e, index) => {
      !isSelectAll && wordSelected.add(index);
      e.isSelected = !isSelectAll;
      return e;
    });
    setisSelectAll(!isSelectAll);
    setdata(newData);
  });
  let onPressBack = useCallback(() => {
    setisShowWork(false);
  });
  let onPressStart = useCallback(() => {
    setinitWordIndex(0);
    setisShowWork(true);
  });

  //for rework component

  let stopAll = async () => {
    await onStopRecord();
    await onStopPlay();
  };

  let onPressControl = async () => {
    console.log('_startRecord', currentStatus);
    if (currentStatus === 'ready') {
      stopAll();
      start();
      onStartRecord();
      setCurrentStatus('recording');
      return;
    }
    if (currentStatus === 'recording') {
      await TrackPlayer.reset();
      stop();
      reset(numberTimer);
      onStopRecord();
      onStartPlay();
      setCurrentStatus('playing');
      return;
    }
    if (currentStatus === 'playing') {
      stop();
      stopCD();
      stopAll();
      setCurrentStatus('ready');
      return;
    }
  };

  let onStartRecord = async () => {
    console.log('onStartRecord');
    await requestPermission();
    audioRecorderPlayer.startRecorder().then(e => {
      console.log(e);
      setrecordUri(e);
    });
    audioRecorderPlayer.addRecordBackListener(e => {
      console.log({
        recordSecs: e.currentPosition,
      });
      return;
    });
  };
  let onStopRecord = async () => {
    console.log('onStopRecord');
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    console.log(result);
  };
  let onStartPlay = async () => {
    console.log('onStartPlay');
    await TrackPlayer.reset();
    await TrackPlayer.add([
      {title: 'Your voice record', index: 0, url: recordUri},
    ]);
    await TrackPlayer.seekTo(0);
    await TrackPlayer.setRepeatMode(RepeatMode.Queue);
    await TrackPlayer.play();
  };
  let onStopPlay = async () => {
    console.log('onStopPlay');
    await TrackPlayer.reset();
  };
  let handleMove = async ({side}) => {
    let arr = Array.from(wordSelected);
    if (side === 'prev') {
      if (arr.length > 0 && currentIndex > 0) {
        stopAll();
        setCurrentIndex(_ => _ - 1);
      }
    } else {
      if (arr.length > 0 && currentIndex < arr.length - 1) {
        stopAll();
        setCurrentIndex(_ => _ + 1);
      }
    }
    stop();
    stopCD();
    await onStopRecord();
    await onStopPlay();
    setCurrentStatus('ready');
  };

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    if (
      event.type === Event.PlaybackTrackChanged &&
      event.nextTrack !== undefined
    ) {
      reset(numberTimer);
    }
  });

  useEffect(
    _ => {
      let arr = Array.from(wordSelected);
      console.log({initWordIndex});
      let hasIndex = arr.indexOf(initWordIndex);
      if (hasIndex >= 0) setCurrentIndex(hasIndex);
      return () => {
        stopAll();
      };
    },
    [initWordIndex],
  );
  currentStatusRef.current = currentStatus;
  let number = isRunning ? numberTimer : numberCD;
  //end rework component

  return (
    <KnowledgeComponent
      onItemPressSelect={onItemPressSelect}
      onItemPressMic={onItemPressMic}
      onPressAll={onPressAll}
      onPressBack={onPressBack}
      onPressStart={onPressStart}
      learnLanguage={learnLanguage}
      isSelectAll={isSelectAll}
      isShowWork={isShowWork}
      wordSelected={wordSelected}
      data={data}
      initWordIndex={initWordIndex}
      //for rework component
      onPressControl={onPressControl}
      number={number}
      handleMove={handleMove}
      currentIndex={currentIndex}
      currentStatus={currentStatus}
    />
  );
}
