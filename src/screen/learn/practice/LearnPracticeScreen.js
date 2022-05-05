import {connect} from 'react-redux';
import React, {useEffect, useState} from 'react';
import {bindActionCreators} from 'redux';
import PracticeComponent from '~/component/learn/practice/PracticeComponent';
import {useMockPractice} from '~/component/customHook';

export default function LearnPracticeScreen({
  practiceName = 'Hiragana/Practice',
}) {
  let [learnLanguage, setLearnLanguage] = useState('en');
  let [answers, setAnswers] = useState({});
  let [questions, setQuestions] = useState([]);
  let {
    choice,
    question: questionRaw,
    lessonPath,
    isLoading,
  } = useMockPractice({
    learnLanguage: 'en',
  });
  let [currentQuestionIndex, setCurrentQuestionIndex] = useState(103);
  useEffect(() => {
    if (!isLoading) {
      console.log(questionRaw.length, choice.length);
      let q = questionRaw.map(e => {
        return {
          ...e,
          userAnswer: null,
          isUserAnswerRight: false,
        };
      });
      setQuestions(q);
      let answersObj = {};
      choice.forEach(e => {
        if (!answersObj?.[e.question_number]) {
          answersObj[e.question_number] = [];
        }
        answersObj[e.question_number].push(e);
        // console.log({});
      });
      // console.log(1, question[0]);
      // console.log(1, answers[1]);
      setAnswers(answersObj);
    }
  }, [isLoading]);

  let getQuestionIndex = qNumber => {
    for (let q in questions) {
      if (questions[q]?.number === qNumber) {
        return q;
      }
    }
    return 1;
  };

  const handleEndPractice = () => {};

  const onAnsPress = ans => {
    let {question_number, number, is_correct} = ans;
    let q = questions[getQuestionIndex(question_number)];
    if (q?.userAnswer) {
      console.log('user have ansered this question!');
      return;
    } else {
      setQuestions(_ => {
        _[
          getQuestionIndex(question_number)
        ].userAnswer = `${question_number}_${number}`;
        _[getQuestionIndex(question_number)].isUserAnswerRight = is_correct;
        return [..._];
      });
    }

    setTimeout(
      _ => {
        if (questions.length - 1 === currentQuestionIndex) {
          return handleEndPractice();
        } else {
          setCurrentQuestionIndex(_ => ++_);
        }
      },
      __DEV__ ? 100 : 2000,
    );

    console.log({question_number, number, is_correct});
  };

  let currentQuestion = questions?.[currentQuestionIndex];
  let totalQuestion = questions?.length;
  let question_number = currentQuestion?.number;
  let qustionTran = currentQuestion?.content_translations?.['ja_kana'];
  let arrAnswersCurrent = answers?.[question_number];
  let userAnswer = currentQuestion?.userAnswer;
  console.log({question_number, qustionTran, userAnswer});
  return (
    <PracticeComponent
      currentQuestionIndex={currentQuestionIndex}
      qustionTran={qustionTran}
      totalQuestion={totalQuestion}
      practiceName={practiceName}
      arrAnswersCurrent={arrAnswersCurrent}
      userAnswer={userAnswer}
      onAnsPress={onAnsPress}
    />
  );
}
