/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';
import {
  Text,
  HeaderComponent,
  AppHeader,
  AccumulateCard,
  ListCourse,
  SelectDropdown,
  CategoryHorizontal,
} from '~/component/componentExtension';
import {Sizings, myWidth, persentlWidth, Colors} from '~/utils';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {DropDownIcon, SkillChooseIcon} from '~/assets/icons';
import {useTheme} from '@react-navigation/native';

const dataCourse = [
  {
    isDownloaded: true,
    isPlaying: true,
    title: 'Hiragana -> Romaji',
    practiceType: 'reading',
    isEarned: false,
    firstPoint: 30,
    secondPoint: 30,
    thirdPoint: 30,
    fourthPoint: 85,
  },
  {
    isDownloaded: false,
    isPlaying: false,
    title: 'Katarana -> Romaji',
    practiceType: 'reading',
    isEarned: true,
    firstPoint: 11,
    secondPoint: 32,
    thirdPoint: 22,
    fourthPoint: 70,
  },
  {
    isDownloaded: false,
    isPlaying: false,
    title: 'Hiragana -> Hiragana',
    practiceType: 'listening',
    isEarned: false,
    firstPoint: 90,
    secondPoint: 100,
    thirdPoint: 100,
    fourthPoint: null,
  },
  {
    isDownloaded: false,
    isPlaying: false,
    title: 'Romaji -> Hiragana',
    practiceType: 'listening',
    isEarned: false,
    firstPoint: 100,
    secondPoint: 100,
    thirdPoint: null,
    fourthPoint: null,
  },
];
const dataAlphabet = ['Hiragana', 'Katarana'];
const dataNormal = ['Grammar', 'Work', 'Sentence', 'Test'];
const dataCategory = ['Hiragane', 'Katakana', 'Number', 'Every thing'];

let RenderSkill = ({unit, onPressSkill}) => {
  let _onPressSkill = ({data}) => {
    onPressSkill && onPressSkill({skill: data});
  };
  if (unit === '0') {
    return (
      <>
        <AccumulateCard
          backgroundLineColor={Colors.firstPointIconColor}
          currentPoint={60}
          iconComponent={
            <SkillChooseIcon
              height={57}
              width={57}
              skill="writing"
              color={Colors.firstPointIconColor}
            />
          }
          style={styles.styleCardPoint}
          data={'Write'}
          onPress={_onPressSkill}
        />
        <AccumulateCard
          backgroundLineColor={Colors.secondPointIconColor}
          currentPoint={60}
          iconComponent={
            <SkillChooseIcon
              height={57}
              width={57}
              skill="listening"
              color={Colors.secondPointIconColor}
            />
          }
          data={'Listen'}
          onPress={_onPressSkill}
          style={styles.styleCardPoint}
        />
        <AccumulateCard
          backgroundLineColor={Colors.thirdPointIconColor}
          currentPoint={60}
          iconComponent={
            <SkillChooseIcon
              height={57}
              width={57}
              skill="speaking"
              color={Colors.thirdPointIconColor}
            />
          }
          data={'Read'}
          onPress={_onPressSkill}
          style={styles.styleCardPoint}
        />
        <AccumulateCard
          backgroundLineColor={Colors.fourthPointIconColor}
          currentPoint={60}
          iconComponent={
            <SkillChooseIcon
              height={57}
              width={57}
              skill="translate"
              color={Colors.fourthPointIconColor}
            />
          }
          data={'Knowledge'}
          onPress={_onPressSkill}
          style={styles.styleCardPoint}
        />
      </>
    );
  } else {
    return (
      <>
        <AccumulateCard
          backgroundLineColor={Colors.firstPointIconColor}
          currentPoint={12}
          pointSide={'out'}
          iconComponent={
            <SkillChooseIcon skill={'card'} height={26} width={27} />
          }
          onPress={_onPressSkill}
          style={styles.smallSkillCard}
        />
        <AccumulateCard
          backgroundLineColor={Colors.secondPointIconColor}
          currentPoint={33}
          pointSide={'out'}
          iconComponent={
            <SkillChooseIcon skill={'listening'} height={26} width={27} />
          }
          onPress={_onPressSkill}
          style={styles.smallSkillCard}
        />
        <AccumulateCard
          backgroundLineColor={Colors.thirdPointIconColor}
          currentPoint={91}
          pointSide={'out'}
          iconComponent={
            <SkillChooseIcon skill={'speaking'} height={26} width={27} />
          }
          onPress={_onPressSkill}
          style={styles.smallSkillCard}
        />
        <AccumulateCard
          backgroundLineColor={Colors.fourthPointIconColor}
          currentPoint={22}
          pointSide={'out'}
          iconComponent={
            <SkillChooseIcon skill={'translate'} height={37} width={36} />
          }
          onPress={_onPressSkill}
          style={styles.smallSkillCard}
        />
        <AccumulateCard
          backgroundLineColor={Colors.fourthPointIconColor}
          currentPoint={22}
          pointSide={'out'}
          iconComponent={
            <SkillChooseIcon skill={'video'} height={37} width={36} />
          }
          onPress={_onPressSkill}
          style={styles.smallSkillCard}
        />
      </>
    );
  }
};

