import React, {memo, useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {colors} from '../Component/colors';
import {moderateScale} from '../Component/Meterscale';
import TabBarButton from '../Component/TabBarbutton/TabBarButton';

// Import SVG icons
import Home from '../assets/svg/home.svg';
import Chat from '../assets/svg/chat.svg';
import Chat1 from '../assets/svg/chat1.svg';
import Laye from '../assets/svg/Laye.svg';
import Layer from '../assets/svg/Layer.svg';
import Group from '../assets/svg/Group.svg';
import Group1 from '../assets/svg/Group1.svg';
import Icon1 from '../assets/svg/Icon1.svg';
import Icons from '../assets/svg/Icon.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { widthPrecent } from '../Component/ResponsiveScreen/responsive';

const {width} = Dimensions.get('window');

// Move shouldHideTabBar function ABOVE the TabBar component
function shouldHideTabBar(route) {
  const focusedRouteName = getFocusedRouteNameFromRoute(route);

  // Logic to hide tab bar for specific screens
  if (route.name === 'MyProfile') {
    if (!focusedRouteName) {
      return true; // Hide for "MyProfile" main route
    }
    if (
      focusedRouteName === 'UserProfile' ||
      focusedRouteName === 'EditProfile' ||
      focusedRouteName === 'signupFranchise'
    ) {
      return true; // Hide for "UserProfile" and "EditProfile"
    }
  }

  return false;
}

const TabBar = ({state, descriptors, navigation}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkLoginStatus = async () => {
    try {
      const userStatus = await AsyncStorage.getItem('user_data');
      const userData = JSON.parse(userStatus);

      // console.log('virendra', userData);

      if (userStatus) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.log('Error checking login status:', error);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, [state.index]);

  const Icon = {
    MainStack: isFocused =>
      isFocused ? (
        <Home color="black" height={20} width={20} />
      ) : (
        <Image
          style={{height: 20, width: 20}}
          source={require('../assets/otherApp/homeIcon.png')}
        />
      ),
    Consultancy: isFocused =>
      isFocused ? <Chat1 height={20} width={20} /> : <Chat />,
    Remedie12: isFocused =>
      isFocused ? <Group1 height={20} width={20} /> : <Group />,
    Cources: isFocused =>
      isFocused ? <Icon1 height={20} width={20} /> : <Icons />,
    MyProfile: isFocused =>
      isFocused ? <Layer height={20} width={20} /> : <Laye />,
  };

  const [dimensions, setDimensions] = useState({
    height: 20,
    width: 100,
  });

  const buttonWidth = dimensions.width / state.routes.length;
  const profile = buttonWidth * state.index;
  //  console.log('kabhi khusi kabhi gam',profile)

  const tabPositionX = useSharedValue(0);

  const animateStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: tabPositionX.value,
      },
    ],
  }));

  useEffect(() => {
    tabPositionX.value = withTiming(profile ?? buttonWidth * state.index);
  }, [state.index, profile]);

  const onTabBarLayout = e => {
    setDimensions({
      height: e.nativeEvent.layout.height,
      width: e.nativeEvent.layout.width,
    });
  };

  // Determine whether to hide the tab bar
  const shouldHide = shouldHideTabBar(state.routes[state.index]);

  if (shouldHide) {
    return null;
  }

  return (
    <View style={[styles.container]}>
      <View onLayout={onTabBarLayout} style={styles.tab}>
        <Animated.View
          style={[
            animateStyle,
            {
              // position: "absolute",
              // height: 55,
              // top: -0.20,
              // bottom: 0,
              // padding: 35,
              // borderTopWidth: 3,
              // borderColor: '#FFFFFF',

              // backgroundColor: "rgba(173, 216, 230, 0.15)",
              borderTopWidth: widthPrecent(0.6),
              borderColor: '#FFFFFF',
              position: 'absolute',
              height: "100%",
              // bottom: 0,
              // top:-5,
              width: buttonWidth,
              backgroundColor: 'rgba(173, 216, 230, 0.15)',
            },
          ]}
        />
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;

          const tabBarLabel =
            descriptors[route.key].options.tabBarLabel || route.name;
          const RenderIcon = Icon[route.name]
            ? Icon[route.name](isFocused)
            : null;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            tabPositionX.value = withTiming(buttonWidth * state.index);

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name=="MyProfile"?isLoggedIn?"MyProfile":"Login":route.name);8
            }
          };

          return (
            <TabBarButton
              key={route.key}
              onPress={onPress}
              isFocused={isFocused}
              Icon={RenderIcon || (() => <Text>Icon</Text>)}
              lable={tabBarLabel}
            />
          );
        })}
      </View>
    </View>
  );
};

export default memo(TabBar);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.orange,
    height: widthPrecent(15),
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
  tab: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  indicator: {
    position: 'absolute',
    height: 55,
    width: 60,
    borderRadius: 10,
    backgroundColor: 'rgba(173, 216, 230, 0.3)',
  },
});
