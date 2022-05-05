import React, {Fragment} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';

const LoadingComponent = ({isLoading}) => {
  return (
    <Fragment>
      {isLoading ? (
        <View style={styles.loadingStyle}>
          <ActivityIndicator size="large" color="white" />
        </View>
      ) : null}
    </Fragment>
  );
};

const styles = StyleSheet.create({
  loadingStyle: {
    flex: 1,
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
    backgroundColor: 'rgba(0,0,0,0.2)',
    zIndex: 9999,
  },
});

const mapStateToProps = (state, props) => ({
  isLoading: state.isLoading,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(LoadingComponent);
