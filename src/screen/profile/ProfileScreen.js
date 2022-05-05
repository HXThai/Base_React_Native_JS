/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import ProfileComponent from '../../component/profile/ProfileComponent';
import {useDispatch, useSelector} from 'react-redux';
import {loadingAction} from '~/reduxSaga/actions/loadingAction';
import {
  updateAccountAction,
  getCurrentAccountAction,
  uploadFileAction,
  updateAvatarAction,
} from '~/reduxSaga/actions/accountAction';
import {Alert, Keyboard} from 'react-native';
import {ResponseCode} from '~/utils/constant';
import {useTranslation} from 'react-i18next';
import ImagePicker from 'react-native-image-crop-picker';
function ProfileScreen(props) {
  const {navigation} = props;
  const dispatch = useDispatch();
  let {i18n} = useTranslation();
  const userProfile = useSelector(state => state.currentAccount);

  const [userCode, setUserCode] = useState('NaN');

  const [fullName, setFullName] = useState('NaN');

  const [firstName, setFirstName] = useState('NaN');

  const [lastName, setLastName] = useState('NaN');

  const [email, setEmail] = useState('NaN');

  useEffect(() => {
    setUserCode(userProfile?.userName);
    setEmail(userProfile?.email);
    if (userProfile?.firstName) {
      setFirstName(userProfile?.firstName);
    }
    if (userProfile?.lastName) {
      setLastName(userProfile?.lastName);
    }
  }, []);

  useEffect(() => {
    setFullName(genFullName());
  }, [firstName, lastName]);

  const genFullName = () => {
    if (firstName === 'NaN' && lastName === 'NaN') {
      return 'NaN';
    } else if (firstName !== 'NaN' && lastName === 'NaN') {
      return firstName.trim();
    } else if (firstName === 'NaN' && lastName !== 'NaN') {
      return lastName.trim();
    } else {
      return firstName.trim() + ' ' + lastName.trim();
    }
  };

  let onPickAvatar = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      mediaType: 'photo',
    })
      .then(async image => {
        console.log(image);
        let type = null;
        let sizeInMB = 0;
        let imageName = image?.filename;
        try {
          type = imageName.split('.').slice(-1)[0];
          type = type.toLowerCase();
          sizeInMB = image.size / 1024 / 1024;
        } catch (e) {
          console.log(e);
          Alert.alert(
            i18n.t('profile.error'),
            i18n.t('profile.errorWhenPicImage'),
            [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          );
          return;
        }
        console.log({imageName, type, sizeInMB, mime: image.mime});
        if (sizeInMB > 10) {
          return Alert.alert(
            i18n.t('profile.error'),
            i18n.t('profile.imageSizeToBig'),
            [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          );
        }
        if (!['jpg', 'jpeg', 'png'].includes(image?.mime?.split('/')?.[1])) {
          Alert.alert(
            i18n.t('profile.error'),
            i18n.t('profile.imageNotSupport'),
            [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          );
          return;
        }

        const params = {
          name: `${image.filename}`,
          type: `${image?.mime}`,
          uri: image.path,
        };
        dispatch(
          uploadFileAction(params, onUploadFileSuccess, onUploadFileError),
        );
      })
      .catch(e => {
        console.log(e);
      });
  };

  const onPressUpdateProfile = () => {
    if (firstName.trim() === '') {
      Alert.alert(i18n.t('feedback.notice'), i18n.t('profile.emptyFN'), [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
      return;
    }
    if (lastName.trim() === '') {
      Alert.alert(i18n.t('feedback.notice'), i18n.t('profile.emptyLN'), [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
      return;
    }
    dispatch(loadingAction(true));
    const params = {
      endPointAccId: userProfile.id,
      body: {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
      },
    };
    dispatch(
      updateAccountAction(params, updateAccountSuccess, updateAccountError),
    );
  };

  const updateAccountSuccess = response => {
    dispatch(loadingAction(false));
    if (response) {
      if (response.statusCode === ResponseCode.OK) {
        setFirstName(firstName.trim());
        setLastName(lastName.trim());
        dispatch(getCurrentAccountAction());
        Alert.alert(
          i18n.t('feedback.notice'),
          i18n.t('profile.updateSuccess'),
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        );
      } else {
        Alert.alert(i18n.t('feedback.error'), i18n.t('profile.updateErr'), [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
      }
    }
  };

  const updateAccountError = error => {
    dispatch(loadingAction(false));
    Alert.alert(i18n.t('feedback.error'), i18n.t('profile.updateErr'), [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  };

  const onUploadFileSuccess = response => {
    dispatch(loadingAction(false));
    if (response) {
      if (response.statusCode === ResponseCode.OK) {
        const params = {
          avatar: response.content.fileUrl,
        };
        console.log(response.content.fileUrl);
        dispatch(
          updateAvatarAction(
            params,
            onUpdateAvatarSuccess,
            onUpdateAvatarError,
          ),
        );
      } else {
        Alert.alert(i18n.t('feedback.error'), i18n.t('profile.updateAvtErr'), [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
      }
    }
  };

  const onUploadFileError = error => {
    console.log('error', error);
    dispatch(loadingAction(false));
    Alert.alert(i18n.t('feedback.error', i18n.t('profile.updateAvtErr')), [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  };

  const onUpdateAvatarSuccess = response => {
    dispatch(loadingAction(false));
    if (response) {
      if (response.statusCode === ResponseCode.OK) {
        dispatch(getCurrentAccountAction());
        Alert.alert(
          i18n.t('feedback.notice'),
          i18n.t('profile.updateAvtSuccess'),
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        );
      } else {
        Alert.alert(i18n.t('feedback.error', i18n.t('profile.updateAvtErr')), [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
      }
    }
  };

  const onUpdateAvatarError = error => {
    console.log('error', error);
    dispatch(loadingAction(false));
    Alert.alert(i18n.t('feedback.error', i18n.t('profile.updateAvtErr')), [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  };

  const uri = userProfile.avatar
    ? userProfile.avatar
    : 'https://i.pinimg.com/564x/bc/75/88/bc75882d906b263fbe0550fe59dc7b21.jpg';
  const onPressOutside = () => {
    Keyboard.dismiss();
  };
  return (
    <ProfileComponent
      firstName={firstName}
      lastName={lastName}
      email={email}
      userCode={userCode}
      fullName={fullName}
      setFirstName={setFirstName}
      setLastName={setLastName}
      onPressUpdateProfile={onPressUpdateProfile}
      avatar={uri}
      onPickAvatar={onPickAvatar}
      onPressOutside={onPressOutside}
    />
  );
}

export default ProfileScreen;
