import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export default ({color = '#424242', width = 8, height = 14}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 8 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M7 13L1 7L7 1"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
