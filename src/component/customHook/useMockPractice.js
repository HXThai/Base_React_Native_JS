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

//for unit 0
//category: 11 hiragana
//category: 12 kanakana
//category: 13 number
//category: 14 everyday ceonversation
//_question type: 11 normal text
//_question type: 21 audio
//_question type: 22 audio hina ->hina
//_question type: 31
//_question type: 33 long text learning lang -> ja
//_question type: 41
export default useMockPractice = ({learnLanguage}) => {
  let [{choice, question}, setData] = useState({choice: [], question: []});
  let [isLoading, setIsLoading] = useState(true);
  let [lessonPath, seeLessionPath] = useState(
    `file://${RNFS.DocumentDirectoryPath}/lesson/lesson_00`,
  );
  let fileMockPath = `${RNFS.DocumentDirectoryPath}/lesson/lesson_00/knowledge.json`;
  let questionPath = `${RNFS.DocumentDirectoryPath}/lesson/lesson_00/question.json`;
  let choicePath = `${RNFS.DocumentDirectoryPath}/lesson/lesson_00/choice.json`;
  let _question = [];
  let _choice = [];
  let questionNumberSet = new Set();

  useEffect(() => {
    (async () => {
      let exist = false;
      try {
        console.log('load practice data');
        exist =
          (await RNFS.exists(questionPath)) && (await RNFS.exists(choicePath));
        if (!exist) {
          console.log('no mock data, mocking!');
          await mock();
        }
        _question = await RNFS.readFile(questionPath, 'utf8');
        _choice = await RNFS.readFile(choicePath, 'utf8');
        _question = JSON.parse(_question);
        _choice = JSON.parse(_choice);
        console.log('finish load practice');
      } catch (e) {
        console.log(e);
      }
      let result = [];
      _question = _question.filter(e => e.category === 11 && e.type === 11);
      _question = _question.map(e => {
        questionNumberSet.add(e.number);
        delete e.use_webview;
        delete e.group_number;
        delete e.should_choice_shuffle;
        delete e.title_translations;
        delete e.only_in_language;
        return e;
      });

      _choice = _choice.filter(e => questionNumberSet.has(e.question_number));

      console.log(_question.length, _choice.length);
      setData({choice: _choice, question: _question});
      setIsLoading(false);
    })();
  }, []);

  return {choice, question, lessonPath, isLoading};
};
