import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as homeAction from '../../reduxSaga/actions/homeAction';
import ShopComponent from '../../component/shop/ShopComponent';

export default ShopScreen = props => {
  const {navigation} = props;

  return <ShopComponent />;
};
