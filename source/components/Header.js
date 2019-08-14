import React from 'react';
import { View } from 'react-native';
import { Colors, Consts } from 'utilities';
import { Header, Icon } from 'react-native-elements';
import Button from './Button';
import ArilTouchAble from './ArilTouchAble';
import AppText from './AppText';

export default class HeaderApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderLeftChild() {
    const { leftIcon, leftTitle, iconType, isBack, leftOnPress,isBackPress, navigation } = this.props;

    return (
      <ArilTouchAble
        onPress={() => {
          if (isBack) {
            navigation.goBack();
            if (isBackPress){
              isBackPress();
            }
            return;
          }
          if (leftOnPress) {
            leftOnPress();
          }
        }}
        style={styles.leftChildContainer}
      >
        {leftIcon || isBack ? (
          <View style={styles.iconHeader}>
            <Icon
              color={Colors.BACKGROUND}
              type={iconType || 'octicons'}
              name="chevron-left"
              size={Consts.FONT_SIZE.ICON}
            />
          </View>
        ) : null}
        {leftTitle ? <AppText text={leftTitle} /> : null}
      </ArilTouchAble>
    );
  }

  renderRightChild() {
    const { rightIcon, rightTitle, iconType, rightOnPress, navigation } = this.props;

    return (
      <ArilTouchAble
        onPress={() => {
          if (rightOnPress) {
            rightOnPress();
          }
        }}
        style={styles.rightChildContainer}
      >
        {rightIcon ? (
          <Icon color={Colors.MAIN_COLOR} type={iconType || 'ionicon'} name={rightIcon} />
        ) : null}
        {rightTitle ? <AppText text={rightTitle} /> : null}
      </ArilTouchAble>
    );
  }

  renderMiddle() {
    const { title } = this.props;
    return (
      <View style={styles.titleContainer}>
        {title ? <AppText text={title} style={styles.title} /> : null}
      </View>
    );
  }

  render() {
    return (
      <View style={styles.headerContainer}>
        {/* <View
          style={{ position: 'absolute', bottom: -40, left: 20, alignItems: 'center', zIndex: 4 }}
        >
          <Icon name="md-bookmark" type="ionicon" color="red" size={55} />
          <AppText text="8" style={{ position: 'absolute', top: '30%', color: 'white' }} />
        </View> */}
        {this.renderLeftChild()}
        {this.renderMiddle()}
        {this.renderRightChild()}
      </View>
    );
  }
}

const styles = {
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 60,
    paddingTop: 10,
    width: '100%',
    backgroundColor: Colors.MAIN_COLOR
  },
  leftTitle: {
    textAlign: 'center',
    fontSize: Consts.FONT_SIZE.SUBHEADING,
    color: Colors.BACKGROUND
  },
  titleContainer: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    textAlign: 'center',
    fontSize: Consts.FONT_SIZE.SUBHEADING,
    color: Colors.BACKGROUND,
    fontWeight: 'bold'
  },
  leftChildContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    flexDirection: 'row'
  },
  rightChildContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    flexDirection: 'row'
  },
  iconHeader: {
    justifyContent: 'center',
    alignItems: 'center'
  }
};
