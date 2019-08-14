import React from 'react';
import { View, TextInput, Image } from 'react-native';
import { Consts, Colors, Styles } from 'utilities';
import AppText from './AppText';

export default class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { containerStyle, isShadow, editAble, style } = this.props;
    return (
      <View
        style={[styles.container, isShadow ? Styles.ViewStyle.shadowStyle : null, containerStyle]}
      >
        <TextInput
          style={[{ width: '100%' }, style]}
          {...this.props}
          editable={editAble}
          autoCorrect={false}
        />
      </View>
    );
  }
}

const styles = {
  container: {
    width: '100%',
    alignItems: 'center',
    height: 42,
    flexDirection: 'row',
    backgroundColor: '#0000',
    paddingLeft: 16
  },
  textInput: {
    position: 'absolute',
    left: 0
  }
};
