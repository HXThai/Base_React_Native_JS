/* eslint-disable prettier/prettier */
import {Alert, Dimensions, Platform} from 'react-native';
import {getUserObject} from '../utils/storage';
import {FileValidate} from '../utils/constant';

export const fileValidate = FileValidate;

export const DefaultPaging = {
  pageIndex: 1,
  size: 10,
};

export const AppKey = {
  PostPayloadPrefix: 'data',
  GetPayloadPrefix: 'filter',
};

export function ShowAlert(title, content, textSuccess = 'OK') {
  setTimeout(() => {
    Alert.alert(title, content, [{text: textSuccess, onPress: () => {}}], {
      cancelable: false,
    });
  }, 100);
}

export function ShowAlertConfirm(
  title = '',
  content = '',
  onSuccess,
  textSuccess = 'OK',
  textCancel = 'Cancel',
) {
  Alert.alert(
    title,
    content,
    [
      {
        text: textCancel,
        onPress: () => onSuccess(false),
        style: 'cancel',
      },
      {text: textSuccess, onPress: () => onSuccess(true)},
    ],
    {cancelable: false},
  );
}

export const ShowAlertCallBack = (alert = '', content, callBack) => {
  Alert.alert(
    alert,
    content,
    [
      {
        text: 'OK',
        onPress: () => {
          if (callBack) {
            callBack();
          }
        },
      },
    ],
    {cancelable: false},
  );
};

export function ShowAlertConfirmCallBack(
  title = '',
  content = '',
  onCallBackSuccess,
  onCallBackCancel,
  textSuccess = 'OK',
  textCancel = 'Cancel',
) {
  Alert.alert(
    title,
    content,
    [
      {
        text: textCancel,
        onPress: () => {
          onCallBackCancel && onCallBackCancel();
        },
        style: 'cancel',
      },
      {
        text: textSuccess,
        onPress: () => {
          onCallBackSuccess && onCallBackSuccess();
        },
      },
    ],
    {cancelable: false},
  );
}

export function StripHtmlTag(text) {
  return text.replace(/(<([^>]+)>)/gi, '');
}

export async function CreateFormData(
  data,
  namespace,
  form,
  isIncludingClientInfo = true,
  keepArray = false,
) {
  const userInfo = await getUserObject();
  const formData = form || new FormData();

  if (isIncludingClientInfo) {
    userInfo &&
      userInfo._clientId &&
      formData.append('clientId', userInfo._clientId);

    userInfo &&
      userInfo._accessToken &&
      formData.append('jwt', userInfo._accessToken);
  }

  if (data instanceof Object) {
    for (let propertyName in data) {
      if (
        !data.hasOwnProperty(propertyName) ||
        data[propertyName] === '' ||
        data[propertyName] == null
      ) {
        continue;
      }
      let formKey = namespace ? `${namespace}[${propertyName}]` : propertyName;

      if (data[propertyName] instanceof Date) {
        formData.append(formKey, data[propertyName].toISOString());
      } else if (data[propertyName] instanceof Array) {
        keepArray
          ? formData.append(formKey, JSON.stringify(data[propertyName]))
          : data[propertyName].forEach((element, index) => {
              const tempFormKey = `${formKey}[${index}]`;
              if (element instanceof File) {
                formData.append(tempFormKey, element);
              } else {
                CreateFormData(element, tempFormKey, formData);
              }
            });
      } else if (
        typeof data[propertyName] === 'object' &&
        !(data[propertyName] instanceof File)
      ) {
        CreateFormData(data[propertyName], formKey, formData);
      } else {
        formData.append(formKey, data[propertyName]);
      }
    }
  } else if (data != null && data !== {}) {
    formData.append(namespace, data);
  }
  return formData;
}

export function validateFile(
  fileType,
  fileSize,
  acceptFileExtensions = fileValidate.Image,
  maximumSize = fileValidate.MaxSize,
) {
  if (!fileType || !fileSize) {
    return 'File không được để trống';
  }

  if (fileSize > maximumSize * 1024 * 1024) {
    return `Kích thước file không được vượt quá ${maximumSize} MB.`;
  }

  if (!acceptFileExtensions.includes(fileType)) {
    return `File cho phép tải lên: ${acceptFileExtensions}`;
  }

  return '';
}

export function checkDateInput(e, setValue) {
  if (e && e.getDate()) {
    setValue(e);
  }
}

export function getDateWithFormat(date) {
  if (date) {
    let content = date.getFullYear() + '-';
    if (date.getMonth() + 1 < 10) {
      content += '0' + (date.getMonth() + 1) + '-';
    } else {
      content += date.getMonth() + 1 + '-';
    }
    if (date.getDate() < 10) {
      content += '0' + date.getDate();
    } else {
      content += date.getDate();
    }
    return content;
  } else {
    return '';
  }
}
export function ConvertTimeToNumber(date) {
  return date.getHours() * 60 + date.getMinutes();
}

export function isIphoneXorAbove() {
  const dimen = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 812 ||
      dimen.width === 812 ||
      dimen.height === 896 ||
      dimen.width === 896||
      dimen.height === 844 ||
      dimen.width === 844)
  );
}
