import * as React from 'react';
import Svg, {Path, G, Rect, ClipPath, Defs} from 'react-native-svg';

export default ({
  color = '#424242',
  width = 45,
  height = 45,
  status = true,
}) => {
  switch (status) {
    case true:
      return (
        <Svg
          width={width}
          height={height}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <Path
            d="M14.712 2.28898L14.625 2.21098C14.4327 2.05914 14.1913 1.9832 13.9467 1.99757C13.7021 2.01195 13.4712 2.11565 13.298 2.28898L13.22 2.37598C13.0682 2.56815 12.9923 2.80937 13.0067 3.05382C13.0211 3.29827 13.1248 3.52893 13.298 3.70198L14.597 4.99898H8.99901L8.75902 5.00298C6.94606 5.06468 5.22793 5.82806 3.96697 7.13212C2.70601 8.43618 2.00078 10.179 2.00002 11.993C1.99712 13.3824 2.41133 14.7406 3.18901 15.892C3.34324 16.1076 3.5768 16.2531 3.83832 16.2965C4.09984 16.34 4.36789 16.2777 4.58351 16.1235C4.79914 15.9693 4.94466 15.7357 4.98808 15.4742C5.03149 15.2127 4.96924 14.9446 4.81502 14.729L4.68001 14.511C4.23739 13.7514 4.00297 12.8886 4.00041 12.0095C3.99786 11.1304 4.22726 10.2662 4.66547 9.50411C5.10367 8.74202 5.73517 8.10901 6.49622 7.669C7.25726 7.22898 8.12092 6.99752 9.00002 6.99798H14.595L13.298 8.29498L13.22 8.38198C13.0576 8.58166 12.9786 8.83631 12.9993 9.09285C13.0201 9.34938 13.1391 9.588 13.3315 9.75898C13.5238 9.92995 13.7748 10.0201 14.032 10.0106C14.2892 10.0011 14.5328 9.89268 14.712 9.70798L17.718 6.70498L17.795 6.61798C17.9468 6.42581 18.0227 6.18459 18.0083 5.94014C17.9939 5.69569 17.8903 5.46503 17.717 5.29198L14.712 2.28898ZM20.787 8.05998C20.659 7.89563 20.4827 7.77544 20.2829 7.71622C20.0832 7.65701 19.8699 7.66173 19.673 7.72972C19.476 7.79772 19.3053 7.9256 19.1846 8.09545C19.0639 8.2653 18.9994 8.46863 19 8.67698C19 8.88598 19.064 9.07898 19.172 9.23798C19.6692 9.99117 19.9532 10.865 19.9937 11.7666C20.0343 12.6682 19.8298 13.5639 19.4022 14.3587C18.9746 15.1535 18.3397 15.8176 17.5649 16.2805C16.7902 16.7435 15.9045 16.9879 15.002 16.988H9.41401L10.708 15.698L10.791 15.602C10.9272 15.4256 11.0006 15.2088 10.9995 14.9859C10.9984 14.7631 10.9229 14.547 10.785 14.372L10.708 14.284L10.613 14.2C10.4364 14.0635 10.2192 13.9899 9.99598 13.991C9.77276 13.9921 9.5563 14.0678 9.38101 14.206L9.29302 14.284L6.28802 17.287L6.20502 17.382C6.06858 17.5584 5.99506 17.7755 5.99615 17.9985C5.99724 18.2216 6.07287 18.4379 6.21102 18.613L6.28802 18.7L9.29302 21.703L9.38801 21.787C9.58108 21.9361 9.82201 22.0095 10.0654 21.9934C10.3088 21.9773 10.538 21.8727 10.7097 21.6994C10.8814 21.5261 10.9838 21.296 10.9977 21.0524C11.0116 20.8089 10.9359 20.5687 10.785 20.377L10.708 20.29L9.40402 18.987H15L15.24 18.984C16.4908 18.941 17.7071 18.5634 18.7622 17.8904C19.8174 17.2175 20.6727 16.2739 21.2391 15.1579C21.8055 14.0419 22.0623 12.7945 21.9826 11.5455C21.9029 10.2966 21.4897 9.0919 20.786 8.05698V8.05998H20.787Z"
            fill={color}
          />
        </Svg>
      );
    case false:
    default:
      return (
        <Svg
          width={width}
          height={height}
          viewBox="0 0 21 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <Path
            d="M0.385206 0.389637C0.607396 0.167439 0.901962 0.0323396 1.21535 0.00890445C1.52873 -0.0145306 1.84012 0.0752545 2.0929 0.261934L2.23987 0.387888L20.6116 18.756L20.7393 18.9047C20.9274 19.1575 21.0183 19.4695 20.9953 19.7838C20.9723 20.098 20.8369 20.3935 20.614 20.6162C20.391 20.8388 20.0954 20.9739 19.7811 20.9966C19.4667 21.0193 19.1548 20.9281 18.9021 20.7398L18.7569 20.6121L15.4832 17.3408C15.1648 17.4108 14.8393 17.4563 14.5069 17.4808L14.0012 17.4983L9.72327 17.4965L10.9865 18.7595C11.2092 18.9818 11.3447 19.2767 11.3681 19.5904C11.3915 19.9041 11.3015 20.2158 11.1143 20.4687L10.9865 20.6156C10.7641 20.8375 10.4695 20.9723 10.1561 20.9954C9.8427 21.0185 9.53143 20.9285 9.27885 20.7416L9.13188 20.6156L5.62901 17.1134C5.40677 16.8913 5.27164 16.5968 5.2482 16.2834C5.22476 15.9701 5.31457 15.6588 5.50128 15.406L5.62901 15.2574L9.13188 11.7569C9.26321 11.6247 9.4213 11.5221 9.59554 11.456L4.8399 6.69779C3.85192 7.25914 3.12122 8.18286 2.80248 9.27341C2.48374 10.364 2.602 11.5357 3.13221 12.5406L3.32468 12.8642C3.50124 13.1617 3.55314 13.5169 3.4691 13.8525C3.38506 14.188 3.17187 14.4768 2.87592 14.656C2.57997 14.8352 2.22521 14.8903 1.88885 14.8093C1.55248 14.7283 1.26172 14.5178 1.07983 14.2235C0.127335 12.7124 -0.210313 10.894 0.136231 9.14175C0.482775 7.38951 1.48721 5.83645 2.94324 4.80149L0.385206 2.24395L0.257479 2.097C0.070287 1.84413 -0.0197956 1.53243 0.00364964 1.21871C0.0270949 0.90499 0.162507 0.610136 0.385206 0.387888V0.389637ZM18.8129 6.15199C19.0251 6.15187 19.2342 6.20322 19.4222 6.30164C19.6103 6.40005 19.7716 6.54259 19.8924 6.71703L19.9624 6.82899C20.6435 7.93247 21.0029 9.20419 21 10.5009C21.0029 12.1614 20.4122 13.7683 19.3343 15.0317L17.4691 13.1669C18.0581 12.403 18.3769 11.4654 18.3755 10.5009C18.3755 9.63494 18.1235 8.8285 17.6913 8.14975C17.5697 7.95074 17.5034 7.72291 17.4991 7.48974C17.4948 7.25656 17.5528 7.02647 17.6671 6.82314C17.7813 6.61982 17.9477 6.45061 18.1491 6.33295C18.3505 6.2153 18.5796 6.15343 18.8129 6.15374V6.15199ZM11.1143 13.4643L10.9865 13.6095L9.72502 14.8707H13.0127L11.2875 13.1441C11.2449 13.2578 11.1866 13.365 11.1143 13.4625V13.4643ZM10.0172 0.384389C10.2394 0.16219 10.534 0.0270915 10.8474 0.00365637C11.1607 -0.0197787 11.4721 0.0700064 11.7249 0.256686L11.8719 0.384389L15.3747 3.88484L15.5007 4.03353C15.6658 4.25626 15.756 4.52553 15.7586 4.80272C15.7611 5.07991 15.6757 5.35077 15.5147 5.57646L15.3747 5.74089L12.7065 8.40865L10.8518 6.55259L11.2787 6.12575H10.4231L7.80037 3.50348H11.2787L10.019 2.24395L9.89124 2.09525C9.70452 1.84252 9.61472 1.53119 9.63816 1.21787C9.6616 0.904544 9.79673 0.610034 10.019 0.387888L10.0172 0.384389Z"
            fill={color}
          />
        </Svg>
      );
  }
};
