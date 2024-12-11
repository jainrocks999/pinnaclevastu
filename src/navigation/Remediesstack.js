import React from 'react';

import Remedies from '../Screen/Main/Remedies';
import RemediesProduct from '../Screen/Main/RemediesProducutlist'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function AuthStack() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="Remedies"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Remedies" component={Remedies}/>
      <Stack.Screen name="ProductList" component={RemediesProduct}/>
    </Stack.Navigator>
  );
}
