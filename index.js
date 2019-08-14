/** @format */

import { AppRegistry } from 'react-native';
import firebase from 'firebase';
import App from './source/App';
import { name as appName, displayName } from './app.json';

global.__APP_NAME__ = displayName;

const config = {
  databaseURL: 'https://grow-app-e272b.firebaseio.com',
  projectId: 'grow-app-e272b'
};
firebase.initializeApp(config);
// firebase
//   .database()
//   .ref('Users/')
//   .set({
//     email:'HAi',
//     fname:'HELOO',
//     lname:'TEP'
//   })
//   .then(data => {
//     console.log('data', data);
//   })
//   .catch(error => {
//     console.log('error', error);
//   });

AppRegistry.registerComponent(appName, () => App);
