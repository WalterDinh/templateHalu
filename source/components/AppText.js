/* eslint-disable react/prefer-stateless-function */
import { Text } from 'react-native';
import React from 'react';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

export default class AppText extends React.Component {
  render() {
    const { style, text, numberOfLines } = this.props;
    return (
      <Text
        ellipsizeMode="tail"
        numberOfLines={numberOfLines}
        allowFontScaling={false}
        style={[styles.text, style]}
      >
        {text}
      </Text>
    );
  }
}

let styles = {
  text: {
    color: 'black',
    letterSpacing: 0.4,
    fontSize: responsiveFontSize(1.6)
  }
};
