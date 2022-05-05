import {useState, useEffect, useRef} from 'react';

//useTimer from number by second
export default useTimer = onEnd => {
  let [number, setNumber] = useState(0);
  let [isRunning, setisRunning] = useState(false);
  let timerRef = useRef(null);
  let startTime = useRef(Date.now()).current;
  let timePast = useRef(0).current;
  let startTimerVal = () => {
    timerRef.current = setInterval(() => {
      timePast = Date.now() - startTime;
      setNumber(_ => _ + 1);
    }, 1000);
    console.log('startTimerVal', {timerRef});
    setisRunning(true);
  };

  useEffect(() => {
    if (timerRef.current) startInterVal();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        setisRunning(!1);
      }
    };
  }, []);
  let start = () => {
    console.log('timer start');
    setNumber(0);
    startTime = Date.now();
    if (timerRef.current) clearInterval(timerRef.current);
    startTimerVal();
  };
  let stop = () => {
    console.log('timer stoped', timerRef);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      setisRunning(!1);
      timerRef.current = null;
    }
  };
  return {
    number,
    timePast,
    timerRef: timerRef.current,
    start,
    stop,
    isRunning,
  };
};
