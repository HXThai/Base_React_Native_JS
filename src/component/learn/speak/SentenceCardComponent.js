/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

import {LearnCheckIcon, LearnUnCheckIcon, MicroIcon} from '~/assets/icons';
import {Text, TextSubjectTrans} from '~/component/componentExtension';
import {Colors} from '~/utils';

let SentenceCardComponent = ({
  onPressMic,
  onPressSelect,
  translateText,
  originText,
  isSelected,
  id,
  index,
}) => {
  let _onPressSelect = () => {
    onPressSelect && onPressSelect({id, index, isSelected: !isSelected});
  };
  let _onPressMic = () => {
    onPressMic && onPressMic({id, index});
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={_onPressSelect} style={styles.side}>
        {isSelected ? <LearnCheckIcon /> : <LearnUnCheckIcon />}
      </TouchableOpacity>
      <View style={styles.main}>
        <View style={styles.mainLeft}>
          <TextSubjectTrans
            haveExplain={false}
            fsMain={{fs16: true, PoppinsMedium: true}}
            raw={originText}
          />
          <Text fs16 PoppinsMedium>
            {translateText}
          </Text>
        </View>
        <TouchableOpacity onPress={_onPressMic} style={styles.mainRight}>
          <MicroIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 60,
    flexDirection: 'row',
  },
  side: {
    alignSelf: 'center',
    alignItems: 'center',
    marginRight: 10,
    justifyContent: 'center',
  },
  main: {
    flexGrow: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.colorBorder,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  mainLeft: {
    flex: 1,
  },
  mainRight: {
    marginLeft: 15,
  },
});
function areEqual(prevProps, nextProps) {
  if (prevProps.isSelected !== nextProps.isSelected) {
    return false;
  } else return true;
}

export default React.memo(SentenceCardComponent, areEqual);
