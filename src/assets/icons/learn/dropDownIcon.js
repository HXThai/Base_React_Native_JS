import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export default ({color = '#424242', width = 24, height = 24}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M18 9L12 15L6 9"
        stroke="#424242"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        fill={color}
      />
    </Svg>
  );
};
