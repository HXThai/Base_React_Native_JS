/* eslint-disable prettier/prettier */
import React, {
  useCallback,
  useContext,
  useState,
  useMemo,
  useEffect,
} from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {
  Text,
  HeaderComponent,
  Button,
  TextInputComponent,
} from '~/component/componentExtension';
import {Sizes} from '~/utils/fontSize';
import Sizings from '~/utils/sizings';
import {myWidth, persentlWidth} from '~/utils/dimension';
let TextItem = React.memo(({item, index, onPress}) => {
  let _onPress = () => {
    console.log(11);
    onPress && onPress({item, index});
  };
  return (
    <TouchableOpacity onPress={_onPress} style={styles.textItemRowView}>
      <Text fs14 MontserratSB style={{width: 30}}>
        {index + 1}
      </Text>
      <Text fs24 MontserratSB>
        {item.subject_translations.ja}
      </Text>
      <Text fs14 MontserratSB>
        {'  '}
        {item.content_translations.en}
      </Text>
      <View style={styles.line} />
    </TouchableOpacity>
  );
});

export default ListWordComponent = React.memo(({data, onItemPress}) => {
  let _renderTextItem = ({item, index}) => {
    return <TextItem item={item} index={index} onPress={onItemPress} />;
  };
  return (
    <View style={styles.listText}>
      <FlatList
        data={data}
        renderItem={_renderTextItem}
        keyExtractor={e => e.s_id}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  main: {
    flex: 1,
    alignSelf: 'center',
  },
  listText: {
    // backgroundColor: 'white',
    width: myWidth,
    borderRadius: 30,

    flex: 1,
    alignSelf: 'center',
  },
  textItemRowView: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
    paddingHorizontal: 30,
  },
  line: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: 1,
    backgroundColor: '#BBBBBB',
    width: myWidth - 60,
    marginRight: 30,
  },
});
