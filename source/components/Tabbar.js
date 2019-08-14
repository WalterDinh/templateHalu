import React from 'react';
import { View, Image, Dimensions } from 'react-native';
import { AppText, Button, ArilTouchAble } from 'components/index';
import { I18n, Colors, Consts, Styles } from 'utilities/index';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { chatActions } from 'actions/index';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

class Tabbar extends React.Component {
  renderRegularTab = (route, navigation, icon, isActive, tabName) => {
    const { dispatch } = this.props;
    return (
      <ArilTouchAble
        style={[styles.regularTab, Styles.ViewStyle.tabShadowStyle]}
        onPress={() => {
          if (tabName !== I18n.t('tabBar.class')){
            console.log('tagbar')
            dispatch(chatActions.openChat('none', true));
          } else {
            dispatch(chatActions.openChat('none', false));
          }
          navigation.navigate(route.routeName);
        }}
      >
        <Icon color={isActive ? Colors.MAIN_COLOR : 'gray'} type="ionicon" name={icon} />
        <AppText
          size={20}
          style={[styles.tabTitle, { color: isActive ? Colors.MAIN_COLOR : 'gray' }]}
          text={tabName}
        />
        {isActive ? <View style={styles.underLine} /> : null}
      </ArilTouchAble>
    );
  };

  render() {
    const { navigation } = this.props;
    const { routes, index } = navigation.state;

    const icons = ['md-home', 'ios-contact', 'md-paper', 'ios-notifications-outline'];

    const tabNames = [
      I18n.t('tabBar.home'),
      I18n.t('tabBar.profile'),
      I18n.t('tabBar.class'),
      I18n.t('tabBar.notification')
    ];

    return (
      <View style={[styles.containerStyle]}>
        {routes.map((route, idx) => {
          const isActive = index === idx;
          return this.renderRegularTab(route, navigation, icons[idx], isActive, tabNames[idx]);
        })}
      </View>
    );
  }
}
const styles = {
  containerStyle: {
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  regularTab: {
    flex: 1,
    height: 60,
    marginBottom: -10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  tabTitle: {
    color: 'black',
    fontWeight: '500'
  },
  underLine: {
    backgroundColor: Colors.MAIN_COLOR,
    height: 4,
    width: '100%',
    position: 'absolute',
    bottom: 5,
    left: 0,
    right: 0
  }
};

function mapStateToProps(state) {
  return {
  };
}
// eslint-disable-next-line no-class-assign
Tabbar = connect(mapStateToProps)(Tabbar);
export default Tabbar;
