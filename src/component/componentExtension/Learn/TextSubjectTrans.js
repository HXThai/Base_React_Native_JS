import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View, Pressable} from 'react-native';
import {Text} from '~/component/componentExtension';

let handle = ({raw, fsMain, fsExplain, haveExplain}) => {
  let regex = /(?:<ruby>([^<]+)<rt>([^<]+)<\/rt><\/ruby>)|[^<]+/gi;
  let arr = raw.match(regex);
  if (!arr) return [];
  arr = arr.map(item => {
    let regex2 = /<ruby>([^<]+)<rt>([^<]+)<\/rt><\/ruby>/gi;
    if (!regex2.test(item)) {
      return item;
    } else {
      let c = [];
      let m = regex.exec(item);
      while (m !== null) {
        if (m.index === regex.lastIndex) {
          regex.lastIndex++;
        }
        c = [m[1], m[2]];
        m = regex.exec(item);
      }
      return c;
    }
  });

  arr = arr.map((item, index) => {
    if (typeof item === 'string') {
      return (
        <Text MontserratSB key={index} {...fsMain}>
          {item}
        </Text>
      );
    } else {
      return (
        <Text MontserratSB centered key={index}>
          {haveExplain && (
            <>
              <Text {...fsExplain}>{`${item?.[1]}`}</Text>
              {'\n'}
            </>
          )}

          <Text MontserratSB {...fsMain}>{`${item?.[0]}`}</Text>
        </Text>
      );
    }
  });

  return arr;
};

export default TextSubjectTrans = ({
  raw,
  fsMain = {fs34: true},
  fsExplain = {fs12: true},
  haveExplain = true,
}) => {
  if (!raw) return null;
  let result = handle({raw, fsMain, fsExplain, haveExplain});

  return (
    <View style={styles.transText}>
      <View style={styles.textLine}>{result}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  transText: {
    // alignSelf: 'center',
  },
  textLine: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
});
