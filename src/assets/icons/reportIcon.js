import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export default ({color = '#424242', width = 20, height = 20}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M18 0H2C0.9 0 0.00999999 0.9 0.00999999 2L0 20L4 16H18C19.1 16 20 15.1 20 14V2C20 0.9 19.1 0 18 0ZM18 14H3.17L2.58 14.59L2 15.17V2H18V14ZM9 10H11V12H9V10ZM9 4H11V8H9V4Z"
        fill={color}
      />
    </Svg>
  );
};
