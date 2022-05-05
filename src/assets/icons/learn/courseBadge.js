import * as React from 'react';
import Svg, {Path, Rect} from 'react-native-svg';

export default ({color = '#F8774A', width = 30, height = 32}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 30 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M3.75 0.25C2.75544 0.25 1.80161 0.645088 1.09835 1.34835C0.395088 2.05161 0 3.00544 0 4V26.5C0 27.4946 0.395088 28.4484 1.09835 29.1516C1.80161 29.8549 2.75544 30.25 3.75 30.25H14.715C14.0719 29.5806 13.5275 28.823 13.098 28H3.75C3.35218 28 2.97064 27.842 2.68934 27.5607C2.40804 27.2794 2.25 26.8978 2.25 26.5H12.4695C12.2342 25.77 12.0861 25.0148 12.0285 24.25H2.25V4C2.25 3.60218 2.40804 3.22064 2.68934 2.93934C2.97064 2.65804 3.35218 2.5 3.75 2.5H21C21.3978 2.5 21.7794 2.65804 22.0607 2.93934C22.342 3.22064 22.5 3.60218 22.5 4V13.7785C23.28 13.8385 24.033 13.9885 24.75 14.2195V4C24.75 3.00544 24.3549 2.05161 23.6516 1.34835C22.9484 0.645088 21.9946 0.25 21 0.25H3.75ZM30 23.5C30 21.312 29.1308 19.2135 27.5836 17.6664C26.0365 16.1192 23.938 15.25 21.75 15.25C19.562 15.25 17.4635 16.1192 15.9164 17.6664C14.3692 19.2135 13.5 21.312 13.5 23.5C13.5 25.688 14.3692 27.7865 15.9164 29.3336C17.4635 30.8808 19.562 31.75 21.75 31.75C23.938 31.75 26.0365 30.8808 27.5836 29.3336C29.1308 27.7865 30 25.688 30 23.5ZM20.871 19.8955L25.08 22.6555C25.2104 22.7392 25.3174 22.8547 25.3909 22.9912C25.4644 23.1276 25.5019 23.2805 25.5 23.4355C25.5002 23.5915 25.4631 23.7452 25.392 23.884C25.3249 24.0214 25.2223 24.1384 25.095 24.223L20.8845 27.0955C20.8112 27.1448 20.7315 27.1837 20.6475 27.211C20.4525 27.2733 20.2414 27.261 20.055 27.1765C19.9475 27.1262 19.8496 27.0577 19.7655 26.974C19.6843 26.8855 19.6184 26.7841 19.5705 26.674C19.5236 26.5613 19.4997 26.4405 19.5 26.3185V20.6815C19.4992 20.501 19.5508 20.3242 19.6485 20.1724C19.7462 20.0207 19.8859 19.9005 20.0505 19.8265C20.1813 19.7652 20.3258 19.7392 20.4697 19.751C20.6137 19.7629 20.752 19.8122 20.871 19.894V19.8955ZM4.5 6.25C4.5 5.85218 4.65804 5.47064 4.93934 5.18934C5.22064 4.90804 5.60218 4.75 6 4.75H18C18.3978 4.75 18.7794 4.90804 19.0607 5.18934C19.342 5.47064 19.5 5.85218 19.5 6.25V9.25C19.5 9.64782 19.342 10.0294 19.0607 10.3107C18.7794 10.592 18.3978 10.75 18 10.75H6C5.60218 10.75 5.22064 10.592 4.93934 10.3107C4.65804 10.0294 4.5 9.64782 4.5 9.25V6.25ZM6.75 8.5H17.25V7H6.75V8.5Z"
        fill={color}
      />
    </Svg>
  );
};
