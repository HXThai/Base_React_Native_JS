import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export default ({color = 'white', width = 21, height = 20}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M19.8061 2.90547L18.4842 3.93906C16.6818 1.63516 13.8787 0.15625 10.7311 0.15625C5.29591 0.15625 0.896688 4.55078 0.889657 9.98828C0.882626 15.4305 5.29122 19.8438 10.7311 19.8438C14.9803 19.8438 18.6014 17.1484 19.9795 13.3727C20.0147 13.2742 19.9631 13.1641 19.8647 13.1312L18.5358 12.6742C18.4894 12.6583 18.4387 12.6612 18.3945 12.6822C18.3502 12.7033 18.316 12.7408 18.299 12.7867C18.2568 12.9039 18.21 13.0211 18.1608 13.1359C17.7553 14.0969 17.174 14.9594 16.4334 15.7C15.6988 16.436 14.8289 17.0233 13.8717 17.4297C12.8803 17.8492 11.8232 18.0625 10.7358 18.0625C9.64591 18.0625 8.59122 17.8492 7.59981 17.4297C6.64163 17.0251 5.7715 16.4375 5.03809 15.7C4.30145 14.9654 3.71477 14.0946 3.31075 13.1359C2.89122 12.1422 2.67794 11.0875 2.67794 9.99766C2.67794 8.90781 2.89122 7.85313 3.31075 6.85938C3.71622 5.89844 4.29747 5.03594 5.03809 4.29531C5.77872 3.55469 6.64122 2.97344 7.59981 2.56563C8.59122 2.14609 9.64825 1.93281 10.7358 1.93281C11.8256 1.93281 12.8803 2.14609 13.8717 2.56563C14.8299 2.97026 15.7 3.55778 16.4334 4.29531C16.6654 4.52734 16.8834 4.77344 17.085 5.03125L15.674 6.13281C15.6461 6.15441 15.6249 6.18344 15.6127 6.21658C15.6006 6.24972 15.598 6.28562 15.6054 6.32014C15.6127 6.35466 15.6296 6.38641 15.6542 6.41173C15.6788 6.43705 15.7101 6.45492 15.7443 6.46328L19.86 7.47109C19.9772 7.49922 20.092 7.41016 20.092 7.29062L20.1108 3.05078C20.1084 2.89609 19.9279 2.80938 19.8061 2.90547Z"
        fill={color}
      />
    </Svg>
  );
};