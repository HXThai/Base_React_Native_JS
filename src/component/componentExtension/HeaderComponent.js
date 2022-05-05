import React from 'react';
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import {goback} from '~/screen/NavigationService';
import * as Colors from '~/utils/Colors';
import {Sizes} from '~/utils/fontSize';
import {BackIcon, BellIcon} from '~/assets/icons';
import Text from './Text';
import {useTranslation} from 'react-i18next';
const HeaderComponent = ({
  title,
  subTitle,
  styleHeader,
  styleTitle,
  styleSubtitle,
  hasNotification = false,
  hasBackButton = true,
  onPressNotitfication,
  backgroundColor,
  backIconColor,
  customHandleBack,
  rightComponent,
  onPressRightComponent,
  styleRightComponent,
}) => {
  return (
    <View
      style={[
        styles.headerWithTitleContainer,
        styleHeader,
        {backgroundColor: backgroundColor},
      ]}>
      {hasBackButton && (
        <TouchableOpacity
          onPress={customHandleBack ? customHandleBack : goback}
          style={styles.backButton}>
          <BackIcon color={backIconColor} />
        </TouchableOpacity>
      )}
      <View style={styles.viewTitle}>
        {title && (
          <Text style={styleTitle} fs18 transKey={title} MontserratBold />
        )}
        {subTitle && (
          <Text
            style={styleSubtitle}
            MontserratMedium
            mgt5
            fs12
            transKey={subTitle}
          />
        )}
      </View>
      {hasNotification && (
        <TouchableOpacity
          onPress={onPressNotitfication}
          style={styles.notificationIcon}>
          <BellIcon />
        </TouchableOpacity>
      )}
      {rightComponent && (
        <TouchableOpacity
          onPress={onPressRightComponent}
          style={[styles.styleRC, styleRightComponent]}>
          {rightComponent}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerWithTitleContainer: {
    height: Sizes.size_60,
    paddingHorizontal: Sizes.size_50,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    zIndex: 1,
    left: 0,
    width: Sizes.size_50,
    paddingLeft: Sizes.size_40,
    paddingVertical: Sizes.size_15,
  },
  notificationIcon: {
    position: 'absolute',
    zIndex: 1,
    right: 0,
    width: Sizes.size_50,
    paddingRight: Sizes.size_20,
    paddingVertical: Sizes.size_15,
  },
  styleRC: {
    position: 'absolute',
    zIndex: 1,
    right: 0,
    paddingRight: Sizes.size_20,
    paddingVertical: Sizes.size_15,
  },
  viewTitle: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default HeaderComponent;
