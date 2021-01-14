/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Platform } from 'react-native';
import {Provider} from './redux/reduxStore';
import ReduxAppWrapper from './redux/src/reduxAppWrapper';
import firebase from '@react-native-firebase/app';
import messaging from "@react-native-firebase/messaging";

let firebaseInit = false;
let backgroundInit = false;

// @ts-ignore
const App = () => {

  if (!firebaseInit && !firebase.apps.length) {
    firebaseInit = true;
    console.log("firebase init");
    firebase.initializeApp({
      clientId: '',
      appId: '1:510881295141:' + Platform.OS + ':db21e2bf6452f4e41448cc',
      databaseURL: '',
      storageBucket: '',
      messagingSenderId: '510881295141',
      projectId: 'anton-e18e5',
      apiKey: 'AAAAdvLl6yU:APA91bFXojhB0gkKCHBLyr9uCdhSLoIFzG4pkzdLTXW9x6P_EnHCO8Y5rLNIXg0CgEZpIYHIObFut-EYamQUVS-AWjWJNX82UznnlKVQ5uLAXaAkV4py8Qu02msilFBRm8xJY7KJ_4_H',
    });
  }

  if (firebase.apps.length === 0 || firebase.apps[0].name !== "[DEFAULT]")
    return null;

  if (firebaseInit && backgroundInit) {
    backgroundInit = true;
    console.log("background handler init");
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });
  }

  return (
    <Provider>
      <ReduxAppWrapper/>
    </Provider>
  );
};

export default App;
