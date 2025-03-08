import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  LayoutAnimation,
  Alert,
  ScrollView,
  Linking,
  Animated,
} from 'react-native';

import {useNavigation, DrawerActions} from '@react-navigation/native';
import {widthPrecent as wp} from '../ResponsiveScreen/responsive';
import CloseIcon from '../../assets/image/closeIcon.svg';
import RightarrowIcon from '../../assets/image/right_arrow_icon.svg';
import FbIcon from '../../assets/image/fbIcon.svg';
import InstaIcon from '../../assets/image/instaIcon.svg';
import YoutubeIcon from '../../assets/image/youtubeIcon.svg';
import {colors} from '../colors';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';


import Collapsible from 'react-native-collapsible';

const Drawer = props => {
  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();

  const service = useSelector(state => state?.drawerSlice?.Data);

  const [expandedItem, setExpandedItem] = useState(null);
  const rotationAnim = useRef(new Animated.Value(0)).current;

  const [animation] = useState(new Animated.Value(0));

  const toggleExpand = title => {
    if (expandedItem === title) {
      setExpandedItem(null);
      Animated.timing(rotationAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setExpandedItem(title);
      Animated.timing(rotationAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const emptyItems = [];
  const nonEmptyItems = [];

  service?.sidebarMenu?.forEach(item => {
    if (item.items.length > 0) {
      nonEmptyItems.push(item);
    } else {
      emptyItems.push(item);
    }
  });
  const openApp = async (url, fallbackUrl) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        if (fallbackUrl) {
          await Linking.openURL(fallbackUrl);
        } else {
          Alert.alert(
            'App Not Installed',
            'The app is not installed on your device.',
          );
        }
      }
    } catch (error) {
     
    }
  };

  const manageDashboard = () => {
    // navigation.dispatch(DrawerActions.closeDrawer());
    navigation.navigate('Home', {
      screen: 'Home1',
      params: {screen: 'Consultancy'},
    });
  };
  const manageDashboard1 = () => {
    // navigation.dispatch(DrawerActions.closeDrawer());
    navigation.navigate('Remedies');
  };
  const Loggout = () => {
    Alert.alert(
      'Are you sure you want to log out?',
      '',
      [
        {
          text: 'Cancel',
          onPress: () => {
            cancelable: false;
          },
          style: 'cancel',
        },
        {text: 'ok', onPress: () => Logout()},
      ],
      {cancelable: false},
    );
  };

  
  const renderItem1 = ({item}) => {
    const isExpanded = expandedItem === item.title;

    const rotateInterpolation = rotationAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '90deg'],
    });

    return (
      <View style={styles.listContainer}>
        <TouchableOpacity
          style={styles.specialListRow}
          onPress={() => {
            toggleExpand(item.title);
          }}>
          <Text style={[styles.listText]}>{item.title}</Text>

          {item?.items?.length > 0 && (
            <Animated.View
              style={[
                {
                  transform: [
                    {
                      rotate: isExpanded ? rotateInterpolation : '0deg',
                    },
                  ],
                },
              ]}>
                   <RightarrowIcon width={wp(4)} height={wp(4)} />
              </Animated.View>
          )}
        </TouchableOpacity>
        <Collapsible collapsed={!isExpanded}>
          <View style={styles.subItemMenu}>
            {item.items.map(subItem => (
              <Text
                key={subItem.id}
                style={[styles.listText, styles.listRow, {marginLeft: 60}]}>
                {subItem.title}
              </Text>
            ))}
          </View>
        </Collapsible>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Image source={require('../../assets/image/header.png')} />
        <TouchableOpacity
          style={{marginRight: -3}}
          onPress={() => props.navigation.closeDrawer()}
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
          {/* <Image source={require('../../assets/drawer/close.png')} /> */}
          <CloseIcon width={wp(4)} height={wp(4)} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: '88%',
          alignSelf: 'center',
          marginTop: 15,
          borderBottomWidth: 1,
          borderColor: '#DFE7EF',
        }}
      />
      <ScrollView>
        <FlatList
          data={service?.sidebarMenu}
          scrollEnabled={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem1}
        />
      </ScrollView>

      <View style={styles.sections}>
        <FlatList
          data={service?.sidebarMenuLinks}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <TouchableOpacity style={styles.extraListItem}>
              <Text
                style={[
                  styles.extraListText,
                  {
                    color:
                      item?.title == 'Numerology Calculator'
                        ? '#C2961E'
                        : item?.title == 'Lucky Gemstone!'
                        ? colors.drawertitle
                        : '#1F5822',
                  },
                ]}>
                {item.title}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <View style={[styles.sections, {marginBottom: 0}]}>
        <View style={styles.socialLinksContainer}>
          <Text style={styles.headText}>Follow us On</Text>
          <Text style={styles.versionText}>Version 1.05.11</Text>
        </View>
        <View style={styles.socialIconContainer}>
          <TouchableOpacity
            onPress={() => openApp('fb://profile', 'https://facebook.com')}>
            
             <FbIcon width={wp(6)} height={wp(6)} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => openApp('instagram://app', 'https://instagram.com')}>
            
             <InstaIcon width={wp(6)} height={wp(6)} style={{marginLeft: 20}} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => openApp('vnd.youtube://', 'https://youtube.com')}>
             <YoutubeIcon width={wp(6)} height={wp(6)} style={{marginLeft: 20}}/>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Drawer;
