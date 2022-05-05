/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text,
  Pressable,
  TextInput,
} from 'react-native';
function ButtonComponent({title}) {
  return (
    <Pressable style={styles.button}>
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
}
let styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 56,
    backgroundColor: '#F8774A',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 20,
  },
});
export default ButtonComponent;
