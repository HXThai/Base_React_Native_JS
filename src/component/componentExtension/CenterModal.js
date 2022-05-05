import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  View,
  ViewStyle,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import Modal from 'react-native-modal';
import Text from './Text';
import {BackIcon, CloseIcon} from '~/assets/icons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const SCREEN_HEIGHT = Dimensions.get('window').height;

const CenterModal = props => {
  const {
    isVisible,
    onDismissModal,
    onBackdropPress,
    avoidKeyboard = true,
    title,
    withTitle,
    children,
    containerStyle,
    style,
    titleStyle,
    isBackIcon = false,
    isCloseIcon = false,
    onPress,
  } = props;
  return (
    <Modal
      isVisible={isVisible}
      style={styles.modal}
      avoidKeyboard={avoidKeyboard}
      onBackdropPress={onBackdropPress}>
      <Pressable
        onPress={onPress}
        style={[styles.safeAreaContainer, containerStyle]}>
        <View style={[styles.container, style]}>
          <View style={styles.row}>
            <View style={styles.styleBackContainer}>
              {isBackIcon ? (
                <TouchableOpacity
                  onPress={onDismissModal}
                  style={{marginRight: 10}}>
                  <BackIcon />
                </TouchableOpacity>
              ) : (
                <View width={1} />
              )}
              {withTitle == false ? (
                <View />
              ) : (
                <Text
                  MontserratBold
                  fs14
                  transKey={title}
                  textstyle={[styles.title, titleStyle]}
                />
              )}
              {isCloseIcon ? (
                <TouchableOpacity onPress={onDismissModal} style={{}}>
                  <CloseIcon />
                </TouchableOpacity>
              ) : (
                <View width={1} />
              )}
            </View>
          </View>
          {children}
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    paddingTop: 24,
    paddingHorizontal: 24,
    marginBottom: 16,
    overflow: 'scroll',
  },
  safeAreaContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    maxHeight: SCREEN_HEIGHT * 0.9,
    width: '85%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 8,
  },
  title: {
    alignSelf: 'flex-end',
    fontSize: 24,
  },
  styleBackContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default CenterModal;
