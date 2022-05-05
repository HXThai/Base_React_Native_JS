/* eslint-disable prettier/prettier */
import React, {useContext, useState, useMemo, useCallback} from 'react';
import * as Colors from '~/utils/Colors';
import {StyleSheet, View, StatusBar, TouchableOpacity} from 'react-native';
import {useIsConnected} from 'react-native-offline';
import AppHeader from '~/component/componentExtension/AppHeader';
import {
  Text,
  HeaderComponent,
  Button,
  Card,
  CarouselComponent,
  ListCourse,
  DrawLetterSpace,
  SelectDropdown,
  CenterModal,
  VideoComponent,
} from '~/component/componentExtension';
import {PreferencesContext} from '../../../PreferencesContext';
import {useTheme} from '@react-navigation/native';
import {useRealm, useQuery, Task} from '~/database';
import {navigate} from '~/screen/NavigationService';
import * as ScreenName from '~/utils/ScreenName';
import {mock} from '~/utils/MockData';

export default function ShopComponent(props) {
  const {colors} = useTheme();
  let realm = useRealm();
  const result = useQuery(Task);
  const isConnected = useIsConnected();
  const tasks = useMemo(() => result.sorted('createdAt'), [result]);
  const dataAlphabet = ['Hiragana', 'Hiragana', 'Hiragana'];
  const [isVisible, setIsVisible] = useState(false);

  const handleAddTask = useCallback(
    des => {
      if (!des) {
        return;
      }
      realm.write(() => {
        realm.create('Task', Task.generate(des));
      });
    },
    [realm],
  );

  const handleDeleteTask = useCallback(
    ({item, index}) => {
      if (item) {
        console.log('delete item');
        realm.write(() => {
          realm.delete(item);
        });
      }
    },
    [realm],
  );

  return (
    <View style={styles.container}>
      <AppHeader
        style={[
          styles.container,
          {backgroundColor: colors.PRIMARY_BACKGROUND_COLOR},
        ]}>
        <StatusBar hidden={false} backgroundColor={Colors.Teal_Blue} />
        <HeaderComponent
          backIconColor={colors.BACK_ICON_COLOR}
          title={'forDevTest.shop'}
        />
        <Button
          onPress={() => {
            realm.write(_ => {
              realm.delete(realm.objects('Units'));
            });
          }}
          title={'delete realm data'}
        />
        {/* <Text fs20 MontserratBold></Text>
        <Button
          onPress={() => {
            handleAddTask(Date.now().toString());
          }}
          title={'add task'}
        />
        <Text fs16 centered>
          Network: {isConnected ? 'Connected' : 'Disconnected'}
        </Text>
        <CarouselComponent
          data={tasks}
          onPress={handleDeleteTask}
          keyExtractor={i => i._id}
          itemComponent={({item}) => {
            return (
              <View style={{height: 50, width: 100, backgroundColor: 'tomato'}}>
                <Text>{item.description}</Text>
              </View>
            );
          }}
        />
        
        {/* <ListCourse data={dataCourse} /> */}
        <Button
          mv5
          title={'forDevTest.goToTestScreen'}
          onPress={_ => {
            navigate(ScreenName.TEST_SCREEN);
          }}
        />
        <Button
          mv5
          title={'forDevTest.goToFlashCards'}
          onPress={_ => {
            navigate(ScreenName.LEARN_FLASHCARD_SCREEN);
          }}
        />
        <Button
          mv5
          title={'forDevTest.goToAudio'}
          onPress={_ => {
            navigate(ScreenName.LEARN_AUDIO_SCREEN);
          }}
        />
        <Button
          mv5
          title={'forDevTest.goToPractice'}
          onPress={_ => {
            navigate(ScreenName.LEARN_PRACTICE_SCREEN);
          }}
        />
        <Button
          mv5
          title={'forDevTest.goToSpeak'}
          onPress={_ => {
            navigate(ScreenName.LEARN_SPEAK_SCREEN);
          }}
        />
        {/* <Button
          mv5
          title={'go to skill choose unit 0'}
          onPress={_ => {
            navigate(ScreenName.LEARN_SKILLCHOOSE_SCREEN, {unit: '0'});
          }}
        />
        <Button
          mv5
          title={'go to skill choose unit 1'}
          onPress={_ => {
            navigate(ScreenName.LEARN_SKILLCHOOSE_SCREEN, {unit: '1'});
          }}
        /> */}

        {/* <ListCourse data={dataCourse} /> */}
        {/* <View style={styles.styleDrawSpace}> */}
        {/* <DrawLetterSpace /> */}
        {/* </View> */}
        {/* <SelectDropdown
          data={dataAlphabet}
          // defaultValueByIndex={1} // use default value by index or default value
          // defaultValue={'Canada'} // use default value by index or default value
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
        <TouchableOpacity
          onPress={() => setIsVisible(!isVisible)}
          style={{
            height: 40,
            width: 80,
            backgroundColor: 'red',
          }}>
          <Text>Test modal</Text>
        </TouchableOpacity>
        <CenterModal
          title={'forDevTest.shop'}
          isVisible={isVisible}
          onDismissModal={() => setIsVisible(false)}>
          <View
            style={{height: 100, width: 100, backgroundColor: 'blue'}}></View>
        </CenterModal> */}
        {/* <VideoComponent
          urlVideo={
            'https://api.honkidenihongo.com/storage/download/lesson/medias/1022/e256ef98e16284bda1a7bdbfa806ae0e.mp4'
          }
          style={{maxHeight: 500}}
        /> */}
      </AppHeader>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  styleDrawSpace: {
    marginHorizontal: 30,
    alignSelf: 'center',
    height: 250,
    backgroundColor: 'red',
    borderRadius: 20,
  },
  styleSelectDropdown: {
    borderRadius: 1,
  },
});
