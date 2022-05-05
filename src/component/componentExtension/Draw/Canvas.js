import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import {Animated, Dimensions, StyleSheet, View} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {useSharedValue, runOnUI, runOnJS} from 'react-native-reanimated';
import {
  DEFAULT_BRUSH_COLOR,
  DEFAULT_OPACITY,
  DEFAULT_THICKNESS,
  DEFAULT_TOOL,
} from './constants';
import {useForceUpdate} from '~/component/customHook';

import SVGRenderer from './renderer/SVGRenderer';
import RendererHelper from './renderer/RendererHelper';
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const Canvas = forwardRef(
  (
    {
      color = DEFAULT_BRUSH_COLOR,
      thickness = DEFAULT_THICKNESS,
      opacity = DEFAULT_OPACITY,
      style,
      height = 300,
      width = screenWidth,
      simplifyOptions = {},
      onPathsChange,
      tool = DEFAULT_TOOL,
      combineWithLatestPath = false,
    },
    ref,
  ) => {
    simplifyOptions = {
      ...simplifyOptions,
      simplifyPaths: true,
      simplifyCurrentPath: false,
      amount: 15,
      roundPoints: true,
    };
    let force = useForceUpdate();
    let path = useSharedValue([]);
    let paths = useSharedValue([]);
    let currentPath = useSharedValue('');

    const undo = () => {
      let processPaths = paths.value;
      paths.value = processPaths.reduce((acc, p, index) => {
        if (index === processPaths.length - 1) {
          if (p.path.length > 1) {
            return [
              ...acc,
              {
                ...p,
                path: p.path.slice(0, -1),
              },
            ];
          }
          return acc;
        }
        return [...acc, p];
      }, []);
      force();
      currentPath.value = '';
    };
    const clear = () => {
      paths.value = [];
      path.value = [];
      currentPath.value = '';
      force();
    };

    useImperativeHandle(ref, () => ({
      undo,
      clear,
    }));
    useEffect(
      () => onPathsChange && onPathsChange(paths),
      [paths, onPathsChange],
    );

    let createSVGPath = points => {
      'worklet';
      try {
        return points
          .map((e, i) => {
            return `${i === 0 ? 'M' : 'L'}${e[0]},${e[1]}`;
          })
          .join(' ');
      } catch (error) {
        console.warn(error);
        return '';
      }
    };
    const panGesture = Gesture.Pan()
      .onBegin(({x, y}) => {
        path.value = [
          ...path.value,
          [
            simplifyOptions.roundPoints ? Math.floor(x) : x,
            simplifyOptions.roundPoints ? Math.floor(y) : y,
          ],
        ];
      })
      .onChange(({x, y}) => {
        path.value = [
          ...path.value,
          [
            simplifyOptions.roundPoints ? Math.floor(x) : x,
            simplifyOptions.roundPoints ? Math.floor(y) : y,
          ],
        ];
        currentPath.value = createSVGPath(path.value);
        runOnJS(force)();
      })
      .onEnd(() => {
        const newSVGPath = createSVGPath(path.value);
        if (paths.value.length === 0) {
          paths.value = [
            {
              color,
              path: [newSVGPath],
              thickness,
              opacity,
              combine: combineWithLatestPath,
            },
          ];
        } else {
          const lastPath = paths.value.pop();
          if (
            lastPath &&
            lastPath.color === color &&
            lastPath.thickness === thickness &&
            lastPath.opacity === opacity
          ) {
            let x = JSON.parse(JSON.stringify(lastPath));
            x.path.push(newSVGPath);
            paths.value = [...paths.value, x];
          } else {
            paths.value = [
              ...paths.value,
              lastPath,
              {
                color,
                path: [newSVGPath],
                thickness,
                opacity,
                combine: combineWithLatestPath,
              },
            ];
          }
        }
        runOnJS(force)();
        path.value = [];
      })
      .minPointers(1)
      .minDistance(0)
      .averageTouches(false)
      .hitSlop({
        height,
        width,
        top: 0,
        left: 0,
      })
      .shouldCancelWhenOutside(true);
    return (
      <View>
        <GestureDetector gesture={panGesture}>
          <View style={[styles.canvas, style]}>
            <RendererHelper
              currentColor={color}
              currentOpacity={opacity}
              currentPath={currentPath.value}
              currentThickness={thickness}
              currentPathTolerance={
                simplifyOptions.simplifyCurrentPath ? simplifyOptions.amount : 0
              }
              roundPoints={simplifyOptions.roundPoints}
              paths={paths.value}
              height={height}
              width={width}
              Renderer={SVGRenderer}
            />
          </View>
        </GestureDetector>
      </View>
    );
  },
);
const styles = StyleSheet.create({
  canvas: {
    backgroundColor: 'white',
  },
  canvasOverlay: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: '#000000',
  },
});
export default Canvas;
