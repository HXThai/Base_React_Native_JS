import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export default ({color = '#D9D9D9', width = 47, height = 42}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 47 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M31.2109 42H9.73047C7.02246 42 4.68898 41.2659 2.98064 39.8775C1.03088 38.2912 0 35.9391 0 33.075C0 30.315 1.10982 27.9891 3.21289 26.3494C4.54854 25.3059 6.27982 24.5803 8.09648 24.2869C8.65277 20.8256 10.1087 17.8622 12.3458 15.6619C14.75 13.2995 17.9606 11.9861 21.2969 12C24.2647 12 27.0021 12.9984 29.2134 14.8866C30.88 16.3223 32.1684 18.1609 32.9615 20.235C35.4565 20.655 37.6973 21.705 39.3469 23.2425C41.4711 25.2188 42.5938 27.9206 42.5938 31.05C42.5938 34.1297 41.3885 36.9441 39.1973 38.9738C37.096 40.9256 34.2586 42 31.2109 42ZM35.0251 17.6184C37.4577 18.2681 39.6149 19.4297 41.327 21.0253C41.565 21.2478 41.7936 21.4772 42.0127 21.7134C44.3452 19.9884 46.1867 17.5022 47 15.0216C45.5092 15.6844 43.7587 15.945 42.0292 15.945C35.2895 15.945 31.3872 11.9597 31.3872 5.07656C31.3872 3.31031 31.6424 1.5225 32.2914 0C28.5819 1.26844 24.8558 4.98656 23.7983 9.19969C26.4884 9.62748 29.0127 10.7985 31.098 12.5859C32.723 13.9787 34.0583 15.6899 35.0251 17.6184Z"
        fill={color}
      />
    </Svg>
  );
};