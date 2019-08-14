import React from 'react';
import { View, Animated, Easing } from 'react-native';
import { connect } from 'react-redux';
import { Consts, Colors } from 'utilities';
import { toastActions } from 'actions';
import AppText from './AppText';

class Toast extends React.Component {
  positionValue = new Animated.Value(-60);

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.toastReducer.show) {
      Animated.timing(this.positionValue, {
        toValue: 0,
        duration: 500,
        easing: Easing.linear
      }).start();

      setTimeout(() => {
        this.props.dispatch(toastActions.hideToast());
      }, 5000);
      return;
    }
    if (!nextProps.toastReducer.show) {
      Animated.timing(this.positionValue, {
        toValue: -60,
        duration: 500,
        easing: Easing.linear
      }).start();
    }
  }

  render() {
    const { title, body, type } = this.props.toastReducer;
    let typeToastStyle = {};
    if (type == Consts.TOAST_TYPE.SUCCESS) {
      typeToastStyle = {
        backgroundColor: Colors.SUCCESS_COLOR
      };
    }
    if (type == Consts.TOAST_TYPE.ERROR) {
      typeToastStyle = {
        backgroundColor: Colors.ERROR_COLOR
      };
    }
    if (type == Consts.TOAST_TYPE.WARNING) {
      typeToastStyle = {
        backgroundColor: Colors.WARNING_COLOR
      };
    }
    return (
      <Animated.View
        style={[styles.containerStyle, typeToastStyle, { bottom: this.positionValue }]}
      >
        <AppText text={title} style={styles.title} />
        <AppText text={body} style={styles.body} />
      </Animated.View>
    );
  }
}

const styles = {
  containerStyle: {
    padding: 8,
    height: 60,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'red',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },
  title: {
    fontSize: Consts.FONT_SIZE.SUBHEADING,
    color: 'white',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 4
  },
  body: {
    fontSize: Consts.FONT_SIZE.BODY,
    color: 'white'
  }
};

function mapStateToProps(state) {
  return {
    toastReducer: state.toastReducer
  };
}
Toast = connect(mapStateToProps)(Toast);
export default Toast;
