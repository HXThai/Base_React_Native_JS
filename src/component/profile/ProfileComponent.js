/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useCallback, useState, useRef} from 'react';
import * as Colors from '~/utils/Colors';
import Sizings from '~/utils/sizings';
import {
  StyleSheet,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  Pressable,
} from 'react-native';
import moment from 'moment';
import {useTheme} from '@react-navigation/native';
import {
  Text,
  HeaderComponent,
  Button,
  AppHeader,
} from '~/component/componentExtension';
import fonts from '~/utils/font';
import {CameraIcon, FeedBackIcon, StarIcon, CloseIcon} from '~/assets/icons';
import sizings from '~/utils/sizings';
import {EditIcon} from '~/assets/icons';
import {useTranslation} from 'react-i18next';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

let ProfileField = ({
  title,
  value,
  onUpdate,
  editable = true,
  placeholder,
  isEmail,
}) => {
  let [isEdit, setIsEdit] = useState(false);
  let {t} = useTranslation();
  let inputRef = useRef();
  return (
    <View style={styles.profileLine}>
      <View style={styles.profileTitle}>
        <Text fs16 MontserratBold>
          <Text fs16 MontserratBold transKey={title} />
        </Text>
      </View>
      <View style={styles.profileFieldValue}>
        {!isEdit ? (
          isEmail ? (
            <Text fs16 tertiary MontserratMedium>
              {value}
            </Text>
          ) : (
            <Text fs16 MontserratMedium>
              {value}
            </Text>
          )
        ) : (
          <TextInput
            ref={inputRef}
            placeholderTextColor="#424242"
            style={styles.profileFieldValueInput}
            value={value}
            onChangeText={onUpdate}
            placeholder={placeholder && t(placeholder)}
          />
        )}
      </View>
      {editable ? (
        <TouchableOpacity
          onPress={_ => {
            setIsEdit(!isEdit);
            setTimeout(() => inputRef.current && inputRef.current.focus(), 100);
          }}>
          <EditIcon />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default function ProfileComponent(props) {
  const {
    firstName,
    lastName,
    email,
    userCode,
    fullName,
    setFirstName,
    setLastName,
    onPressUpdateProfile,
    avatar,
    onPickAvatar,
    onPressOutside,
  } = props;
  const {colors} = useTheme();
  let {i18n} = useTranslation();

  return (
    <Pressable onPress={onPressOutside} style={styles.container}>
      <AppHeader
        style={[
          styles.container,
          {backgroundColor: colors.PRIMARY_BACKGROUND_COLOR},
        ]}>
        <StatusBar barStyle="dark-content" hidden={false} />
        <HeaderComponent
          title={'profile.header'}
          // styleTitle={{color: Colors.WHITE}}
          // hasNotification
          backIconColor={colors.BACK_ICON_COLOR}
          styleHeader={[
            {
              fontFamily: fonts.fontFamilyPrimaryBold,
            },
          ]}
          rightComponent={null}
        />
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          style={styles.container}>
          <View
            style={[
              styles.mainContainer,
              {backgroundColor: colors.PRIMARY_BACKGROUND_COLOR},
            ]}>
            <View style={styles.avatarView}>
              <Image
                style={styles.avatar}
                source={typeof avatar === 'string' ? {uri: avatar} : avatar}
              />
              <TouchableOpacity
                style={styles.btnChangeAvatar}
                onPress={onPickAvatar}>
                <CameraIcon />
              </TouchableOpacity>
            </View>

            <Text numberOfLines={1} mgt5 fs24 MontserratBold>
              {fullName}
            </Text>
            <Text mgt5 fs30>
              <Text fs14 Poppins transKey={'profile.appUserCode'} />
              <Text fs14 Poppins>
                {' '}
              </Text>
              <Text MontserratBold>{userCode}</Text>
            </Text>
            <View height={40} />
            <ProfileField
              title={'profile.firstname'}
              // placeholder={'profile.inputFirstname'}
              value={firstName}
              onUpdate={setFirstName}
            />
            <ProfileField
              title={'profile.lastname'}
              // placeholder={'profile.inputLastname'}
              value={lastName}
              onUpdate={setLastName}
            />
            {/* <ProfileField
            title={'profile.username'}
            value={'zoan.depzai'}
            editable={false}
          /> */}
            <ProfileField
              title={'profile.email'}
              value={email}
              editable={false}
              isEmail={true}
            />
            <View style={styles.buttonView}>
              <Button
                onPress={onPressUpdateProfile}
                titleStyle={{fontSize: 14}}
                title={'profile.update'}
                small
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
        {/* <KeyboardAwareScrollView flex={1} showsVerticalScrollIndicator={false}> */}

        {/* </KeyboardAwareScrollView> */}
      </AppHeader>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundGradient: {
    flex: 1,
    width: sizings.percent_100,
    height: sizings.percent_100,
  },
  mainContainer: {
    paddingHorizontal: Sizings.percent_10,
    width: Sizings.percent_100,
    height: Sizings.percent_100,
    marginTop: 110,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: 'center',
  },

  avatarView: {
    marginTop: -(160 / 2),
    height: 134,
    marginHorizontal: 10,
    borderRadius: 20,
    overflow: 'hidden',
  },
  btnChangeAvatar: {
    height: 36,
    width: 134,
    backgroundColor: 'rgba(2, 2, 2, 0.51)',
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    height: 134,
    width: 134,
    borderRadius: 20,
  },
  profileLine: {
    marginVertical: 10,
    flexDirection: 'row',
    width: Sizings.percent_100,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 35,
  },
  profileFieldValue: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 5,
    // borderColor: 'black',
    // borderWidth: 1,
  },
  buttonView: {
    marginVertical: 15,
    width: 120,
  },
  profileFieldValueInput: {
    height: 30,
    margin: 0,
    padding: 0,
    // color: Colors.textTertiary,
    fontFamily: 'Montserrat-Medium',
    width: '100%',
    fontSize: 16,
  },
  styleModal: {
    flexDirection: 'column',
  },
  containerModal: {
    alignItems: 'center',
  },
  containerRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  styleTIPFeedback: {
    height: '45%',
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
  containerBtnClose: {
    position: 'absolute',
    right: 25,
    top: 25,
  },
  titleStyleBtn: {
    fontFamily: fonts.fontFamilyPrimaryBold,
    fontSize: 18,
  },
  // titleStyle: {
  //   fontFamily: fonts.fontFamilySecondaryRegular,
  // },
});
