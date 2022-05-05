import * as React from 'react';
import Svg, {Path, Rect} from 'react-native-svg';

export default ({color = 'white', width = 24, height = 24}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M15.0001 19C15.0001 19.7957 14.684 20.5587 14.1214 21.1213C13.5588 21.6839 12.7958 22 12.0001 22C11.2045 22 10.4414 21.6839 9.87879 21.1213C9.31618 20.5587 9.00011 19.7957 9.00011 19M12.7211 5.003L11.2551 5C7.91111 4.992 5.00811 7.709 4.98511 11V14.79C4.98511 15.58 4.88511 16.351 4.45411 17.008L4.16711 17.446C3.73011 18.11 4.20011 19 4.98511 19H19.0151C19.8001 19 20.2691 18.11 19.8331 17.446L19.5461 17.008C19.1161 16.351 19.0151 15.579 19.0151 14.789V11.001C18.9751 7.709 16.0651 5.011 12.7211 5.003V5.003Z"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M12 2C12.5304 2 13.0391 2.21071 13.4142 2.58579C13.7893 2.96086 14 3.46957 14 4V5H10V4C10 3.46957 10.2107 2.96086 10.5858 2.58579C10.9609 2.21071 11.4696 2 12 2Z"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
