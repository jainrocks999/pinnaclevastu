import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {moderateScale} from '../Component/Meterscale';
import Chat from '../assets/svg/chat.svg';
import Chat1 from '../assets/svg/chat1.svg';
import Laye from '../assets/svg/Laye.svg';
import Layer from '../assets/svg/Layer.svg';
import Group from '../assets/svg/Group.svg';
import Group1 from '../assets/svg/Group1.svg';
import Home from '../assets/svg/home.svg';
import Icon from '../assets/svg/Icon.svg';
import Icon1 from '../assets/svg/Icon1.svg';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../Component/ResponsiveScreen/responsive';

import {fontSize} from '../Component/fontsize';
import {colors} from '../Component/colors';
import HomeScreen from '../Screen/Main/HomeScreen';
import Remedie from './Remediesstack';
import CoureList from '../Screen/Main/Courses';
import MyProfile from './Profilestack';
import ResidentalScreen from '../Screen/Main/ResidentalVastu';
import {getFocusedRouteNameFromRoute, useNavigation, useNavigationState} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';  
const Tab = createBottomTabNavigator();

export default function BottomTab() {

  
  return (
    <SafeAreaView style={{flex: 1}}>

<Tab.Navigator
  initialRouteName="MainStack"
  screenOptions={({ route }) => ({
    animationEnabled: false,
    activeTintColor: 'green',
    inactiveTintColor: 'grey',
    headerShown: false,
    tabBarStyle: [
      {
        
         

        display: shouldHideTabBar(route) ? 'none' : 'flex',
        backgroundColor: colors.orange,
        height: 60,
        alignItems: 'center',
        justifyContent: 'space-around',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingHorizontal: moderateScale(1),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        position: 'absolute',
        bottom: 0,
        overflow: 'hidden',
      },
    ],
  })}
>



        <Tab.Screen
          name="MainStack"
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarLabel: 'Home',
            tabBarShowLabel: false,

            tabBarIcon: ({color, size, focused}) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                }}>
                
                  
                {focused ? (
                  <Home />
                ) : (
                  <Image
                    style={{height: 20, width: 20}}
                    source={require('../assets/otherApp/homeIcon.png')}
                  />
                )}
                <Text
                  style={{
                    color: colors.white,
                    fontSize: fontSize.Twelve,
                    fontFamily: 'Poppins-Regular',
                    width: '100%',
                  }}>
                  Home
                </Text>
              </View>
            ),
            tabBarButton: props => (
              <TouchableOpacity
                {...props}
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: wp(4),
                }}
                activeOpacity={0.2}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Consultancy"
          component={ResidentalScreen}
          options={{
            headerShown: false,
            tabBarLabel: 'Consultancy',
            tabBarShowLabel: false,
            tabBarIcon: ({color, size, focused}) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                }}>
                {focused ? <Chat1 /> : <Chat />}
                <Text
                  style={{
                    color: colors.white,
                    fontSize: fontSize.Twelve,
                    fontFamily: 'Poppins-Regular',
                    width: '100%',
                  }}>
                  Consultancy
                </Text>
              </View>
            ),
            tabBarButton: props => (
              <TouchableOpacity
                {...props}
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: wp(4),
                }}
                activeOpacity={0.2}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Remedie12"
          component={Remedie}
          options={{
            headerShown: false,
            tabBarLabel: 'Remedies',
            tabBarShowLabel: false,
            tabBarIcon: ({color, size, focused}) => {
              const navigation = useNavigation();

              return (
                <TouchableOpacity
                  activeOpacity={0.2}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                   
                  }}
               onPress={ ()=> navigation.navigate('Home1', {
                       screen: 'Remedie12',
                        params: {screen: 'Remedies'},
                    })}>
                  
                {focused ? <Group1 /> : <Group />}
                <Text
                  style={{
                    color: colors.white,
                    fontSize: fontSize.Twelve,
                    fontFamily: 'Poppins-Regular',
                    width: '100%',
                  }}>
                  Remedies
                </Text>
                </TouchableOpacity>
              );
            },
            tabBarButton: props => (
              <TouchableOpacity
                {...props}
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: wp(4),
                }}
                activeOpacity={0.2}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Cources"
          component={CoureList}
          options={{
            headerShown: false,
            tabBarLabel: 'Courses',
            tabBarShowLabel: false,
            tabBarIcon: ({color, size, focused}) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                }}>
                {focused ? <Icon1 /> : <Icon />}
                <Text
                  style={{
                    color: colors.white,
                    fontSize: fontSize.Twelve,
                    fontFamily: 'Poppins-Regular',
                    width: '100%',
                    textAlign: 'center',
                  }}>
                  Courses
                </Text>
              </View>
            ),
            tabBarButton: props => (
              <TouchableOpacity
                {...props}
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: wp(4),
                }}
                activeOpacity={0.2}
              />
            ),
          }}
        />

        <Tab.Screen
          name="MyProfile"
          component={MyProfile}
          options={{
            headerShown: false,
            tabBarLabel: 'Profile',
            tabBarShowLabel: false,
           
            tabBarIcon: ({color, size, focused,route}) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                }}>
                   
                 {focused ? <Layer /> : <Laye />}
                <Text
                  style={{
                    color: colors.white,
                    fontSize: fontSize.Twelve,
                    fontFamily: 'Poppins-Regular',
                    width: '100%',
                    textAlign: 'center',
                  }}>
                   Profile
                </Text>
              </View>
            ),
            tabBarButton: props => (
              <TouchableOpacity
                {...props}
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: wp(4),
                }}
                activeOpacity={0.2}
              />
            ),
          }}
         
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
}
function shouldHideTabBar(route) {
  const focusedRouteName = getFocusedRouteNameFromRoute(route);

  
  if (route.name === 'MyProfile') {
   
    if (!focusedRouteName) {
      return true;
    }

 
    if (focusedRouteName === 'UserProfile' || focusedRouteName === 'EditProfile') {
      return true;
    }
  }

  return false; 
}




