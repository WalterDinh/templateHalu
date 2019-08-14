import React from 'react';
import { View, Animated, Easing, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Consts, Colors, Images } from 'utilities';
import { toastActions, notificationActions } from 'actions';
import { Storage } from 'lib/index';
import { Icon } from 'react-native-elements';
import AppText from './AppText';
import AppImage from './AppImage';

const _ = require('lodash');

class ToastNotification extends React.Component {
  positionValue = new Animated.Value(-80);

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.toastReducer.showNotification) {
      Animated.timing(this.positionValue, {
        toValue: 0,
        duration: 500,
        easing: Easing.linear
      }).start();

      setTimeout(() => {
        this.props.dispatch(toastActions.hideToast());
      }, 4000);
      return;
    }
    if (!nextProps.toastReducer.showNotification) {
      Animated.timing(this.positionValue, {
        toValue: -80,
        duration: 500,
        easing: Easing.linear
      }).start();
    }
  }

  async notificationHandle(notification) {
    const { chatReducer, userReducer, notificationReducer, dispatch } = this.props;
    const userMode = await Storage.get(Consts.STORAGE.USER_MODE);
    if (notification.type) {
      if (notification.type === 'Chat') {
        if (!_.isEmpty(userReducer.data)) {
          if (userMode == Consts.USER_MODE.TEACH) {
            dispatch(notificationActions.openChatTeacher(notification));
            return;
          }
          if (userMode == Consts.USER_MODE.LEARN) {
            dispatch(notificationActions.openChatLearner(notification));
            return;
          }
        }
        return;
      }
      // if (notification.type === 'enrol_learner') {
      //   if (!_.isEmpty(userReducer.data)) {
      //     dispatch(notificationActions.requestOpenClassRegister(notification));
      //     return;
      //   }
      //   return;
      // }
      if (
        notification.type === 'enrol' ||
        notification.type === 'question' ||
        notification.type === 'answer' ||
        notification.type === 'enrol_learner' ||
        notification.type === 'class'
      ) {
        if (!_.isEmpty(userReducer.data)) {
          dispatch(notificationActions.openNotificationEnrollment(notification));
        }
      }
    }
  }

  render() {
    const { toastReducer } = this.props;
    const { title, body, notification } = toastReducer;
    console.log('notification', notification);
    return (
      <Animated.View style={[styles.containerStyle, { top: this.positionValue }]}>
        {!_.isEmpty(notification) ? (
          <TouchableOpacity
            onPress={() => this.notificationHandle(notification)}
            style={{
              paddingTop: 6,
              width: '70%',
              flexDirection: 'row'
            }}
          >
            <View style={styles.image}>
              {notification.type === 'Chat' ? (
                <Icon name="md-chatbubbles" size={30} type="ionicon" color={Colors.MAIN_COLOR} />
              ) : null}
              {notification.type === 'question' ? (
                <Icon name="md-help" size={27} type="ionicon" color={Colors.MAIN_COLOR} />
              ) : null}
              {notification.type === 'answer' ? (
                <Icon name="md-text" size={30} type="ionicon" color={Colors.MAIN_COLOR} />
              ) : null}
              {notification.type === 'enrol_learner' ? (
                <Icon name="md-contacts" size={30} type="ionicon" color={Colors.MAIN_COLOR} />
              ) : null}
              {notification.type === 'enrol' ? (
                <Icon name="md-person-add" size={27} type="ionicon" color={Colors.MAIN_COLOR} />
              ) : null}
              {notification.type === 'class' ? (
                <Icon name="md-person" size={27} type="ionicon" color={Colors.MAIN_COLOR} />
              ) : null}
            </View>
            <View>
              {!_.isEmpty(title) ? <AppText text={title} style={styles.title} /> : null}
              <AppText text={body} style={styles.body} numberOfLines={2} />
            </View>
          </TouchableOpacity>
        ) : null}
      </Animated.View>
    );
  }
}

const styles = {
  containerStyle: {
    padding: 8,
    height: 70,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    // borderRadius: 8,
    // marginHorizontal: 4,
    borderColor: '#fff',
    borderWith: 1,
    backgroundColor: Colors.MAIN_COLOR,
    // opacity: 0.7,
    position: 'absolute',
    bottom: 0,
    zIndex: 2,
    left: 0,
    right: 0
  },
  image: {
    backgroundColor: 'white',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8
  },
  title: {
    zIndex: 5,
    fontSize: Consts.FONT_SIZE.SUBHEADING,
    color: '#000',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 4
  },
  body: {
    zIndex: 5,
    fontSize: Consts.FONT_SIZE.BODY,
    color: '#000'
  }
};

function mapStateToProps(state) {
  return {
    toastReducer: state.toastReducer,
    userReducer: state.userReducer
  };
}
ToastNotification = connect(mapStateToProps)(ToastNotification);
export default ToastNotification;