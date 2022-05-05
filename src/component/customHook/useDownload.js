/* eslint-disable prettier/prettier */
import React, {useState, useEffect, useRef} from 'react';
var RNFS = require('react-native-fs');
import {unzip, subscribe} from 'react-native-zip-archive';
export default useDownload = ({
  uri = 'https://api.honkidenihongo.com/storage/download/lesson/basic1/v4/lession_00.zip',
  lession = 'lesson_00',
  forceDownload = false,
}) => {
  let [progess, setProgess] = useState(0);
  let [isDonloading, setisDonloading] = useState(true);
  let [isExtracting, setisExtracting] = useState(false);
  let [isDone, setisDone] = useState(false);
  let zipFilePath = `${RNFS.DocumentDirectoryPath}/zip/${lesson}.zip`;
  let unzipPath = `${RNFS.DocumentDirectoryPath}/lesson/${lesson}`;
  let knowledgePath = `${RNFS.DocumentDirectoryPath}/lesson/${lesson}/knowledge.json`;
  let unzipPathParent = `${RNFS.DocumentDirectoryPath}/lesson`;

  useEffect(() => {
    (async () => {
      let checkZip = false;
      let checkFolder = false;
      try {
        checkZip = await RNFS.exists(zipFilePath);
        if (checkZip && !forceDownload) {
          console.log('asset exist, skip download!');
        } else {
          try {
            await RNFS.unlink(zipFilePath);
          } catch (e) {}
          const downloadPromise = RNFS.downloadFile({
            fromUrl: uri,
            toFile: zipFilePath,
            progressInterval: 1000,
            progress: function ({contentLength, jobId, bytesWritten}) {
              if (jobId === downloadPromise.jobId) {
                console.log(bytesWritten / contentLength);
                setProgess(Math.round((bytesWritten / contentLength) * 100));
              }
            },
          });
          const downloadResult = await downloadPromise.promise;
          if (downloadResult.statusCode !== 200) {
            console.log(downloadResult.statusCode.toString());
            setisDonloading(false);
            return null;
          } else {
            console.log('download done!');
            setisDonloading(false);
            setisExtracting(true);
          }
        }
      } catch (e) {
        console.log(e);
        return false;
      }

      try {
        checkFolder = await RNFS.exists(knowledgePath);
        if (checkFolder && !forceDownload) {
          return console.log('have data here, done hook');
        } else {
          await RNFS.unlink(unzipPath);
          await RNFS.mkdir(unzipPathParent);
          console.log('delete lesson folder ok ');
          const subscription = subscribe(({progress, filePath}) => {
            console.log(`progress: ${progress}`);
          });
          await unzip(zipFilePath, unzipPath, 'UTF-8');
          console.log(`unzip completed at ${zipFilePath}`);
          subscription.remove();
        }
      } catch (e) {
        console.log('extract error', e);
      }
    })();
  }, []);
  let startDownload = () => {};
  return {progess, isDonloading, isExtracting, isDone, startDownload};
};