const styles = StyleSheet.create({
  tabBarStyle: {
    flexDirection: 'row',
    backgroundColor: colors.orange,
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: moderateScale(1),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    position: 'absolute',
    bottom: 0,
    overflow: 'hidden',
  },
});


// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   SafeAreaView,
//   TouchableOpacity,
// } from 'react-native';
// import React, { useState } from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import * as Animatable from 'react-native-animatable';  // Import Animatable for animations

// import HomeScreen from '../Screen/Main/HomeScreen';
// import ResidentalScreen from '../Screen/Main/ResidentalVastu';
// import Remedie from './Remediesstack';
// import MyProfile from './Profilestack';
// import { colors } from '../Component/colors';
// import { fontSize } from '../Component/fontsize';
// import { moderateScale } from '../Component/Meterscale';
// import { widthPrecent as wp } from '../Component/ResponsiveScreen/responsive';

// import Home from '../assets/svg/home.svg';
// import Chat from '../assets/svg/chat.svg';
// import Group from '../assets/svg/Group.svg';
// import Layer from '../assets/svg/Layer.svg';
// import Chat1 from '../assets/svg/chat1.svg';
// import Group1 from '../assets/svg/Group1.svg';
// import Laye from '../assets/svg/Laye.svg';

// const Tab = createBottomTabNavigator();

// export default function BottomTab() {
//   const [circleVisible, setCircleVisible] = useState(null); // State to track active tab for circle animation

