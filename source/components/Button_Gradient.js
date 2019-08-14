import { TouchableOpacity } from 'react-native';
import React from 'react';
import { Colors } from 'utilities';
import { Icon } from 'react-native-elements';
import { FONT_SIZE } from 'utilities/Const';
import AppText from './AppText';
import LinearGradient from 'react-native-linear-gradient';

export default class Button_Gradient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false
    };
  }

  onPress = () => {
    if (!this.state.isClicked) {
      this.props.onPress();
      this.setState({ isClicked: true });
      setTimeout(() => {
        this.setState({ isClicked: false });
      }, 200);
    }
  };

  render() {
    const {
      style,
      children,
      title,
      titleStyle,
      isShadow,
      icon,
      iconType,
      iconStyle,
      iconColor,
      color
    } = this.props;
    let shadonwStyle = null;
    if (isShadow) {
      shadonwStyle = {
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: {
          width: 0,
          height: 5
        },
        shadowRadius: 5,
        shadowOpacity: 1
      };
    }

    return (
      <LinearGradient colors={['#4cec51', '#18bcd2']} style={styles.containerStyle}>
        <TouchableOpacity
          {...this.props}
          onPress={() => {
            this.onPress();
          }}
          style={[styles.shadonwStyle]}
        >
          {icon ? (
            <Icon
              type="font-awesome"
              name={icon}
              iconStyle={iconStyle}
              color={iconColor || color}
            />
          ) : null}
          {<AppText style={[styles.title, titleStyle]} text={title} />}
        </TouchableOpacity>
      </LinearGradient>
    );
  }
}

let styles = {
  containerStyle: {
    width: '80%',
    height: 42,
    marginTop: 20,
    margin: 10,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    textAlign: 'center'
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    color: Colors.BUTTON_COLOR,
    fontSize: 11,
    textAlign: 'center'
  }
};
