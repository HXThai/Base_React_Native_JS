/* eslint-disable react/self-closing-comp */
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
} from 'react';
import {
  Animated,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  Platform,
} from 'react-native';
import {
  Canvas,
  CanvasRef,
  DrawingTool,
} from '~/component/componentExtension/Draw';
import {myWidth, persentlWidth} from '~/utils/dimension';
import {Card} from '~/component/componentExtension';
import {useTheme} from '@react-navigation/native';
import {
  EraserIcon,
  HideIcon,
  PenIcon,
  SoundIcon,
  UndoIcon,
} from '~/assets/icons';
import {Slider} from '@miblanchard/react-native-slider';
import FastImage from 'react-native-fast-image';
import GifImage from '@lowkey/react-native-gif';

const DrawLetterSpace = (
  {onVoicePress, image, style, spaceHight = 300},
  ref,
) => {
  const slidertRef = useRef(null);
  //   const canvasRef = useRef < CanvasRef > null;
  const canvasRef = useRef(CanvasRef);
  const {colors} = useTheme();

  const [thickness, setThickness] = useState(10);
  const [opacity, setOpacity] = useState(1);
  const [showImage, setShowImage] = useState(true);

  const dataColor = [
    {color: '#000000'},
    {color: '#FF0000'},
    {color: '#00FF00'},
    {color: '#0000FF'},
    {color: '#F9F400'},
    {color: '#00FFFF'},
    {color: '#FF00FF'},
    {color: '#C0C0C0'},
    {color: '#808080'},
    {color: '#800000'},
    {color: '#808000'},
    {color: '#008000'},
    {color: '#800080'},
    {color: '#008080'},
    {color: '#000080'},
    {color: '#5F379F'},
  ];

  const [valueColor, setValueColor] = useState(0);

  useEffect(() => {
    slidertRef.current = '#000000';
  }, []);

  const handleUndo = () => {
    canvasRef.current?.undo();
  };

  const handleClear = () => {
    canvasRef.current?.clear();
  };

  const renderButtonHandle = (iconComponent, typeHandle, isPen = false) => {
    return (
      <Card
        disabled={isPen}
        onPress={() => {
          switch (typeHandle) {
            case 'undo':
              handleUndo();
              break;
            case 'eraser':
              handleClear();
              break;
            case 'hide':
              console.log(typeHandle);
              setShowImage(_ => !_);
              break;
            case 'sound':
              onVoicePress && onVoicePress();
              break;
          }
        }}
        style={[
          isPen ? styles.containerCardPen : styles.containerCard,
          {
            backgroundColor: isPen ? '#FFFFFF' : colors.PRIMARY_BUTTON_COLOR,
          },
        ]}>
        {iconComponent}
      </Card>
    );
  };

  const handleSelectColor = value => {
    slidertRef.current = dataColor[value[0]].color;
    setValueColor(value[0]);
  };

  useImperativeHandle(ref, () => ({
    clear: () => {
      handleClear();
    },
  }));

  return (
    <>
      <View style={[styles.styleDrawSpace, style, {height: spaceHight}]}>
        <View style={[styles.containerBG, StyleSheet.absoluteFill]}>
          {showImage &&
            (Platform.OS === 'ios' ? (
              <FastImage
                style={{width: myWidth - 60, height: spaceHight}}
                source={{uri: image}}
                resizeMode={FastImage.resizeMode.contain}
              />
            ) : (
              <GifImage
                style={{width: myWidth - 60, height: spaceHight}}
                source={{uri: image}}
                resizeMode={FastImage.resizeMode.contain}
                paused={false}
              />
            ))}
        </View>
        <Canvas
          ref={canvasRef}
          height={spaceHight}
          width={myWidth - 60}
          color={slidertRef.current}
          thickness={thickness}
          opacity={opacity}
          tool={DrawingTool.Brush}
          style={styles.containerSpaceDraw}
        />
      </View>

      <View style={styles.containerListBtn}>
        {renderButtonHandle(<UndoIcon />, 'undo')}
        {renderButtonHandle(<EraserIcon />, 'eraser')}
        {renderButtonHandle(<HideIcon />, 'hide')}
        {renderButtonHandle(<SoundIcon />, 'sound')}
        <Slider
          ref={slidertRef}
          value={valueColor}
          onValueChange={value => handleSelectColor(value)}
          minimumValue={0}
          maximumValue={15}
          step={1}
          containerStyle={[
            styles.containerStyleSelectColor,
            {backgroundColor: slidertRef.current},
          ]}
          renderThumbComponent={() =>
            renderButtonHandle(
              <PenIcon color={slidertRef.current} />,
              'pen',
              true,
            )
          }
          trackStyle={styles.styleTrack}
          minimumTrackTintColor={'transparent'}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  styleBrush: {
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: '#f2f2f2',
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderTopColor: '#ccc',
  },
  containerSpaceDraw: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
    alignSelf: 'center',
    borderRadius: 20,
    backgroundColor: '#00000000',
  },
  styleDrawSpace: {
    marginHorizontal: 30,
    alignSelf: 'center',
    height: 253,
    borderRadius: 20,
    borderWidth: 1,
    borderStyle: 'dotted',
    // overflow: 'hidden',
  },
  containerCard: {
    height: 33,
    width: 33,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    borderRadius: 8,
  },
  containerCardPen: {
    height: 33,
    width: 33,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 8,
  },
  containerListBtn: {
    flexDirection: 'row',
    marginHorizontal: 30,
    marginTop: 10,
  },
  stylePen: {
    backgroundColor: 'white',
  },
  styleSpaceColor: {
    height: 40,
    width: 40,
    borderRadius: 8,
    marginRight: 10,
    marginTop: 10,
  },
  containerRangeColor: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginHorizontal: 30,
  },
  containerStyleSelectColor: {
    width: 120,
    height: 20,
    borderRadius: 15,
    backgroundColor: 'red',
    alignSelf: 'center',
  },
  styleTrack: {
    backgroundColor: 'transparent',
  },
});

export default forwardRef(DrawLetterSpace);
