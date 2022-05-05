/* eslint-disable prettier/prettier */
import React from 'react';
import {
  FlatList,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import {LearnCheckIcon, LearnUnCheckIcon, PlaycirleIcon} from '~/assets/icons';
import {
  AppHeader,
  CenterModal,
  HeaderComponent,
  Text,
} from '~/component/componentExtension';
import SentenceCardKnowledgeComponent from '~/component/learn/knowledge/SentenceCardKnowledgeComponent';
import {Colors} from '~/utils';

let renderSeperator = () => {
  return <View height={6} />;
};

export default function KnowledgeComponent({
  onPressBack,
  onPressStart,
  onPressAll,
  onItemPressMic,
  onItemPressSelect,
  isSelectAll,
  isShowWork,
  wordSelected,
  data,
  initWordIndex,

  //for rework component
  number,
  onPressControl,
  currentStatus,
  currentIndex,
  handleMove,
}) {
  let renderItem = ({item, index}) => {
    return (
      <SentenceCardKnowledgeComponent onPressMic={onItemPressMic} {...item} />
    );
  };

  return (
    <AppHeader style={styles.container}>
      <StatusBar hidden={false} backgroundColor={Colors.Teal_Blue} />
      <HeaderComponent
        title="Unit 0"
        subTitle="Alphabet Hiragana, Katakana, Number"
      />
      <View style={styles.main}>
        <View style={styles.sentencesView}>
          <FlatList
            contentContainerStyle={{paddingHorizontal: 25}}
            data={data}
            renderItem={renderItem}
            keyExtractor={s => s.id}
            ItemSeparatorComponent={renderSeperator}
          />
        </View>
      </View>
    </AppHeader>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  main: {
    flex: 1,
  },
  controlView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  side: {
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#00000020',
  },
  center: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  btnSelectAll: {
    position: 'absolute',
    left: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  start: {
    position: 'absolute',
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sentencesView: {
    paddingTop: 10,
    flex: 1,
  },
});
