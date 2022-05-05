/* eslint-disable prettier/prettier */
import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import TabBarItem from './TabBarItem';
import {isIphoneXorAbove} from '~/utils/configuration';
import {useTheme} from '@react-navigation/native';

const TabBarComponent = props => {
  const {state} = props;
  const {routes} = state;
  const {colors} = useTheme();
  return (
    <>
      <View
        style={[
          styles.containerBottomTab,
          {backgroundColor: colors.BOTTOM_BAR_BG_COLOR},
        ]}>
        {routes.map((item, index) => {
          return (
            <TabBarItem
              key={item.key}
              route={item}
              navigation={props.navigation}
              index={index}
              active={index === state.index}
            />
          );
        })}
      </View>
    </>
  );
};

export default TabBarComponent;

const styles = StyleSheet.create({
  containerBottomTab: {
    height: isIphoneXorAbove() ? 75 : 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
