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
import Remedies from './Remediesstack';
import CoureList from '../Screen/Main/Courses';
import MyProfile from './Profilestack';
import ResidentalScreen from '../Screen/Main/ResidentalVastu';
import {useNavigation} from '@react-navigation/native';

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Tab.Navigator
        initialRouteName="MainStack"
        screenOptions={{
          animationEnabled: false,
          activeTintColor: 'green',
          inactiveTintColor: 'grey',
          headerShown: false,
          tabBarStyle: styles.tabBarStyle,
        }}>
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
          name="Remedies"
          component={Remedies}
          options={{
            headerShown: false,
            tabBarLabel: 'Remedies',
            tabBarShowLabel: false,
            tabBarIcon: ({color, size, focused}) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                }}>
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
                  onPress={() => navigation.navigate('UserProfile')}>
                  {focused ? <Layer /> : <Laye />}
                  <Text
                    style={{
                      color: colors.white,
                      fontSize: fontSize.Twelve,
                      fontFamily: 'Poppins-Regular',
                      width: '100%',
                    }}>
                    Profile
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
      </Tab.Navigator>
    </SafeAreaView>
  );
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
