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
        d="M21 6H17.83L16 4H10V6H15.12L16.95 8H21V20H5V11H3V20C3 21.1 3.9 22 5 22H21C22.1 22 23 21.1 23 20V8C23 6.9 22.1 6 21 6ZM8 14C8 16.76 10.24 19 13 19C15.76 19 18 16.76 18 14C18 11.24 15.76 9 13 9C10.24 9 8 11.24 8 14ZM13 11C14.65 11 16 12.35 16 14C16 15.65 14.65 17 13 17C11.35 17 10 15.65 10 14C10 12.35 11.35 11 13 11ZM5 6H8V4H5V1H3V4H0V6H3V9H5V6Z"
        fill="white"
      />
    </Svg>
  );
};
