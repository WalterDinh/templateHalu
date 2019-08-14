import React from 'react';
import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';

const LoginStack = createStackNavigator(
  {},
  {
    initialRouteName: 'Login',
    headerMode: 'none'
  }
);

const Switch = createSwitchNavigator(
  {
    LoginStack
  },
  {
    initialRouteName: 'LoginStack'
  }
);

export default createAppContainer(Switch);
