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
        d="M11.4 16.6L5.8 11L18 11L18 9L5.8 9L11.4 3.4L10 2L2 10L10 18L11.4 16.6Z"
        fill={color}
      />
    </Svg>
  );
};
