import {connect} from 'react-redux';
import React, {useEffect, useState} from 'react';
import {bindActionCreators} from 'redux';
import PracticeResultComponent from '~/component/learn/practiceResult/PracticeResultComponent';
import {useMockPractice} from '~/component/customHook';

export default function LearnPracticeResultScreen({}) {
  return <PracticeResultComponent />;
}
