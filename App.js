import React, { Fragment } from 'react';
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
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();
const App = () => {
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
