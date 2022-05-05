import * as React from 'react';
import Svg, {Circle} from 'react-native-svg';

export default ({color = '#FA4A0C', width = 15, height = 15}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Circle cx="7.5" cy="7.5" r="7" stroke={color} />
      <Circle cx="7.5" cy="7.5" r="3" fill={color} stroke={color} />
    </Svg>
  );
};
