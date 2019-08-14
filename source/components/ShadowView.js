import React from 'react';
import { View, TextInput, Image } from 'react-native';
import { Consts, Colors, Styles } from 'utilities';
import AppText from './AppText';

export default class ShadowView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { containerStyle, isShadow } = this.props;
    return (
      <View style={[container, isShadow ? Styles.ViewStyle.shadowStyle : null, containerStyle]} />
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
  }
};
