import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {SocialIcon} from '~/assets/icons';

export default SocialIconComponent = ({name, onPressSocial, style}) => {
  let _onPress = () => {
    onPressSocial && onPressSocial(name);
  };
  return (
    <TouchableOpacity onPress={_onPress}>
      <View style={[styles.viewIcon, style]}>
        <View style={styles.icon}>
          <SocialIcon name={name} width={27} height={27} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

let styles = StyleSheet.create({
  viewIcon: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    // borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 45,
    height: 45,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  icon: {
    borderRadius: 10,
    overflow: 'hidden',
  },
});
