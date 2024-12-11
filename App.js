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
       
     
          <RootApp />
       
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
