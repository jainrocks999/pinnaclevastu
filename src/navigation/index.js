// import React, { useEffect, useState } from 'react';
// import { Image, View, Text } from 'react-native';
// import { NavigationContainer, StackActions } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Splash from "../Screen/Auth/SplashScreen";
// import Login from "../Screen/Auth/LoginScreen";
// import OTP from '../Screen/Auth/OtpVerification';
// import SignUpPage from '../Screen/Auth/SignUpPage';
// import HomeScreen from '../Screen/Main/HomeScreen';
// import Drawer from '../Component/DrawerContaint';
// import {createDrawerNavigator} from '@react-navigation/drawer';
// // import Residental from '../Screen/Main/ResidentalVastu';
// import Profile from '../Screen/Main/ProfileScreen';
// import Appoinment from '../Screen/Main/MakeAppoinment';
// import Payment from '../Screen/Main/paymentInformation';
// import ThankyouPage from '../Screen/Main/Thankyou';
// import Remedies from '../Screen/Main/Remedies';
// import RemediesProduct from '../Screen/Main/RemediesProducutlist'
// import RemediesProductdetail from '../Screen/Main/RemediesProducutdetail'
// import Mycart from '../Screen/Main/MyCart'
// import MyCart1 from '../Screen/Main/MyCart1'
// import { colors } from '../Component/colors';
// import Address from '../Screen/Main/AddAdress';
// import AddressList from '../Screen/Main/AddressList';
// import Courses from '../Screen/Main/Courses';
// import CourseDetail from '../Screen/Main/CourceDetails';
// import PaymentApp from '../Screen/Main/PaymentSucces';
// import userprofile from '../Screen/Main/userProfile';
// import EditProfile from '../Screen/Main/EditProfile';
// import MyOrder from '../Screen/Main/MyOrder';
// import CoureList from '../Screen/Main/CoureList';
// import CourceListDownload from '../Screen/Main/CourceListDownload';
// import Appointment from '../Screen/Main/Appoinment';
// import OrderDetail from '../Screen/Main/OrderDetail';
// import AppoinmentDetail from '../Screen/Main/AppoinmentDetail';
// import BottomTab from './ButtomTab';
// const Stack = createNativeStackNavigator();
// function Navigate() {
//   const [screen, setScreen] = useState("");
//   useEffect(() => {
//     console.log("Current screen:", screen);
//     if (screen == "") {
//     }
//   }, [screen]);
//   return (
//     <NavigationContainer 
    
//     onStateChange={(state) => {
//       const name = state?.routes[state.index].name;
//       setScreen(name);
//     }}
//     >
//       {/* <View style={{flex:1}}> */}
//       <Stack.Navigator
//         initialRouteName="Splash"
//         screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="Splash" component={Splash} />
//         <Stack.Screen name="Login" component={Login} />
//         <Stack.Screen name="OTP" component={OTP} />
//         <Stack.Screen name="Signup" component={SignUpPage} />
//         <Stack.Screen name="Home" component={MyDrawer} />
//         {/* <Stack.Screen name="Home1" component={HomeScreen} /> */}
//         {/* <Stack.Screen name="Residental" component={Residental}/> */}
//         <Stack.Screen name="profile" component={Profile}/>
//         <Stack.Screen name="Appoiment" component={Appoinment}/>
//         <Stack.Screen name="Payment" component={Payment}/>
//         <Stack.Screen name="Thankyou" component={ThankyouPage}/>
//         <Stack.Screen name="Succes" component={PaymentApp}/>
        
//         {/* <Stack.Screen name="Remedies" component={Remedies}/> */}
//         {/* <Stack.Screen name="ProductList" component={RemediesProduct}/> */}
//         <Stack.Screen name="ProductDetail" component={RemediesProductdetail}/>
//         <Stack.Screen name="Address" component={Address}/>
//         <Stack.Screen name="AddressList" component={AddressList}/>
      
      
      
      
      
      
//         {/* <Stack.Screen name="Courses" component={Courses}/> */}
//         <Stack.Screen name="CourseDetail" component={CourseDetail}/>


      
//        {/* <Stack.Screen name='MyOrder' component={MyOrder}/>
//        <Stack.Screen name='CoureList' component={CoureList}/>
//        <Stack.Screen name='CourceListDownload' component ={CourceListDownload}/>  
//        <Stack.Screen name='Appointment' component ={Appointment}/>  
//        <Stack.Screen name='OrderDetail' component ={OrderDetail}/>  
//        <Stack.Screen name='AppoinmentDetail' component ={AppoinmentDetail}/>   */}