export default SkillChooseComponent = ({unit, onPressSkill}) => {
  const {colors} = useTheme();
  let dataDropDown = unit === '0' ? dataAlphabet : dataNormal;

  return (
    <AppHeader
      style={[
        styles.container,
        {backgroundColor: colors.PRIMARY_BACKGROUND_COLOR},
      ]}>
      <StatusBar hidden={false} backgroundColor={Colors.Teal_Blue} />
      <HeaderComponent
        backIconColor={colors.BACK_ICON_COLOR}
        title={'learn.skillchoose.header'}
        subTitle={'Alphabet Hiragana, Katakana, Number'}
      />
      <View style={styles.main}>
        {/* <View style={styles.charSelectView}>
          <Text fs18 transKey={'learn.skillchoose.pleaseSelect'} />
          <SelectDropdown
            renderDropdownIcon={_ => <DropDownIcon />}
            data={dataDropDown}
            defaultValueByIndex={0}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
          />
        </View> */}
        {/* <CategoryHorizontal data={dataCategory} /> */}
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <Text
            fs24
            mv10
            MontserratSB
            transKey={'learn.skillchoose.basiclevel'}
          />
          <View style={styles.cardView}>
            <View style={styles.containerPointCard}>
              <RenderSkill unit={unit} onPressSkill={onPressSkill} />
            </View>
          </View>
          <View style={styles.listView}>
            <Text
              mv10
              fs17
              MontserratSB
              transKey={'learn.skillchoose.practice'}
            />
            {/* <ListCourse
              type={'practice'}
              styleContainerItem={styles.styleContainerItem}
              data={dataCourse}
              listType={'arraymap'}
            /> */}
          </View>
          {unit !== '0' && (
            <>
              <Text
                fs24
                mv10
                MontserratSB
                transKey={'learn.skillchoose.advancedlevel'}
              />
              <View style={styles.cardView}>
                {/* <View style={styles.containerPointCard}>{renderSkill()}</View> */}
              </View>
              <View style={styles.listView}>
                <Text
                  mv10
                  fs17
                  MontserratSB
                  transKey={'learn.skillchoose.practice'}
                />
                {/* <ListCourse
                  type={'practice'}
                  styleContainerItem={styles.styleContainerItem}
                  data={dataCourse}
                  listType={'arraymap'}
                /> */}
              </View>
            </>
          )}
        </KeyboardAwareScrollView>
      </View>
    </AppHeader>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    flex: 1,
    alignSelf: 'center',
  },
  charSelectView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: persentlWidth(80),
  },
  cardView: {
    alignSelf: 'center',
    width: persentlWidth(80),
  },
  containerPointCard: {
    width: Sizings.percent_100,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 10,
  },
  styleCardPoint: {
    marginTop: myWidth * 0.035,
  },
  smallSkillCard: {
    height: 65,
    width: 65,
  },
  listView: {
    marginTop: 20,
    alignSelf: 'center',
    width: persentlWidth(80),
    flex: 1,
  },
  styleContainerItem: {
    backgroundColor: 'transparent',
  },
});