//   const handleTabPress = (tab) => {
//     setCircleVisible(tab); // Show circle animation on active tab
//     setTimeout(() => {
//       setCircleVisible(null); // Hide circle animation after 2 seconds
//     }, 2000);
//   };

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <Tab.Navigator
//         initialRouteName="MainStack"
//         screenOptions={({ route }) => ({
//           headerShown: false,
//           tabBarStyle: [
//             {
//               backgroundColor: colors.orange,
//               height: 60,
//               alignItems: 'center',
//               justifyContent: 'space-around',
//               borderTopLeftRadius: 10,
//               borderTopRightRadius: 10,
//               paddingHorizontal: moderateScale(1),
//               shadowColor: '#000',
//               shadowOffset: { width: 0, height: -2 },
//               shadowOpacity: 0.1,
//               shadowRadius: 10,
//               elevation: 5,
//               position: 'absolute',
//               bottom: 0,
//               overflow: 'hidden',
//             },
//           ],
//         })}
//       >
//         <Tab.Screen
//           name="MainStack"
//           component={HomeScreen}
//           options={{
//             headerShown: false,
//             tabBarLabel: 'Home',
//             tabBarShowLabel: false,
//             tabBarIcon: ({ color, size, focused }) => (
//               <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
//                 {focused ? <Home /> : <Image style={{ height: 20, width: 20 }} source={require('../assets/otherApp/homeIcon.png')} />}
//                 <Text style={{ color: colors.white, fontSize: fontSize.Twelve, fontFamily: 'Poppins-Regular', width: '100%' }}>
//                   Home
//                 </Text>
//                 {circleVisible === 'Home' && (
//                   <Animatable.View
//                     animation="fadeIn"
//                     duration={1000} // Fade-in animation
//                     style={styles.circleAnimation}
//                   />
//                 )}
//               </View>
//             ),
//             tabBarButton: (props) => (
//               <TouchableOpacity
//                 {...props}
//                 style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: wp(4) }}
//                 activeOpacity={0.2}
//                 onPress={() => handleTabPress('Home')}
//               />
//             ),
//           }}
//         />
//         <Tab.Screen
//           name="Consultancy"
//           component={ResidentalScreen}
//           options={{
//             headerShown: false,
//             tabBarLabel: 'Consultancy',
//             tabBarShowLabel: false,
//             tabBarIcon: ({ color, size, focused }) => (
//               <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
//                 {focused ? <Chat1 /> : <Chat />}
//                 <Text style={{ color: colors.white, fontSize: fontSize.Twelve, fontFamily: 'Poppins-Regular', width: '100%' }}>
//                   Consultancy
//                 </Text>
//                 {circleVisible === 'Consultancy' && (
//                   <Animatable.View
//                     animation="fadeIn"
//                     duration={1000} // Fade-in animation
//                     style={styles.circleAnimation}
//                   />
//                 )}
//               </View>
//             ),
//             tabBarButton: (props) => (
//               <TouchableOpacity
//                 {...props}
//                 style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: wp(4) }}
//                 activeOpacity={0.2}
//                 onPress={() => handleTabPress('Consultancy')}
//               />
//             ),
//           }}
//         />
//         <Tab.Screen
//           name="Remedie12"
//           component={Remedie}
//           options={{
//             headerShown: false,
//             tabBarLabel: 'Remedies',
//             tabBarShowLabel: false,
//             tabBarIcon: ({ color, size, focused }) => (
//               <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
//                 {focused ? <Group1 /> : <Group />}
//                 <Text style={{ color: colors.white, fontSize: fontSize.Twelve, fontFamily: 'Poppins-Regular', width: '100%' }}>
//                   Remedies
//                 </Text>
//                 {circleVisible === 'Remedie12' && (
//                   <Animatable.View
//                     animation="fadeIn"
//                     duration={1000} // Fade-in animation
//                     style={styles.circleAnimation}
//                   />
//                 )}
//               </View>
//             ),
//             tabBarButton: (props) => (
//               <TouchableOpacity
//                 {...props}
//                 style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: wp(4) }}
//                 activeOpacity={0.2}
//                 onPress={() => handleTabPress('Remedie12')}
//               />
//             ),
//           }}
//         />
//         <Tab.Screen
//           name="MyProfile"
//           component={MyProfile}
//           options={{
//             headerShown: false,
//             tabBarLabel: 'Profile',
//             tabBarShowLabel: false,
//             tabBarIcon: ({ color, size, focused }) => (
//               <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
//                 {focused ? <Layer /> : <Laye />}
//                 <Text style={{ color: colors.white, fontSize: fontSize.Twelve, fontFamily: 'Poppins-Regular', width: '100%' }}>
//                   Profile
//                 </Text>
//                 {circleVisible === 'MyProfile' && (
//                   <Animatable.View
//                     animation="fadeIn"
//                     duration={1000} // Fade-in animation
//                     style={styles.circleAnimation}
//                   />
//                 )}
//               </View>
//             ),
//             tabBarButton: (props) => (
//               <TouchableOpacity
//                 {...props}
//                 style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: wp(4) }}
//                 activeOpacity={0.2}
//                 onPress={() => handleTabPress('MyProfile')}
//               />
//             ),
//           }}
//         />
//       </Tab.Navigator>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   circleAnimation: {
//     position: 'absolute',
//     top: -10,  // Circle ko button ke aas-paas properly align karne ke liye
//     left: -10, // Same as top
//     right: -10, // Same as left
//     bottom: -10, // Same as right
//     width: 60,   // Circle ka size (adjust as needed)
//     height: 60,  // Same as width to maintain circular shape
//     borderRadius: 50,  // Ensure circle is perfectly round
//     opacity: 0.5,
//     backgroundColor: 'rgba(173, 216, 230, 0.3)', // Light blue (paani color)
//   },
// });
