// import React, { Fragment, useEffect } from 'react';
// import {
//   LogBox,
//   PermissionsAndroid,
//   Platform,
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
// } from 'react-native';
// import RootApp from './src/navigation/index'
// import { colors } from './src/Component/colors';
// import { Provider } from 'react-redux';
// import store from './src/Redux/store/store';
// import PushNotificationIOS from "@react-native-community/push-notification-ios";
// import PushNotification from "react-native-push-notification";
// import crashlytics from '@react-native-firebase/crashlytics';
// import AsyncStorage from '@react-native-async-storage/async-storage';


// LogBox.ignoreLogs(['Warning: ...']);
// LogBox.ignoreAllLogs();

// PushNotification.createChannel(
//   {
//     channelId: "default-channel-id",
//     channelName: "My channel",
//     vibrate: true,
//   },
//   (created) => console.log(`createChannel returned '${created}'`)
// );
// const App = () => {
 
//     const requestNotificationPermission = async () => {
//       if (Platform.OS === 'android' && Platform.Version >= 33) {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
//           {
//             title: 'Notification Permission',
//             message: 'This app needs access to notifications to alert you.',
//             buttonPositive: 'OK',
//           },
//         );
//         if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
//           console.log('Notification permission denied');
//         }
//       }
//     };
  
   
 
//   useEffect(() => {
//     requestNotificationPermission();
//     crashlytics().log('Analytics page just mounted');
//     getCrashlyticsDetail();
//     return () => {
//       crashlytics().log('Analytics page just unmounted');
//     };
//   }, []);

//   const getCrashlyticsDetail = async () => {
//     const userStatus = await AsyncStorage.getItem('user_data');
//     const userData = userStatus ? JSON.parse(userStatus) : null;
   

//     try {
//       crashlytics().setUserId(userData?.user_id);
//       crashlytics().setAttribute('username', userData?.user_id);
//     } catch (err) {
//       crashlytics().recordError(err);
//     }
//   };


//   PushNotification.configure({
//     onRegister: function (token) {
//       console.log("TOKENNNNNNNNNNNNNNNNNNN:", token);
//       AsyncStorage.setItem('fcm_token', token.token)
//     },
//     onNotification: function (notification) {
//       PushNotification.localNotification({
//         title: notification.message,
//         message: notification.title,
//         smallIcon: "android/app/src/main/res/drawable/ic_launcher.png", // The name of the small icon (for Android)
//         largeIcon: "android/app/src/main/res/drawable/ic_launcher_foreground.png", 
//       });
//       console.log('this is notifi',notification);
//       notification.finish(PushNotificationIOS.FetchResult.NoData);
//     },
//     onAction: function (notification) {
//       console.log("ACTION:", notification.action);
//       console.log("NOTIFICATION:", notification);
//     },
//     onRegistrationError: function (err) {
//       console.error(err.message, err);
//     },
//     permissions: {
//       alert: true,
//       badge: true,
//       sound: true,
//     },
//     popInitialNotification: true,
//     requestPermissions: true,
//   });

//   return (


//     <Fragment>
//     <View style={{ flex: 1 }}>
//       <SafeAreaView
//         style={{
//           flex: 1,
//           backgroundColor: Platform.OS == 'ios' ? '#FC0600' : '#fff',
//         }}>
       
//        <Provider store={store}>
//             <RootApp />
//           </Provider>
       
//         <StatusBar
//           backgroundColor={colors.orange}
//           barStyle={"light-content"}
//         />
//       </SafeAreaView>
//     </View>
//   </Fragment>
   
//   );
// };

// export default App;


import React, { Fragment, useEffect, useState, createContext } from 'react';
import {
  LogBox,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  StatusBar,
  View,
  Text,
} from 'react-native';
import RootApp from './src/navigation/index';
import { colors } from './src/Component/colors';
import { Provider } from 'react-redux';
import store from './src/Redux/store/store';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";
import crashlytics from '@react-native-firebase/crashlytics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

export const InternetContext = createContext();

LogBox.ignoreAllLogs();

PushNotification.createChannel(
  {
    channelId: "default-channel-id",
    channelName: "My channel",
    vibrate: true,
  },
  (created) => console.log(`createChannel returned '${created}'`),
);

const App = () => {
  const [isConnected, setIsConnected] = useState(true);

 
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  const requestNotificationPermission = async () => {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        {
          title: 'Notification Permission',
          message: 'This app needs access to notifications to alert you.',
          buttonPositive: 'OK',
        },
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Notification permission denied');
      }
    }
  };

  useEffect(() => {
    requestNotificationPermission();
    crashlytics().log('Analytics page just mounted');
    getCrashlyticsDetail();
    return () => {
      crashlytics().log('Analytics page just unmounted');
    };
  }, []);

  const getCrashlyticsDetail = async () => {
    const userStatus = await AsyncStorage.getItem('user_data');
    const userData = userStatus ? JSON.parse(userStatus) : null;

    try {
      crashlytics().setUserId(userData?.user_id);
      crashlytics().setAttribute('username', userData?.user_id);
    } catch (err) {
      crashlytics().recordError(err);
    }
  };

  PushNotification.configure({
    onRegister: function (token) {
      console.log("TOKEN:", token);
      AsyncStorage.setItem('fcm_token', token.token);
    },
    onNotification: function (notification) {
      PushNotification.localNotification({
        title: notification.message,
        message: notification.title,
        smallIcon: "android/app/src/main/res/drawable/ic_launcher.png",
        largeIcon: "android/app/src/main/res/drawable/ic_launcher_foreground.png",
      });
      console.log('Notification:', notification);
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
            backgroundColor: Platform.OS === 'ios' ? '#FC0600' : '#fff',
          }}>
          
      
          <InternetContext.Provider value={{ isConnected }}>
            
           
            {!isConnected && (
              <View style={{
                backgroundColor: colors.orange,
                padding: 10,
                alignItems: 'center'
              }}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>
              
                 No Internet Connection. Please check your network.
                </Text>
              </View>
            )}

         
            <Provider store={store}>
              <RootApp />
            </Provider>
          </InternetContext.Provider>

          <StatusBar backgroundColor={colors.orange} barStyle={"light-content"} />
        </SafeAreaView>
      </View>
    </Fragment>
  );
};

export default App;

