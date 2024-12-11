import React from "react";



import MyOrder from "../Screen/Main/MyOrder";

import CourceListDownload from "../Screen/Main/CourceListDownload";
import CoureList from "../Screen/Main/CoureList";
import Appointment from "../Screen/Main/Appoinment";
import OrderDetail from "../Screen/Main/OrderDetail";
import AppointmentDetails from "../Screen/Main/AppoinmentDetail";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
export default function ProfileStack({ navigation }) {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator
            initialRouteName="MyOrder"
            screenOptions={{
                headerShown: false,
            }}
        >
          
            <Stack.Screen name='MyOrder' component={MyOrder}/>
       <Stack.Screen name='CoureList' component={CoureList}/>
       <Stack.Screen name='CourceListDownload' component ={CourceListDownload}/>  
       <Stack.Screen name='Appointment' component ={Appointment}/>  
       <Stack.Screen name='OrderDetail' component ={OrderDetail}/>  
       <Stack.Screen name='AppoinmentDetail' component ={AppointmentDetails}/>  
        </Stack.Navigator>
    );
}
