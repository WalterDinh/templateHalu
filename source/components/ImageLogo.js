import React from 'react';
import { Colors } from 'utilities';
import { Image, View } from 'react-native';
import { Consts, I18n, Images } from 'utilities';
import { AppImage } from './index';

class ImageLogo extends React.PureComponent {
  render() {
    const { style, imageLogoStyle } = this.props;
    return (
      <View style={[styles.boderImage, style]}>
        <AppImage
          resizeMode="cover"
          source={Images.logoMini}
          {...this.props}
          style={[styles.logoMini, imageLogoStyle]}
        />
      </View>
    );
  }
}
const styles = {
  logoMini: {
    width: 80,
    height: 80
  },
  boderImage: {
    backgroundColor: 'white',
    width: 106,
    height: 106,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 106 / 2,
    borderColor: Colors.MAIN_COLOR
  }
};

export default ImageLogo;