//       </Stack.Navigator>

//     </NavigationContainer>
//   );
// }
// const DrawerStack = createDrawerNavigator();
// function MyDrawer() {
//   return (
//     <DrawerStack.Navigator initialRouteName="Home1"
//     screenOptions={{
//       headerShown: false,
//       swipeEnabled: false,
//       drawerStyle: {
//         backgroundColor: colors.white, 
        
//         width: '80%'}}}
//       drawerContent={(props) => <Drawer {...props} />}>
//       <DrawerStack.Screen name="Home1" component={BottomTab} />
//       <DrawerStack.Screen name="MyCart" component={Mycart}/>
//       <DrawerStack.Screen name="MyCart1" component={MyCart1}/>
//       <DrawerStack.Screen name="Courses" component={Courses}/>
//       {/* <DrawerStack.Screen name='UserProfile' component={userprofile}/>
//       <DrawerStack.Screen name='EditProfile' component={EditProfile}/> */}
//     </DrawerStack.Navigator>
//   );
// }

// export default Navigate;



import React, {useEffect, useState} from 'react';
import {Image, View, Text} from 'react-native';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Splash from '../Screen/Auth/SplashScreen';
import Login from '../Screen/Auth/LoginScreen';
import OTP from '../Screen/Auth/OtpVerification';
import SignUpPage from '../Screen/Auth/SignUpPage';
import HomeScreen from '../Screen/Main/HomeScreen';
import Drawer from '../Component/DrawerContaint';
import {createDrawerNavigator} from '@react-navigation/drawer';
// import Residental from '../Screen/Main/ResidentalVastu';
import Profile from '../Screen/Main/ProfileScreen';
import Appoinment from '../Screen/Main/MakeAppoinment';
import Payment from '../Screen/Main/paymentInformation';
import ThankyouPage from '../Screen/Main/Thankyou';
import Remedies from '../Screen/Main/Remedies';
import RemediesProduct from '../Screen/Main/RemediesProducutlist';
import RemediesProductdetail from '../Screen/Main/RemediesProducutdetail';
import Mycart from '../Screen/Main/MyCart';
import MyCart1 from '../Screen/Main/MyCart1';
import {colors} from '../Component/colors';
import Address from '../Screen/Main/AddAdress';
import AddressList from '../Screen/Main/AddressList';
import Courses from '../Screen/Main/Courses';
import CourseDetail from '../Screen/Main/CourceDetails';
import PaymentApp from '../Screen/Main/PaymentSucces';
import userprofile from '../Screen/Main/userProfile';
import EditProfile from '../Screen/Main/EditProfile';
import MyOrder from '../Screen/Main/MyOrder';
import CoureList from '../Screen/Main/CoureList';
import CourceListDownload from '../Screen/Main/CourceListDownload';
import Appointment from '../Screen/Main/Appoinment';
import OrderDetail from '../Screen/Main/OrderDetail';
import AppoinmentDetail from '../Screen/Main/AppoinmentDetail';
import BottomTab from './ButtomTab';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {getCartDataApi} from '../Redux/Slice/CartSlice';
import {loadCartData} from '../Redux/Slice/CartSlice';
import PaymentCourse from '../Screen/Main/paymentInformation/payment_Course';
import PaymentAppointment from '../Screen/Main/paymentInformation/payment_Appointment';
import CartWeb from '../Screen/Main/paymentInformation/CartWeb';
const Stack = createNativeStackNavigator();

