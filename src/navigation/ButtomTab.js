import {View, Text, Image, SafeAreaView, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
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
import {fontSize} from '../Component/fontsize';
import {colors} from '../Component/colors';
import HomeScreen from '../Screen/Main/HomeScreen';
import Remedie from './Remediesstack';
import CoureList from '../Screen/Main/Courses';
import MyProfile from './Profilestack';
import ResidentalScreen from '../Screen/Main/ResidentalVastu';
import CustomTab from './CustomTab';
import {useSelector} from 'react-redux';
import Loader from '../Component/Loader';
const Tab = createBottomTabNavigator();

export default function BottomTab() {
  const [activeTab, setActiveTab] = useState('MainStack');
  const [circleVisible, setCircleVisible] = useState('MainStack');
  const isExtraDataLoading = useSelector(state => state?.HomeBanner?.isExtraDataLoading);
  const cartisLoading = useSelector(state => state.cart?.loading);
  const orderisLoading = useSelector(state => state.order?.loading);
  const collection1 = useSelector(state => state.collection?.isLoading);
  const search =useSelector(state => state?.search?.isLoading)
 
  
  const PDP = useSelector(state => state.Product?.isLoading);

  const ConsultancyLoading = useSelector(state => state?.consultation?.loading);
  const handleTabPress = tab => {
    setCircleVisible(tab);
    setActiveTab(tab);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {
      isExtraDataLoading ||
      collection1 ||
      // search ||
      PDP ||
      cartisLoading ||
      orderisLoading ||
      ConsultancyLoading ? (
        <Loader />
      ) : null}
      <Tab.Navigator
        tabBar={props => <CustomTab {...props} />}
        initialRouteName="MainStack"
        screenOptions={({route}) => ({
          animationEnabled: false,
          activeTintColor: 'green',
          inactiveTintColor: 'grey',
          headerShown: false,
          tabBarStyle: {
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
            bottom: -5,
            overflow: 'hidden',
          },
        })}>
        <Tab.Screen
          name="MainStack"
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarLabel: 'Home',
            tabBarShowLabel: false,
            tabBarIcon: ({focused}) => (
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
                    fontSize: fontSize.Ten,
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
                  marginTop: moderateScale(4),
                }}
                activeOpacity={0.2}
                onPress={() => {
                  handleTabPress('MainStack');
                  props.onPress();
                }}
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
            tabBarIcon: ({focused}) => (
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
                    fontSize: fontSize.Ten,
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
                  marginTop: moderateScale(4),
                }}
                activeOpacity={0.2}
                onPress={() => {
                  handleTabPress('Consultancy');
                  props.onPress();
                }}
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
            tabBarIcon: ({focused}) => (
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
                    fontSize: fontSize.Ten,
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
                  marginTop: moderateScale(4),
                }}
                activeOpacity={0.2}
                onPress={() => {
                  handleTabPress('Remedie12');
                  props.onPress();
                }} 
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
            tabBarIcon: ({focused}) => (
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
                    fontSize: fontSize.Ten,
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
                  marginTop: moderateScale(4),
                }}
                activeOpacity={0.2}
                onPress={() => {
                  handleTabPress('Cources');
                  props.onPress();
                }} 
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
            tabBarIcon: ({focused}) => (
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
                    fontSize: fontSize.Ten,
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
                  marginTop: moderateScale(4),
                }}
                activeOpacity={0.2}
                onPress={() => {
                  handleTabPress('MyProfile');
                  props.onPress();
                }} 
              />
            ),
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
}
