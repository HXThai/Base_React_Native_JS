import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export default ({color = '#357A1D', width = 17, height = 17}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M14.6625 2.3375C14.6625 2.3375 13.6709 2.125 12.1834 2.125C8.28754 2.125 1.13337 3.6125 2.26671 14.7333C3.04587 14.8042 3.82504 14.875 4.53337 14.875C17.2125 14.875 14.6625 2.3375 14.6625 2.3375ZM4.95837 12.0417C4.95837 12.0417 4.95837 4.95833 12.0417 4.95833C12.0417 4.95833 7.79171 6.375 4.95837 12.0417Z"
        fill={color}
      />
    </Svg>
  );
};
