/* eslint-disable curly */
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import * as Colors from '~/utils/Colors';
import Text from './Text';
import Card from './Card';
import Sizings from '~/utils/sizings';
import {myWidth, persentlWidth} from '~/utils/dimension';

const AccumulateCard = ({
  onPress,
  data,
  style,
  shadow,
  iconComponent,
  currentPoint = 0,
  maxPoint = 200,
  backgroundLineColor,
  pointSide = 'in',
  disable,
  skillName,
}) => {
  let percent = (currentPoint * 100) / maxPoint;
  let _onPress = () => {
    onPress && onPress({data});
  };
  let renderPoint = position => {
    if (position === pointSide)
      return (
        <View
          style={[
            styles.containerBottom,
            pointSide && styles.containerBottomOut,
          ]}>
          {!data && (
            <View style={[styles.containerLinePoint, {}]}>
              <View
                style={[
                  styles.containerCurrentPoint,
                  {width: `${percent}%`, backgroundColor: backgroundLineColor},
                ]}
              />
            </View>
          )}
          {!data && (
            <Text
              mgt5
              fs8={pointSide === 'out'}
              fs14={pointSide === 'in'}
              MontserratSB
              style={{color: backgroundLineColor}}>
              {`${currentPoint}/${maxPoint}`}
            </Text>
          )}
          {data && (
            <Text fs14 MontserratBold style={{color: backgroundLineColor}}>
              {data}
            </Text>
          )}
        </View>
      );
    else {
      return null;
    }
  };
  return (
    <View>
      <Card
        disabled={disable}
        type={shadow ? 'shadow' : 'outline'}
        onPress={_onPress}
        style={[
          styles.container,
          style,
          pointSide === 'out' && {borderRadius: 10},
        ]}>
        {iconComponent}
        {renderPoint('in')}
      </Card>
      {renderPoint('out')}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: myWidth * 0.35,
    width: myWidth * 0.35,
    borderRadius: 20,
    borderWidth: 2,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  containerLinePoint: {
    width: Sizings.percent_70,
    height: 3,
    backgroundColor: Colors.colorBorder,
    borderRadius: 2,
  },
  containerCurrentPoint: {
    height: 3,
    borderRadius: 2,
  },
  containerBottom: {
    alignItems: 'center',
    width: Sizings.percent_100,
  },
  containerBottomOut: {
    marginTop: 10,
  },
});

export default AccumulateCard;
