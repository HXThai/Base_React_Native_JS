import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export default ({color = '#5F379F', width = 23, height = 21}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 23 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M14.0631 9.66514C10.9935 7.41034 6.02308 11.0691 4.90468 16.0059C4.04308 19.8099 0.0530788 19.6539 0.109479 20.1627C0.164679 20.6715 9.07708 21.4863 12.2967 18.8151C15.3039 16.3191 17.4291 12.1383 14.0631 9.66514ZM16.7067 0.309937L12.6711 6.49714C13.9935 6.71194 17.0331 8.75914 17.6163 10.2279L22.8915 5.13274C22.2603 3.32914 18.7659 0.519937 16.7067 0.309937Z"
        fill={color}
      />
    </Svg>
  );
};
