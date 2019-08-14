import { TouchableOpacity } from 'react-native';
import React from 'react';
import { Colors, Consts, Styles } from 'utilities';
import { Icon } from 'react-native-elements';
import AppText from './AppText';

export default class Buttonsend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false
    };
  }

  onPress = () => {
    const { isClicked } = this.state;
    const { onPress } = this.props;
    if (!isClicked) {
      onPress();
      this.setState({ isClicked: true });
      setTimeout(() => {
        this.setState({ isClicked: false });
      }, 200);
    }
  };

  render() {
    const { style, title, titleStyle, isShadow, icon, iconStyle, iconColor, color } = this.props;
    return (
      <TouchableOpacity
        {...this.props}
        onPress={() => {
          this.onPress();
        }}
        style={[styles.containerStyle, isShadow ? Styles.ViewStyle.shadowStyle : null, style]}
      >
        {icon ? (
          <Icon type="font-awesome" name={icon} iconStyle={iconStyle} color={iconColor || color} />
        ) : null}
        {title ? <AppText style={[styles.title, titleStyle]} text={title} /> : null}
      </TouchableOpacity>
    );
  }
}

let styles = {
  containerStyle: {
    width: '35%',
    height: 30,
    margin: 8,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.MAIN_COLOR
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: Consts.FONT_SIZE.BUTTON
  }
};
