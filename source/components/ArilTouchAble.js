import { TouchableOpacity } from 'react-native';
import React from 'react';
import { Colors, Styles } from 'utilities';
import AppText from './AppText';

export default class ArilTouchAble extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false
    };
  }

  onPress = () => {
    const { isClicked } = this.state;
    const { onPress } = this.props;
    if (!isClicked && onPress) {
      this.setState({ isClicked: true });
      setTimeout(() => {
        this.setState({ isClicked: false });
        // console.log("LOGGG")
        onPress();
      }, 200);
    }
  };

  render() {
    const {
      style,
      title,
      titleStyle,
      children,
      isShadow,
      icon,
      iconStyle,
      iconColor,
      color
    } = this.props;
    return (
      <TouchableOpacity
        {...this.props}
        onPress={() => {
          this.onPress();
        }}
        style={[styles.containerStyle, style]}
      >
        {children}
      </TouchableOpacity>
    );
  }
}

let styles = {
  containerStyle: {
    alignItems: 'center',
    alignSelf: 'center'
  }
};
