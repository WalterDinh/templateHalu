import React from 'react';
import { Colors, Styles, Consts, I18n, Images } from 'utilities/index';
import { Image, View } from 'react-native';
import AppImage from './AppImage';

class AvatarInformation extends React.PureComponent {
  render() {
    const { style, isShadow } = this.props;
    return (
      <View style={[styles.boderImage, style, Styles.ViewStyle.shadowStyle]}>
        <AppImage {...this.props} source={Images.logoMini} style={styles.logoMini} />
      </View>
    );
  }
}
const styles = {
  logoMini: {
    width: 96,
    height: 95
  },
  boderImage: {
    backgroundColor: Colors.BACKGROUND_AVT_LOGO,
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 150 / 2
  }
};

export default AvatarInformation;