function Navigate() {
  const cartDataList = useSelector(state => state?.cart?.CartData);
  const [screen, setScreen] = useState('');
  const [userData, setUserData] = useState();
  const [localCartData, setLocalCartData] = useState([]);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log('Current screen:', screen);
  //   if (screen == '') {
  //   }
  // }, [screen]);

  useEffect(() => {
    const getuserData = async () => {
      try {
        const userStatus = await AsyncStorage.getItem('user_data');
        const userData = userStatus ? JSON.parse(userStatus) : null;
        setUserData({user_id: userData?.user_id, token: userData?.token});

        const cartData = await AsyncStorage.getItem('cartItems');
        const parsedCartData = cartData ? JSON.parse(cartData) : null;

    

        if (parsedCartData !== null) {
      
          setLocalCartData(parsedCartData);
        }
      } catch (error) {
        console.error('Error fetching user data or cart items:', error);
      }
    };
    const init = async () => {
      await getuserData();
    };
    init();
  }, []);

  useEffect(() => {
    getCartData();
  }, [userData]);

  const getCartData = async () => {


    // if (userData?.user_id && userData?.token) {
      
    //   await dispatch(
    //     getCartDataApi({
    //       token: userData?.token,
    //       url: `cart?user_id=${userData?.user_id}`,
    //     }),
    //   );
    // } else {
    // }
    await dispatch(loadCartData());
  };

  return (
    <NavigationContainer
      onStateChange={state => {
        const name = state?.routes[state.index].name;
        setScreen(name);
      }}>
      {/* <View style={{flex:1}}> */}
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="OTP" component={OTP} />
        <Stack.Screen name="Signup" component={SignUpPage} />
        <Stack.Screen name="Home" component={MyDrawer} />
        {/* <Stack.Screen name="Home1" component={HomeScreen} /> */}
        {/* <Stack.Screen name="Residental" component={Residental}/> */}
        <Stack.Screen name="profile" component={Profile} />
        <Stack.Screen name="Appoiment" component={Appoinment} />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen name="PaymentCourse" component={PaymentCourse} />
        <Stack.Screen name="PaymentAppointment" component={PaymentAppointment} />
        <Stack.Screen name="Thankyou" component={ThankyouPage} />
        <Stack.Screen name="Succes" component={PaymentApp} />
        <Stack.Screen name="CartWeb" component={CartWeb} />
        {/* <Stack.Screen name="Remedies" component={Remedies}/> */}
        {/* <Stack.Screen name="ProductList" component={RemediesProduct}/> */}
        <Stack.Screen name="ProductDetail" component={RemediesProductdetail} />
        <Stack.Screen name="Address" component={Address} />
        <Stack.Screen name="AddressList" component={AddressList} />

        {/* <Stack.Screen name="Courses" component={Courses}/> */}
        <Stack.Screen name="CourseDetail" component={CourseDetail} />

        {/* <Stack.Screen name='MyOrder' component={MyOrder}/>
       <Stack.Screen name='CoureList' component={CoureList}/>
       <Stack.Screen name='CourceListDownload' component ={CourceListDownload}/>  
       <Stack.Screen name='Appointment' component ={Appointment}/>  
       <Stack.Screen name='OrderDetail' component ={OrderDetail}/>  
       <Stack.Screen name='AppoinmentDetail' component ={AppoinmentDetail}/>   */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const DrawerStack = createDrawerNavigator();
function MyDrawer() {
  return (
    <DrawerStack.Navigator
      initialRouteName="Home1"
      screenOptions={{
        headerShown: false,
        swipeEnabled: false,
        drawerStyle: {
          backgroundColor: colors.white,

          width: '80%',
        },
      }}
      drawerContent={props => <Drawer {...props} />}>
      <DrawerStack.Screen name="Home1" component={BottomTab} />
      <DrawerStack.Screen name="MyCart" component={Mycart} />
      <DrawerStack.Screen name="MyCart1" component={MyCart1} />
      <DrawerStack.Screen name="Courses" component={Courses} />
      {/* <DrawerStack.Screen name='UserProfile' component={userprofile}/>
      <DrawerStack.Screen name='EditProfile' component={EditProfile}/> */}
    </DrawerStack.Navigator>
  );
}

export default Navigate;
