import FastImage from 'react-native-fast-image';
import { View, ActivityIndicator } from 'react-native';
import React from 'react';

export default class AppImage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  render() {
    const { style, source, loading } = this.props;
    const { isLoading } = this.state;
    if (!loading) {
      return (
        <FastImage
          style={style}
          source={source}
          resizeMode={FastImage.resizeMode.stretch}
          onLoad={() => {
            console.log('lOADED');
            this.setState({ isLoading: false });
          }}
          {...this.props}
        />
      );
    }
    return (
      <View style={[{ justifyContent: 'center', alignItems: 'center' }, style]}>
        <FastImage
          source={source}
          resizeMode={FastImage.resizeMode.stretch}
          onLoad={() => {
            console.log('lOADED');
            this.setState({ isLoading: false });
          }}
          {...this.props}
        />
        <ActivityIndicator style={{ position: 'absolute' }} animating={isLoading} />
      </View>
    );
  }
}
