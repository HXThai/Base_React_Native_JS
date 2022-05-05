var RNFS = require('react-native-fs');
import {unzip, subscribe} from 'react-native-zip-archive';

let downloadFile = async lesson => {
  let zipFilePath = `${RNFS.DocumentDirectoryPath}/${lesson}.zip`;

  let uri = `https://api.honkidenihongo.com/storage/download/lesson/basic1/v4/${lesson}.zip`;
  try {
    await RNFS.unlink(zipFilePath);
  } catch (e) {}
  try {
    console.log('start downloadResult file');
    const downloadPromise = RNFS.downloadFile({
      fromUrl: uri,
      toFile: zipFilePath,
      progressInterval: 2000,
      progress: function ({contentLength, jobId, bytesWritten}) {
        if (jobId === downloadPromise.jobId) {
          console.log(bytesWritten / contentLength);
        }
      },
    });
    const downloadResult = await downloadPromise.promise;
    if (downloadResult.statusCode !== 200) {
      console.log(downloadResult.statusCode.toString());
    }
  } catch (error) {
    console.log(error);
  }
};

let extraData = async lesson => {
  let zipFilePath = `${RNFS.DocumentDirectoryPath}/${lesson}.zip`;
  let unzipPath = `${RNFS.DocumentDirectoryPath}/lesson/${lesson}`;
  let unzipPathParent = `${RNFS.DocumentDirectoryPath}/lesson`;
  try {
    await RNFS.unlink(unzipPath);
    await RNFS.mkdir(unzipPathParent);
    console.log('delete lesson folder ok ');
  } catch (e) {
    console.log('delete lesson folder error', e);
  }
  try {
    const subscription = subscribe(({progress, filePath}) => {
      console.log(`progress: ${progress}`);
    });
    await unzip(zipFilePath, unzipPath, 'UTF-8');
    console.log(`unzip completed at ${zipFilePath}`);
    subscription.remove();
  } catch (e) {
    console.log(3, e);
  }
};

let mock = async (lesson = 'lesson_00') => {
  await downloadFile(lesson);
  await extraData(lesson);
};
module.exports = {extraData, mock};
