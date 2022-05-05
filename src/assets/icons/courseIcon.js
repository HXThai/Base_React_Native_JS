import * as React from 'react';
import Svg, {Path, G} from 'react-native-svg';

export default ({color = '#FA4A0C', width = 18, height = 28}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 18 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M3 20H18V18H3.012C2.55 17.988 2 17.805 2 17C2 16.195 2.55 16.012 3.012 16H18V2C18 0.897 17.103 0 16 0H3C1.794 0 0 0.799 0 3V17C0 19.201 1.794 20 3 20ZM2 6V3C2 2.195 2.55 2.012 3 2H16V14H2V6Z"
        fill={color}
      />
      <Path d="M5 4H14V6H5V4Z" fill={color} />
    </Svg>
  );
};
