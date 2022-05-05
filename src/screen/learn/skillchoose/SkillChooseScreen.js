import React, {useEffect, useState, useCallback} from 'react';
import SkillChooseComponent from '~/component/learn/skillchoose/SkillChooseComponent';
import {navigate} from '~/screen/NavigationService';
import {ScreenName} from '~/utils';

export default function SkillChooseScreen({navigation, route}) {
  let {unit} = route.params ? route.params : {};
  let onPressSkill = useCallback(({skill}) => {
    console.log('skill====', skill);
    switch (skill) {
      case 'speaking':
        return navigate(ScreenName.LEARN_SPEAK_SCREEN);

      case 'writing':
        return navigate(ScreenName.LEARN_WRITING_SCREEN);

      case 'translate':
        // return navigate(ScreenName.LEARN_FLASHCARD_SCREEN);
        return navigate(ScreenName.KNOWLEDGE_SCREEN);

      case 'listening':
      default:
        return navigate(ScreenName.LEARN_AUDIO_SCREEN);
    }
  });
  console.log({unit});
  // return null;
  return <SkillChooseComponent unit={unit} onPressSkill={onPressSkill} />;
}
