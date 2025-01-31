import React from 'react';
import MyOrder from '../Screen/Main/MyOrder';
import CourceListDownload from '../Screen/Main/CourceListDownload';
import CoureList from '../Screen/Main/CoureList';
import Appointment from '../Screen/Main/Appoinment';
import OrderDetail from '../Screen/Main/OrderDetail';
import CourceDetail from '../Screen/Main/OrderDetail/CourceDetail';
import AppointmentDetails from '../Screen/Main/AppoinmentDetail';
import userprofile from '../Screen/Main/userProfile';
import EditProfile from '../Screen/Main/EditProfile';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUpFranchise from '../Screen/Main/SignupFranchiseForm';

export default function ProfileStack({navigation}) {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="UserProfile"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="UserProfile" component={userprofile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="signupFranchise" component={SignUpFranchise} />
      <Stack.Screen name="MyOrder" component={MyOrder} />
      <Stack.Screen name="CoureList" component={CoureList} />
      <Stack.Screen name="CourceListDownload" component={CourceListDownload} />
      <Stack.Screen name="Appointment" component={Appointment} />
      <Stack.Screen name="OrderDetail" component={OrderDetail} />
      <Stack.Screen name="CourceDetail" component={CourceDetail} />
      <Stack.Screen name="AppoinmentDetail" component={AppointmentDetails} />
    </Stack.Navigator>
  );
}
