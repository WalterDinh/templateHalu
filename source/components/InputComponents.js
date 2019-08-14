import React from 'react';
import { View, TextInput, Image } from 'react-native';
import { Consts, Colors } from 'utilities';
import AppText from './AppText';

export default class InputComponents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={[styles.container]}>
        <TextInput {...this.props} />
      </View>
    );
  }
}

const styles = {
  container: {
    width: '100%',
    textAlign: 'center',
    color: Colors.BUTTON_COLOR,
    fontSize: 16,
    paddingLeft: 8,
    alignItems: 'center',
    height: 44,
    flexDirection: 'row'
  },
  textInput: {
    position: 'absolute',
    left: 0
  }
};
