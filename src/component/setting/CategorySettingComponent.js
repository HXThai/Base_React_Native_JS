/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import * as Colors from '~/utils/Colors';
import {
  StyleSheet,
  View,
  StatusBar,
  Platform,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {
  Text,
  HeaderComponent,
  AppHeader,
  Card,
  CenterModal,
  Button,
} from '~/component/componentExtension';

import sizings from '~/utils/sizings';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Fonts, persentHeight} from '~/utils';

import {StarIcon} from '~/assets/icons';
import {useTranslation} from 'react-i18next';

export default function CategorySettingComponent({
  dataCategory,
  onPressCategory,
  isVisibleModalFeedback,
  setIsVisibleModalFeedback,
  onPressOutSide,
  numberStar,
  onPressStar,
  contentFeedback,
  setContentFeedback,
  handleSendFeedback,
}) {
  let {i18n} = useTranslation();

  const {colors} = useTheme();
  const genRatingStar = index => {
    if (index + 1 <= numberStar) {
      return (
        <TouchableOpacity
          key={index}
          style={{marginRight: 5}}
          onPress={() => onPressStar(index)}>
          <StarIcon color={'#FFD700'} />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          key={index}
          style={{marginRight: 5}}
          onPress={() => onPressStar(index)}>
          <StarIcon />
        </TouchableOpacity>
      );
    }
  };
  return (
    <View style={styles.container}>
      <AppHeader
        style={[
          styles.container,
          {backgroundColor: colors.PRIMARY_BACKGROUND_COLOR},
        ]}>
        <StatusBar barStyle="dark-content" hidden={false} />
        <HeaderComponent
          title={'setting.menu'}
          backIconColor={colors.BACK_ICON_COLOR}
          styleTitle={styles.styleHeader}
        />
        <CenterModal
          containerStyle={styles.styleModal}
          onPress={onPressOutSide}
          isVisible={isVisibleModalFeedback}
          isCloseIcon={true}
          onBackdropPress={onPressOutSide}
          onDismissModal={() => setIsVisibleModalFeedback(false)}>
          <Text
            PoppinsMedium
            fs24
            style={styles.styleTextFB}
            transKey={'feedback.feedBack'}
          />
          <View style={styles.containerRating}>
            <Text fs16 PoppinsMedium style={{marginRight: 10}}>
              {i18n.t('feedback.rating')}:{' '}
            </Text>
            {[0, 1, 2, 3, 4].map(e => genRatingStar(e))}
          </View>
          <TextInput
            textAlignVertical={'top'}
            placeholderTextColor="#888888"
            style={styles.styleTIPFeedback}
            value={contentFeedback}
            onChangeText={value => setContentFeedback(value)}
            placeholder={i18n.t('feedback.yourFeedback')}
            multiline={true}
          />
          <Button
            buttonStyle={styles.styleBtn}
            title={'general.send'}
            onPress={handleSendFeedback}
            titleStyle={styles.titleStyleBtn}
          />
        </CenterModal>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          style={styles.mainContainer}>
          {dataCategory.map((item, index) => {
            return (
              <Card
                key={index}
                onPress={() => onPressCategory(item?.id)}
                style={[
                  styles.styleCardCategory,
                  {
                    backgroundColor: colors.BG_CARD_COLOR,
                    borderWidth: index === dataCategory.length - 1 ? 2 : 0,
                    borderColor:
                      index === dataCategory.length - 1 ? Colors.warning : null,
                  },
                ]}>
                {item.icon}
                <Text
                  transKey={item.title}
                  style={[
                    styles.styleText,
                    {
                      color:
                        index === dataCategory.length - 1
                          ? Colors.warning
                          : colors.PRIMARY_TEXT_COLOR,
                    },
                  ]}
                  fs17
                  MontserratBold
                />
              </Card>
            );
          })}
        </KeyboardAwareScrollView>
      </AppHeader>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: 30,
  },
  styleCardCategory: {
    borderRadius: 20,
    width: sizings.percent_100,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: '30%',
    padding: 25,
    marginTop: 10,
  },
  styleText: {
    marginLeft: 20,
  },
  styleHeader: {
    fontFamily: Fonts.fontFamilyPrimaryBold,
  },

  styleModal: {
    minHeight: persentHeight(40),
  },
  containerModal: {
    alignItems: 'center',
  },
  containerRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  styleTIPFeedback: {
    height: persentHeight(20),
    width: '100%',
    borderWidth: 2,
    borderColor: '#D2D1D1',
    borderRadius: 10,
    padding: 15,
    marginTop: 15,
  },
  styleBtn: {
    marginTop: 20,
  },
  styleTextFB: {
    marginBottom: 15,
    alignSelf: 'center',
  },

  titleStyleBtn: {
    fontFamily: Fonts.fontFamilyPrimaryBold,
    fontSize: 18,
  },
});
