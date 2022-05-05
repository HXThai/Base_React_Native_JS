/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Pressable} from 'react-native';
import Text from '~/component/componentExtension/Text';
import {relativeHeight} from '~/utils/dimension';
import {Colors} from '~/utils';
import {useTheme} from '@react-navigation/native';

function ButtonNav({title, isClicked, route, onPress}) {
  let color = {
    primary: isClicked,
    tertiary: !isClicked,
  };

  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text
        fs18
        MontserratBold
        {...color}
        style={styles.btnText}
        transKey={title}
      />
      <View style={[styles.line, isClicked ? styles.btnClicked : null]} />
    </Pressable>
  );
}

function NavComponent({state, descriptors, navigation, position}) {
  const {colors} = useTheme();

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: colors.PRIMARY_BACKGROUND_COLOR},
      ]}>
      <View style={styles.buttons}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({name: route.name, merge: true});
            }
          };
          return (
            <ButtonNav
              key={index + 'tabindex'}
              onPress={onPress}
              title={label}
              isClicked={isFocused}
            />
          );
        })}
      </View>
    </View>
  );
}

let styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: 50,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttons: {
    flexDirection: 'row',
  },
  button: {
    width: 150,
    height: 50,
    borderColor: 'black',
    // borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  line: {
    height: 3,
    marginVertical: 10,
    paddingHorizontal: 5,
    width: '100%',
  },
  btnClicked: {
    backgroundColor: '#414035',
    width: '100%',
    height: 3,
    borderRadius: 2,
  },
});
export default NavComponent;
