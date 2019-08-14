/* eslint-disable no-underscore-dangle */
/* eslint-disable no-class-assign */
import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  NetInfo,
  Platform,
  AppState,
  AsyncStorage,
  Alert
} from 'react-native';

import LocalNotification from 'react-native-local-notification';
import Navigator from './navigation';

const _ = require('lodash');

class MainApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.refs = {};
  }


  render() {
    const { loadingReducer } = this.props;

    return (
      <View style={{ width: '100%', height: '100%' }}>
        <Navigator />

        <LocalNotification ref="localNotification" />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
   
  };
}

MainApp = connect(mapStateToProps)(MainApp);
export default MainApp;


