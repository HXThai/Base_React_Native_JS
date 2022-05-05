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
        d="M20 9.99C20 4.475 15.52 0 10 0C4.48 0 0 4.475 0 9.99C0 13.0275 1.38 15.765 3.54 17.6025C3.56 17.6225 3.58 17.6225 3.58 17.6425C3.76 17.7825 3.94 17.9225 4.14 18.0625C4.24 18.1225 4.32 18.2013 4.42 18.2812C6.07258 19.4017 8.02339 20.0004 10.02 20C12.0166 20.0004 13.9674 19.4017 15.62 18.2812C15.72 18.2213 15.8 18.1425 15.9 18.0812C16.08 17.9425 16.28 17.8025 16.46 17.6625C16.48 17.6425 16.5 17.6425 16.5 17.6225C18.62 15.7637 20 13.0275 20 9.99ZM10 18.7412C8.12 18.7412 6.4 18.1413 4.98 17.1425C5 16.9825 5.04 16.8237 5.08 16.6637C5.19917 16.2301 5.37396 15.8138 5.6 15.425C5.82 15.045 6.08 14.705 6.4 14.405C6.7 14.105 7.06 13.8263 7.42 13.6063C7.8 13.3863 8.2 13.2262 8.64 13.1062C9.08342 12.9867 9.54075 12.9266 10 12.9275C11.3633 12.9178 12.6765 13.4408 13.66 14.385C14.12 14.845 14.48 15.385 14.74 16.0037C14.88 16.3638 14.98 16.7437 15.04 17.1425C13.564 18.1802 11.8043 18.7384 10 18.7412ZM6.94 9.49125C6.76378 9.08778 6.67516 8.6515 6.68 8.21125C6.68 7.7725 6.76 7.3325 6.94 6.9325C7.12 6.5325 7.36 6.17375 7.66 5.87375C7.96 5.57375 8.32 5.335 8.72 5.155C9.12 4.975 9.56 4.895 10 4.895C10.46 4.895 10.88 4.975 11.28 5.155C11.68 5.335 12.04 5.575 12.34 5.87375C12.64 6.17375 12.88 6.53375 13.06 6.9325C13.24 7.3325 13.32 7.7725 13.32 8.21125C13.32 8.67125 13.24 9.09125 13.06 9.49C12.8863 9.88408 12.6423 10.2433 12.34 10.55C12.0332 10.8519 11.674 11.0954 11.28 11.2688C10.4535 11.6084 9.52647 11.6084 8.7 11.2688C8.30602 11.0954 7.94684 10.8519 7.64 10.55C7.33727 10.2477 7.09912 9.8871 6.94 9.49V9.49125ZM16.22 16.1238C16.22 16.0837 16.2 16.0638 16.2 16.0238C16.0033 15.398 15.7134 14.8055 15.34 14.2663C14.9663 13.723 14.507 13.2438 13.98 12.8475C13.5775 12.5447 13.1413 12.2897 12.68 12.0875C12.8899 11.9491 13.0843 11.7886 13.26 11.6087C13.5582 11.3144 13.82 10.9854 14.04 10.6287C14.4829 9.90101 14.7117 9.06311 14.7 8.21125C14.7062 7.58064 14.5837 6.9554 14.34 6.37375C14.0994 5.8133 13.7531 5.30445 13.32 4.875C12.8876 4.45004 12.3786 4.11074 11.82 3.875C11.2374 3.63174 10.6113 3.50968 9.98 3.51625C9.34859 3.51007 8.72253 3.63256 8.14 3.87625C7.57657 4.11148 7.06639 4.45798 6.64 4.895C6.21505 5.32698 5.87574 5.83552 5.64 6.39375C5.39631 6.9754 5.27381 7.60064 5.28 8.23125C5.28 8.67125 5.34 9.09125 5.46 9.49C5.58 9.91 5.74 10.29 5.96 10.6488C6.16 11.0087 6.44 11.3288 6.74 11.6288C6.92 11.8088 7.12 11.9675 7.34 12.1075C6.87729 12.3151 6.4409 12.5769 6.04 12.8875C5.52 13.2875 5.06 13.7662 4.68 14.2863C4.30282 14.8233 4.0126 15.4164 3.82 16.0438C3.8 16.0837 3.8 16.1238 3.8 16.1437C2.22 14.545 1.24 12.3875 1.24 9.99C1.24 5.175 5.18 1.23875 10 1.23875C14.82 1.23875 18.76 5.175 18.76 9.99C18.7574 12.2899 17.8441 14.4953 16.22 16.1238Z"
        fill={color}
      />
    </Svg>
  );
};
