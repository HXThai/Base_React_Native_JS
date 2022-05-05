import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export default ({color = '#FA4A0C', width = 25, height = 25}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M13.5959 0.554161C13.3052 0.263581 12.911 0.100342 12.5 0.100342C12.089 0.100342 11.6948 0.263581 11.4042 0.554161L0.554152 11.4042C0.271807 11.6965 0.115576 12.088 0.119108 12.4944C0.122639 12.9008 0.285651 13.2896 0.573034 13.577C0.860416 13.8644 1.24918 14.0274 1.65558 14.0309C2.06199 14.0344 2.45352 13.8782 2.74585 13.5959L3.2 13.1417V23.35C3.2 23.7611 3.36331 24.1553 3.65399 24.446C3.94467 24.7367 4.33892 24.9 4.75 24.9H7.85C8.26109 24.9 8.65534 24.7367 8.94602 24.446C9.2367 24.1553 9.4 23.7611 9.4 23.35V20.25C9.4 19.8389 9.56331 19.4447 9.85399 19.154C10.1447 18.8633 10.5389 18.7 10.95 18.7H14.05C14.4611 18.7 14.8553 18.8633 15.146 19.154C15.4367 19.4447 15.6 19.8389 15.6 20.25V23.35C15.6 23.7611 15.7633 24.1553 16.054 24.446C16.3447 24.7367 16.7389 24.9 17.15 24.9H20.25C20.6611 24.9 21.0553 24.7367 21.346 24.446C21.6367 24.1553 21.8 23.7611 21.8 23.35V13.1417L22.2542 13.5959C22.5465 13.8782 22.938 14.0344 23.3444 14.0309C23.7508 14.0274 24.1396 13.8644 24.427 13.577C24.7144 13.2896 24.8774 12.9008 24.8809 12.4944C24.8844 12.088 24.7282 11.6965 24.4459 11.4042L13.5959 0.554161V0.554161Z"
        fill={color}
      />
    </Svg>
  );
};