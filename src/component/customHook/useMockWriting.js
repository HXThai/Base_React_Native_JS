import React, {useState, useMemo, useEffect} from 'react';

import * as RNFS from 'react-native-fs';
import {mock} from '~/utils/MockData';

export default useMockWriting = ({
  learnLanguage,
  lesson = 'lesson_00',
  category = 11,
}) => {
  let [data, setData] = useState([]);
  let [isLoading, setIsLoading] = useState(true);
  let [lessonPath, seeLessionPath] = useState(
    `file://${RNFS.DocumentDirectoryPath}/lesson/${lesson}`,
  );
  let fileMockPath = `${RNFS.DocumentDirectoryPath}/lesson/${lesson}/knowledge.json`;

  useEffect(() => {
    (async () => {
      let knowledge = false;
      try {
        console.log('load knowledge');

        knowledge = await RNFS.exists(fileMockPath);
        if (!knowledge) {
          console.log('no mock data, mocking!', lesson);
          await mock(lesson);
        }

        knowledge = await RNFS.readFile(fileMockPath, 'utf8');
        knowledge = JSON.parse(knowledge);
        console.log('finish load knowledge', lesson);
      } catch (e) {
        console.log(e);
      }
      let result = knowledge
        .filter(e => e.category == category)
        .map(e => {
          return {
            number: e.number,
            order: e.order,
            subject_translations: {
              ja_romaji: e.subject_translations.ja_romaji,
              ja_kana: e.subject_translations.ja_kana,
              ja_natural: e.subject_translations.ja_natural,
            },
            voice_file: e.voice_file && `${lessonPath}/voice/${e?.voice_file}`,
            picture_file:
              e.picture_file && `${lessonPath}/picture/${e?.picture_file}`,
            writing_file:
              e.writing_file &&
              `${lessonPath}/writing/${
                category == 11 ? 'hiragana' : 'katakana'
              }/${e?.writing_file}`,
            s_id: e.s_id,
          };
        });
      setData(result);
      setIsLoading(false);
    })();
  }, [category]);

  return {data, lessonPath, lesson, isLoading};
};
