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
import ReWorkComponent from '~/component/learn/speak/ReWorkComponent';
import SentenceCardComponent from '~/component/learn/speak/SentenceCardComponent';
import {Colors} from '~/utils';

let renderSeperator = () => {
  return <View height={6} />;
};

export default function LearnSpeakComponent({
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
      <SentenceCardComponent
        onPressMic={onItemPressMic}
        onPressSelect={onItemPressSelect}
        {...item}
      />
    );
  };

  return (
    <AppHeader style={styles.container}>
      <StatusBar hidden={false} backgroundColor={Colors.Teal_Blue} />
      <HeaderComponent title="Unit 1" subTitle="Self introduction" />
      <View style={styles.main}>
        <View style={styles.controlView}>
          <TouchableOpacity onPress={onPressAll} style={styles.side}>
            {isSelectAll ? <LearnCheckIcon /> : <LearnUnCheckIcon />}
          </TouchableOpacity>
          <View style={styles.center}>
            <TouchableOpacity style={styles.btnSelectAll}>
              <Text MontserratBold transKey={'learn.speak.selectAll'} />
            </TouchableOpacity>
            <Text MontserratBold>{`${Array.from(wordSelected).length}/${
              data?.length ? data.length : 0
            }`}</Text>
            <TouchableOpacity onPress={onPressStart} style={styles.start}>
              <PlaycirleIcon color="#414035" />
              <Text ml5 MontserratBold transKey={'learn.speak.start'} />
            </TouchableOpacity>
          </View>
        </View>
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
      <CenterModal
        isBackIcon={true}
        title={'learn.speak.rework'}
        isVisible={isShowWork}
        onDismissModal={onPressBack}
        onBackdropPress={onPressBack}>
        <ReWorkComponent
          data={data}
          wordSelected={Array.from(wordSelected)}
          initWordIndex={initWordIndex}
          originText={data?.[0]?.originText}
          onPressBack={onPressBack}
          currentStatus={currentStatus}
          currentIndex={currentIndex}
          handleMove={handleMove}
          onPressControl={onPressControl}
          number={number}
        />
      </CenterModal>
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
