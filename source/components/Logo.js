import { View, TouchableOpacity, Image, Text } from 'react-native';
import React from 'react';
import { Colors } from 'utilities';
import { AppText } from '.';
import AppImage from './AppImage';

export default class Logo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false
    };
  }

  onPress = () => {
    if (this.props.omPress) {
      if (!this.state.isClicked) {
        this.props.onPress();
        this.setState({ isClicked: true });
        setTimeout(() => {
          this.setState({ isClicked: false });
        }, 200);
      }
    }
  };

  render() {
    const { style, title, isShadow, source, onPress } = this.props;
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
      <TouchableOpacity
        {...this.props}
        activeOpacity={onPress ? 0.2 : 1}
        onPress={() => {
          this.onPress();
        }}
        style={[styles.containerStyle, shadonwStyle, style]}
      >
        <View style={styles.imageContainer}>
          <AppImage source={source} style={styles.image} resizeMode="cover" />
        </View>
      </TouchableOpacity>
    );
  }
}

let styles = {
  title: {
    fontSize: 10,
    color: Colors.MAIN_COLOR,
    fontWeight: '900',
    textAlign: 'center'
  },
  titleContainer: {
    width: 75,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.BODER_AVT_LOGO
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    borderWidth: 1,
    borderColor: Colors.BODER_AVT_LOGO
  },
  containerStyle: {
    width: 60,
    height: 60,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'transparent'
  }
};
