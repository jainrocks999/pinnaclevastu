import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ScrollView,
} from 'react-native';

import {fontSize} from '../../../Component/fontsize';
import {colors} from '../../../Component/colors';
import {widthPrecent} from '../../../Component/ResponsiveScreen/responsive';
import styles from './styles';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width} = Dimensions.get('window');

const MyProfile = () => {
const navigation=useNavigation();
const [isLoggedIn, setIsLoggedIn] = useState(false);
const focus =useIsFocused();
useEffect(() => {
  const checkLoginStatus = async () => {
    try {
      const userStatus = await AsyncStorage.getItem('user_data');
      const userData = JSON.parse(userStatus);

      console.log('virendra', userData);

      if (userStatus) {
        // await AsyncStorage.clear();
        setIsLoggedIn(true);
      } else {
       navigation.navigate('Login')
        setIsLoggedIn(false);
        // navigation.navigate('Login'); // Navigate to login screen if not logged in
      }
    } catch (error) {
      console.log('Error checking login status:', error);
    }
  };

  checkLoginStatus();
}, [focus]);


  const actionItems = [
    {
      id: '1',
      title: 'Contact Support',
      image: require('../../../assets/otherApp/profile1.png'),
    },
    {
      id: '2',
      title: 'Sign up as Franchise',
      image: require('../../../assets/otherApp/profile2.png'),
    },
    {
      id: '3',
      title: 'Rate Pinnacle Vastu on App Store',
      image: require('../../../assets/otherApp/profile3.png'),
    },
    {
      id: '4',
      title: 'Share App',
      image: require('../../../assets/otherApp/profile4.png'),
    },
    {
      id: '5',
      title: 'Delete My Account',
      image: require('../../../assets/otherApp/profile5.png'),
      noArrow: true,
    },
  ];

  const renderItem = ({item}) => (
    <TouchableOpacity style={styles.actionItem}>
      <View style={styles.actionContent}>
        <Image source={item.image} style={styles.actionIcon} />
        <Text style={styles.actionText}>{item.title}</Text>
      </View>
      {!item.noArrow && (
        <Image
          source={require('../../../assets/otherApp/arrowr.png')}
          style={styles.arrowIcon}
        />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}>
          <Image
            style={styles.backIcon}
            source={require('../../../assets/drawer/Back1.png')}
          />
        </TouchableOpacity>

        <View style={styles.headerview}>
          <Text style={styles.logoText}>My Profile</Text>
        </View>

        <TouchableOpacity style={styles.settingsButton}>
          <Image
            style={styles.settingsIcon}
            source={require('../../../assets/otherApp/shutdown.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.profileSection}>
        <Image
          source={require('../../../assets/otherApp/profile.png')} // Replace with actual profile picture URL
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>Tejash Shah</Text>
        <Text style={styles.profileID}>ID: TEJ1234</Text>
        <Text style={styles.profileEmail}>tejash@binaryic.in</Text>
        <Text style={[styles.profileEmail, {marginBottom: 4}]}>
          +91 123456789
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('EditProfile')}
          style={styles.editProfileButton}>
          <Text style={styles.editProfileText}>Edit My Profile</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContent}>
        <View style={styles.statsSection}>
          <TouchableOpacity
           onPress={()=>navigation.navigate( "Home1",{screen:'MyProfile',params:{screen:'MyOrder'}})}
            style={styles.statItem}>
            <Text style={styles.statValue}>25</Text>
            <View style={styles.statLabelRow}>
              <Text style={styles.statLabel}>{'My Orders >'}</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.withBorder} />

          <TouchableOpacity
                    onPress={()=>navigation.navigate("Home1",{screen:"MyProfile",params:{screen:"CoureList"}})} 

            style={styles.statItem}>
            <Text style={styles.statValue}>10</Text>
            <View style={styles.statLabelRow}>
              <Text style={styles.statLabel}>{'My Courses >'}</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.withBorder} />

          <TouchableOpacity
             onPress={()=>navigation.navigate("Home1",{screen:"MyProfile",params:{screen:"Appointment"}})}
            style={styles.statItem}>
            <Text style={styles.statValue}>5</Text>
            <View style={styles.statLabelRow}>
              <Text style={styles.statLabel}>{'Appointments >'}</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.horizontalSeparator} />

        <FlatList
          data={actionItems}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.actionList}
          ItemSeparatorComponent={({leadingItem}) =>
            leadingItem?.id !== '5' && <View style={styles.separator} />
          }
        />
        <View style={styles.horizontalSeparator} />
      </ScrollView>
     
    </View>
  );
};

export default MyProfile;
