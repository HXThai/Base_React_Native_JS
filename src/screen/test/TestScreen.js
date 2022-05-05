import React, {Component} from 'react';
import {Animated, Dimensions, StyleSheet, Text, View} from 'react-native';

import {Sizings} from '~/utils';
import {SvgXml} from 'react-native-svg';
// import x from '~/assets/temp/po.svg';

let x = `

<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg version="1.1" id="Layer_1"
	xmlns="http://www.w3.org/2000/svg"
  fill="black"
	xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="600px" height="400px" viewBox="0 0 600 400" enable-background="new 0 0 600 400" xml:space="preserve">
	<path d="M345.24,293.32c-41.69,0-83.38,0-125.06,0c0.5,0.52,1,1.04,1.5,1.56c0-48.91,0-97.81,0-146.72c0-0.69,0-1.38,0-2.07
	c-0.5,0.52-1,1.04-1.5,1.56c41.69,0,83.38,0,125.06,0c-0.5-0.52-1-1.04-1.5-1.56c0,48.91,0,97.81,0,146.72c0,0.69,0,1.38,0,2.07
	c0,2.01,3,2.01,3,0c0-48.91,0-97.81,0-146.72c0-0.69,0-1.38,0-2.07c0-0.85-0.68-1.56-1.5-1.56c-41.69,0-83.38,0-125.06,0
	c-0.82,0-1.5,0.71-1.5,1.56c0,48.91,0,97.81,0,146.72c0,0.69,0,1.38,0,2.07c0,0.85,0.68,1.56,1.5,1.56c41.69,0,83.38,0,125.06,0
	C347.17,296.45,347.17,293.32,345.24,293.32z"/>
	<path d="M345.64,296.4c12.4-2.93,24.81-5.86,37.21-8.79c1.88-0.44,1.08-3.34-0.8-2.89c-12.4,2.93-24.81,5.86-37.21,8.78
	C342.96,293.95,343.76,296.85,345.64,296.4L345.64,296.4z"/>
	<path d="M291.29,294.95c0,21.1,0,42.2,0,63.31c0,1.94,3,1.94,3,0c0-21.1,0-42.2,0-63.31C294.29,293.02,291.29,293.02,291.29,294.95
	L291.29,294.95z"/>
	<path d="M354.65,292.38c0,21.96,0,43.92,0,65.88c0,1.94,3,1.94,3,0c0-21.96,0-43.92,0-65.88
	C357.65,290.44,354.65,290.44,354.65,292.38L354.65,292.38z"/>
	<path d="M292.79,359.76c21.12,0,42.25,0,63.37,0c1.93,0,1.93-3,0-3c-21.12,0-42.25,0-63.37,0
	C290.85,356.76,290.85,359.76,292.79,359.76L292.79,359.76z"/>
	<path d="M317.59,229.89c-23.26,0-46.51,0-69.77,0c0.5,0.5,1,1,1.5,1.5c0-20.93,0-41.86,0-62.79c-0.5,0.5-1,1-1.5,1.5
	c23.26,0,46.51,0,69.77,0c-0.5-0.5-1-1-1.5-1.5c0,20.93,0,41.86,0,62.79c0,1.94,3,1.94,3,0c0-20.93,0-41.86,0-62.79
	c0-0.82-0.68-1.5-1.5-1.5c-23.26,0-46.51,0-69.77,0c-0.82,0-1.5,0.68-1.5,1.5c0,20.93,0,41.86,0,62.79c0,0.82,0.68,1.5,1.5,1.5
	c23.26,0,46.51,0,69.77,0C319.53,232.89,319.53,229.89,317.59,229.89z"/>
	<path d="M317.59,245.39c-23.26,0-46.51,0-69.77,0c0.5,0.5,1,1,1.5,1.5c0-3.71,0-7.41,0-11.11c-0.5,0.5-1,1-1.5,1.5
	c23.26,0,46.51,0,69.77,0c-0.5-0.5-1-1-1.5-1.5c0,3.7,0,7.4,0,11.11c0,1.94,3,1.94,3,0c0-3.71,0-7.41,0-11.11
	c0-0.82-0.68-1.5-1.5-1.5c-23.26,0-46.51,0-69.77,0c-0.82,0-1.5,0.68-1.5,1.5c0,3.7,0,7.4,0,11.11c0,0.82,0.68,1.5,1.5,1.5
	c23.26,0,46.51,0,69.77,0C319.53,248.39,319.53,245.39,317.59,245.39z"/>
	<path d="M317.59,249.01c-23.26,0-46.51,0-69.77,0c-0.82,0-1.5,0.68-1.5,1.5c0,2.15,0,4.31,0,6.46c0,0.82,0.68,1.5,1.5,1.5
	c9.47,0,18.95,0,28.42,0c-0.5-0.5-1-1-1.5-1.5c0,9.73,0,19.47,0,29.2c0,0.82,0.68,1.5,1.5,1.5c4.65,0,9.3,0,13.95,0
	c0.82,0,1.5-0.68,1.5-1.5c0-9.73,0-19.47,0-29.2c-0.5,0.5-1,1-1.5,1.5c9.13,0,18.26,0,27.39,0c0.82,0,1.5-0.68,1.5-1.5
	c0-2.15,0-4.31,0-6.46c0-1.93-3-1.93-3,0c0,2.15,0,4.31,0,6.46c0.5-0.5,1-1,1.5-1.5c-9.13,0-18.26,0-27.39,0
	c-0.82,0-1.5,0.68-1.5,1.5c0,9.73,0,19.47,0,29.2c0.5-0.5,1-1,1.5-1.5c-4.65,0-9.3,0-13.95,0c0.5,0.5,1,1,1.5,1.5
	c0-9.73,0-19.47,0-29.2c0-0.82-0.68-1.5-1.5-1.5c-9.48,0-18.95,0-28.42,0c0.5,0.5,1,1,1.5,1.5c0-2.15,0-4.31,0-6.46
	c-0.5,0.5-1,1-1.5,1.5c23.26,0,46.51,0,69.77,0C319.53,252.01,319.53,249.01,317.59,249.01z"/>
	<path d="M266.82,189.09c16.93-0.11,33.85-0.21,50.77-0.32c1.93-0.01,1.94-3.01,0-3c-16.92,0.11-33.85,0.21-50.77,0.32
	C264.88,186.1,264.88,189.1,266.82,189.09L266.82,189.09z"/>
	<path d="M246.76,169.66c6.33,6.33,12.66,12.66,18.99,18.99c1.37,1.37,3.49-0.75,2.12-2.12c-6.33-6.33-12.66-12.66-18.99-18.99
	C247.52,166.17,245.4,168.29,246.76,169.66L246.76,169.66z"/>
	<path fill="#1D1D1B" d="M265.52,186.83c-6.33,14.08-12.66,28.17-18.99,42.25c-0.79,1.75,1.8,3.28,2.59,1.51c6.33-14.08,12.66-28.16,18.99-42.25
	C268.9,186.6,266.31,185.07,265.52,186.83L265.52,186.83z"/>
	<line fill="none" x1="220.18" y1="150.56" x2="247.82" y2="140.95"/>
	<g>
		<path d="M345.24,144.86c-1.85,0.55-1.06,3.44,0.8,2.89l0,0"/>
	</g>
	<g>
		<path d="M335.73,296.45c0,20.6,0,41.21,0,61.81c0,1.94,3,1.94,3,0c0-20.6,0-41.21,0-61.81
		C338.73,294.51,335.73,294.51,335.73,296.45L335.73,296.45z"/>
	</g>
	<!-- <path fill="#1D1D1B" d="M384.55,285.72c0.44-43.68,0.45-87.37,0.01-131.05c-0.02-1.93-3.02-1.94-3,0
	c0.44,43.68,0.43,87.37-0.01,131.05C381.53,287.66,384.53,287.65,384.55,285.72L384.55,285.72z"/> -->
	<path fill="#1D1D1B" d="M343.85,147.2c12.71,2.88,25.42,5.76,38.13,8.64c1.88,0.43,2.69-2.46,0.8-2.89
	c-12.71-2.88-25.42-5.76-38.13-8.64C342.76,143.88,341.96,146.77,343.85,147.2L343.85,147.2z"/>
</svg>
`;
export default class TestScreen extends Component {
  render() {
    return (
      <View style={styles.main}>
        <SvgXml width="200" height="200" xml={x} />
        <Text>
          Move up (with two fingers) or right/left (with one finger) and watch
          magic happens
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    width: Sizings.deviceWidth,
    height: Sizings.deviceHeight,
    backgroundColor: 'white',
    paddingVertical: 50,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'red',
  },
});
