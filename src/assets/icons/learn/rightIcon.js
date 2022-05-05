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
        d="M8.6 3.4L14.2 9H2V11H14.2L8.6 16.6L10 18L18 10L10 2L8.6 3.4Z"
        fill={color}
      />
    </Svg>
  );
};
