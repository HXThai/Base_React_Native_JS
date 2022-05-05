import * as React from 'react';
import Svg, {Path, G} from 'react-native-svg';

function playcirleIcon({width = 26, height = 26, color = '#F8774A'}) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M13 1.625C6.718 1.625 1.625 6.718 1.625 13S6.718 24.375 13 24.375 24.375 19.282 24.375 13 19.282 1.625 13 1.625zm0 20.82c-5.215 0-9.445-4.23-9.445-9.445S7.785 3.555 13 3.555s9.445 4.23 9.445 9.445-4.23 9.445-9.445 9.445z"
        fill={color}
      />
      <Path
        d="M18.266 12.672l-7.518-5.459a.404.404 0 00-.643.328v10.918c0 .333.376.52.643.328l7.518-5.46a.404.404 0 000-.655zm-6.54 3.403v-6.15L15.957 13l-4.233 3.075z"
        fill={color}
      />
    </Svg>
  );
}

export default playcirleIcon;
