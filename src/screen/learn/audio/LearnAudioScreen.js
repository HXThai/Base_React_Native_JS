import {connect} from 'react-redux';
import React, {useEffect, useState} from 'react';
import {bindActionCreators} from 'redux';
import LearnAudioComponent from '~/component/learn/audio/LearnAudioComponent';

export default function LearnAudioScreen(props) {
  const {navigation} = props;
  const [isLoading, setIsLoading] = useState(false);

  return <LearnAudioComponent />;
}
