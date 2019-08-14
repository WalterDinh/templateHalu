import React from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  Keyboard,
  Platform,
  KeyboardAvoidingView
} from 'react-native';
import { Consts, Colors } from 'utilities';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Icon, CheckBox } from 'react-native-elements';
import AppText from './AppText';
import ArilTouchAble from './ArilTouchAble';
import Header from './Header';

export default class Container extends React.PureComponent {
  render() {
    const {
      children,
      leftIcon,
      title,
      navigation,
      isBack,
      contentContainerStyle,
      rank,
      colorIcon
    } = this.props;
    return (
      <View style={styles.container}>
        {title ? (
          <Header leftIcon={leftIcon} navigation={navigation} isBack={isBack} title={title} />
        ) : null}

        <KeyboardAwareScrollView
          {...this.props}
          nestedScrollEnabled
          keyboardShouldPersistTaps="handled"
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
          accessible={false}
        >
          {/* {titleNoIcon ? <Header title={titleNoIcon} /> : null} */}
          {children}
        </KeyboardAwareScrollView>
        {rank ? (
          <View
            style={{ position: 'absolute', top: 40, left: 20, alignItems: 'center', zIndex: 4 }}
          >
            <Icon name="md-bookmark" type="ionicon" color={colorIcon} size={55} />
            <AppText
              text={rank}
              style={{ position: 'absolute', top: '30%', color: 'white', fontWeight: 'bold' }}
            />
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = {
  contentContainer: {
    alignItems: 'center',
    // flex: 1,
    flexGrow: 1,
    width: '100%',
    paddingTop: 8,
    backgroundColor: 'white'
  },
  container: {
    width: Consts.DEVICE_WIDTH,
    flex: 1
  }
};
