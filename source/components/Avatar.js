import { View, TouchableOpacity, Image, Text } from 'react-native';
import React from 'react';
import { Colors } from 'utilities';
import { AppText } from '.';
import AppImage from './AppImage';

export default class Avatar extends React.Component {
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
    const { style, title, isShadow, source } = this.props;
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
        activeOpacity={this.props.onPress ? 0.2 : 1}
        onPress={() => {
          this.onPress();
        }}
        style={[styles.containerStyle, shadonwStyle, style]}
      >
        <View style={styles.imageContainer}>
          <AppImage source={source} style={styles.image} />
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
    width: 90,
    height: 90,
    borderRadius: 90 / 2,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.COLOR_TEXT
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 90 / 2
  },
  containerStyle: {
    width: 90,
    height: 90,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'transparent'
  }
};
