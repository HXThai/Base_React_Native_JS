/* eslint-disable no-undef */
/* eslint-disable curly */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect, useRef} from 'react';

//countDown from number by second
export default useCountDown = (_numberCD = 0, onEnd) => {
  let [number, setNumber] = useState(_numberCD);
  let numberCD = useRef(_numberCD);
  let countDownRef = useRef(null);
  let startTime = useRef(Date.now());

  let startInterVal = () => {
    countDownRef.current = setInterval(() => {
      if (
        numberCD.current -
          Math.round((Date.now() - startTime.current) / 1000) <=
        0
      ) {
        stop();
        if (typeof onEnd === 'function') onEnd();
      }
      setNumber(
        numberCD.current - Math.round((Date.now() - startTime.current) / 1000),
      );
    }, 1000);
  };

  useEffect(() => {
    if (countDownRef.current) startInterVal();
    return () => {
      if (countDownRef.current) clearInterval(countDownRef.current);
    };
  }, []);
  let stop = () => {
    console.log('Cowndown stoped');
    setNumber(0);
    if (countDownRef.current) {
      clearInterval(countDownRef.current);
      countDownRef.current = null;
    }
  };
  let reset = num => {
    numberCD.current = num ? num : _numberCD;
    setNumber(num ? num : _numberCD);
    startTime.current = Date.now();
    console.log('Reset cowndown with', num);
    if (countDownRef.current) clearInterval(countDownRef.current);
    startInterVal();
  };
  return {number, countDownRef: countDownRef.current, stop, reset};
};
