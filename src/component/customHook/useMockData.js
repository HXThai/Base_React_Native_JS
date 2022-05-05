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
import AppHeader from '~/component/componentExtension/AppHeader';
import * as RNFS from 'react-native-fs';
import {mock} from '~/utils/MockData';

export default useMockData = ({learnLanguage}) => {
  let [data, setData] = useState([]);
  let [isLoading, setIsLoading] = useState(true);
  let [lessonPath, seeLessionPath] = useState(
    `file://${RNFS.DocumentDirectoryPath}/lesson/lesson_00`,
  );
  let fileMockPath = `${RNFS.DocumentDirectoryPath}/lesson/lesson_00/knowledge.json`;

  useEffect(() => {
    (async () => {
      let knowledge = false;
      try {
        console.log('load knowledge');

        knowledge = await RNFS.exists(fileMockPath);
        if (!knowledge) {
          console.log('no mock data, mocking!');
          await mock();
        }

        knowledge = await RNFS.readFile(fileMockPath, 'utf8');
        knowledge = JSON.parse(knowledge);
        console.log('finish load knowledge');
      } catch (e) {
        console.log(e);
      }
      let result = knowledge
        .filter(e => e.category == 11)
        .map(e => {
          return {
            number: e.number,
            order: e.order,
            subject_translations: {
              en: e.subject_translations.en,
              vi: e.subject_translations.vi,
              ja: e.subject_translations.ja,
              ja_romaji: e.subject_translations.ja_romaji,
              ja_kana: e.subject_translations.ja_kana,
              ja_natural: e.subject_translations.ja_natural,
              ja_short: e.subject_translations.ja_short,
            },
            content_translations: {
              en: e.content_translations.en,
              vi: e.content_translations.vi,
              ja: e.content_translations.ja,
            },
            example_translations: {
              en: e.example_translations.en,
              vi: e.example_translations.vi,
              ja: e.example_translations.ja,
            },
            voice_file: e.voice_file && `${lessonPath}/voice/${e?.voice_file}`,
            picture_file:
              e.picture_file && `${lessonPath}/picture/${e?.picture_file}`,
            x: 1,
            writing_file:
              e.writing_file &&
              `${lessonPath}/writing/hiragana/${e?.writing_file}`,
            s_id: e.s_id,
          };
        });
      setData(result);
      setIsLoading(false);
    })();
  }, []);

  return {data, lessonPath, isLoading};
};
