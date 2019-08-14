import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native';
import firebase from 'react-native-firebase';
import { PersistGate } from 'redux-persist/es/integration/react';
import { Consts } from 'utilities/index';
import { Storage } from 'lib';
import configureStore from '../store/configureStore';
import Navigator from './navigation';
import Main from './Main';

const { persistor, store } = configureStore();

console.disableYellowBox = true;

export default class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Main />
        </PersistGate>
      </Provider>
    );
  }
}
