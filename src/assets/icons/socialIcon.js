import * as React from 'react';
import Svg, {Path, G, Rect, ClipPath, Defs} from 'react-native-svg';

export default ({color = '#FA4A0C', width = 27, height = 27, name = 'fb'}) => {
  switch (name) {
    case 'fb':
      return (
        <Svg
          width={width}
          height={height}
          viewBox="0 0 27 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <G clip-path="url(#clip0_163_37278)">
            <Rect width="27" height="27" rx="10" fill="white" />
            <Path
              d="M25.5098 27.0001C26.3327 27.0001 27 26.3329 27 25.5099V1.49017C27 0.66709 26.3327 0 25.5098 0H1.49017C0.666984 0 0 0.66709 0 1.49017V25.5099C0 26.3329 0.666984 27.0001 1.49017 27.0001H25.5098Z"
              fill="#395185"
            />
            <Path
              d="M18.6294 27.0001V16.5442H22.1391L22.6645 12.4695H18.6294V9.86775C18.6294 8.68798 18.9571 7.88399 20.6489 7.88399L22.8067 7.88304V4.23857C22.4333 4.18889 21.1525 4.07794 19.6624 4.07794C16.5513 4.07794 14.4215 5.97691 14.4215 9.46434V12.4695H10.9028V16.5442H14.4215V27.0001H18.6294Z"
              fill="white"
            />
          </G>
          <Defs>
            <ClipPath id="clip0_163_37278">
              <Rect width="27" height="27" rx="10" fill="white" />
            </ClipPath>
          </Defs>
        </Svg>
      );
    case 'gg':
      return (
        <Svg
          width={width}
          height={height}
          viewBox="0 0 27 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <Path
            d="M24.5312 11.2967H23.625V11.25H13.5V15.75H19.8579C18.9304 18.3696 16.4379 20.25 13.5 20.25C9.77231 20.25 6.75 17.2277 6.75 13.5C6.75 9.77231 9.77231 6.75 13.5 6.75C15.2207 6.75 16.7861 7.39912 17.9781 8.45944L21.1601 5.27737C19.1509 3.40481 16.4633 2.25 13.5 2.25C7.28719 2.25 2.25 7.28719 2.25 13.5C2.25 19.7128 7.28719 24.75 13.5 24.75C19.7128 24.75 24.75 19.7128 24.75 13.5C24.75 12.7457 24.6724 12.0094 24.5312 11.2967Z"
            fill="#FFC107"
          />
          <Path
            d="M3.54736 8.26369L7.24355 10.9744C8.24368 8.49825 10.6658 6.75 13.5002 6.75C15.2209 6.75 16.7864 7.39913 17.9783 8.45944L21.1604 5.27738C19.1511 3.40481 16.4635 2.25 13.5002 2.25C9.17911 2.25 5.43174 4.68956 3.54736 8.26369Z"
            fill="#FF3D00"
          />
          <Path
            d="M13.5002 24.75C16.4061 24.75 19.0464 23.6379 21.0427 21.8295L17.5609 18.8831C16.3934 19.771 14.9669 20.2512 13.5002 20.25C10.5741 20.25 8.08949 18.3842 7.15349 15.7804L3.48486 18.6069C5.34674 22.2502 9.12786 24.75 13.5002 24.75Z"
            fill="#4CAF50"
          />
          <Path
            d="M24.5312 11.2967H23.625V11.25H13.5V15.75H19.8579C19.4142 16.9967 18.615 18.0862 17.559 18.8837L17.5607 18.8826L21.0426 21.8289C20.7962 22.0528 24.75 19.125 24.75 13.5C24.75 12.7457 24.6724 12.0094 24.5312 11.2967Z"
            fill="#1976D2"
          />
        </Svg>
      );
  }
};