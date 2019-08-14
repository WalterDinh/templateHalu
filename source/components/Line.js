import { View } from 'react-native';
import React from 'react';
import { Colors } from 'utilities';

export default class Line extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { style, text } = this.props;
    return <View style={[styles.text, style]} />;
  }
}

let styles = {
  text: {
    backgroundColor: '#rgba(151,151,151,0.3)',
    height: 2
  }
};
