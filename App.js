import React, { Fragment, useEffect } from 'react';
import {
  LogBox,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import RootApp from './src/navigation/index'
import { colors } from './src/Component/colors';
import { Provider } from 'react-redux';
import store from './src/Redux/store/store';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";
import { useNetInfo } from "@react-native-community/netinfo";

import analytics from '@react-native-firebase/analytics';
import AsyncStorage from '@react-native-async-storage/async-storage';


LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

PushNotification.createChannel(
  {
    channelId: "default-channel-id",
    channelName: "My channel",
    vibrate: true,
  },
  (created) => console.log(`createChannel returned '${created}'`)
);
const App = () => {

  const { type, isConnected } = useNetInfo();

  useEffect(() => {
    // Firebase से इवेंट लॉग करें
    analytics()
      .logEvent('test_event', { test_param: 'test_value' })
      .then(() => {
        console.log('Firebase connected and event logged!');
      })
      .catch(error => {
        console.error('Firebase connection failed: ', error);
      });
  }, []);

  PushNotification.configure({
    onRegister: function (token) {
      console.log("TOKENNNNNNNNNNNNNNNNNNN:", token);
      AsyncStorage.setItem('fcm_token', token.token)
    },
    onNotification: function (notification) {
      PushNotification.localNotification({
        title: notification.message,
        message: notification.title,
      });
      console.log('this is notifi',notification);
      if(notification.userInteraction===true && notification.foreground==false && notification.title=='New Message on ZBWA Group') {
        // RootNavigation.push('Splash')
        manageLogin()
      }
      else{
        if (notification.userInteraction==true && notification.foreground==true && notification.title=='New Message on ZBWA Group') {
          manageLogin()
        }
      }
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },
    onAction: function (notification) {
      console.log("ACTION:", notification.action);
      console.log("NOTIFICATION:", notification);
    },
    onRegistrationError: function (err) {
      console.error(err.message, err);
    },
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    popInitialNotification: true,
    requestPermissions: true,
  });

  return (


    <Fragment>
    <View style={{ flex: 1 }}>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: Platform.OS == 'ios' ? '#FC0600' : '#fff',
        }}>
       
       <Provider store={store}>
            <RootApp />
          </Provider>
       
        <StatusBar
          backgroundColor={colors.orange}
          barStyle={"light-content"}
        />
      </SafeAreaView>
    </View>
  </Fragment>
   
  );
};

export default App;
