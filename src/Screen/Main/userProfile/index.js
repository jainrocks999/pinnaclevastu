import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ScrollView,
  Modal,
} from 'react-native';

import {fontSize} from '../../../Component/fontsize';
import {colors} from '../../../Component/colors';
import {widthPrecent} from '../../../Component/ResponsiveScreen/responsive';
import styles from './styles';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {clearcartdata, clearLocalCartData} from '../../../Redux/Slice/CartSlice';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../../Component/Loader';
import Imagepath from '../../../Component/Imagepath';
import {clearUserData, getUserDetailApi} from '../../../Redux/Slice/Authslice';
import constants from '../../../Redux/constant/constants';
import axios from 'axios';

const {width} = Dimensions.get('window');
const MyProfile = () => {
  const navigation = useNavigation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const userDetail = useSelector(state => state?.Auth?.userData);
  const isUserLoading = useSelector(state => state?.Auth?.loading);
  const focus = useIsFocused();

  const [count, setCount] = useState('');

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const userStatus = await AsyncStorage.getItem('user_data');
        const userData = JSON.parse(userStatus);

        if (userStatus) {
          setIsLoggedIn(true);
          apiCall(userData);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.log('Error checking login status:', error);
      }
    };
    checkLoginStatus();
  }, [focus]);

  const apiCall = async userData => {
    try {
      setIsLoading(true);
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${constants.mainUrl}fetch-profile-counting?user_id=${userData?.user_id}`,
        headers: {
          Authorization: `Bearer ${userData?.token}`,
        },
      };
      //  console.log('config ',config);
      const response = await axios.request(config);
      setIsLoading(false);
      // console.log('counting dmgkd ', response.data);
      if (response?.data?.status == 200) {
        setCount(response?.data?.data);
      } else {
        // Toast.show(response?.data?.msg);
        console.log(response?.data);
      }
    } catch (error) {
      console.log('Error checking login status:', error);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      dispatch(clearcartdata());
      dispatch(clearLocalCartData())
      await AsyncStorage.clear();
      // navigation.navigate('Home');
      setIsLoading(false);
      setIsModalVisible(false);
      navigation.replace('Home');
      dispatch(clearUserData());
    } catch (error) {
      setIsLoading(false);
      console.log('Error in logout', error);
    }
  };

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
    <TouchableOpacity
      hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
      style={styles.actionItem}
      onPress={() =>
        item?.title.includes('Franchise')
          ? navigation.navigate('signupFranchise')
          : null
      }>
      <View style={styles.actionContent}>
        {/* {console.log(item?.title.includes("Franchise"))} */}
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
      {isLoading || isUserLoading ? <Loader /> : null}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
          <Image
            style={styles.backIcon}
            source={require('../../../assets/drawer/Back1.png')}
          />
        </TouchableOpacity>

        <View style={styles.headerview}>
          <Text style={styles.logoText}>My Profile</Text>
        </View>

        <TouchableOpacity
          style={styles.settingsButton}
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
          onPress={() => setIsModalVisible(true)}>
          <Image
            style={styles.settingsIcon}
            source={require('../../../assets/otherApp/shutdown.png')}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.profileSection}>
        <Image
          // source={require('../../../assets/otherApp/profile.png')} // Replace with actual profile picture URL
          source={
            userDetail?.avatar
              ? {uri: `${Imagepath.Path}${userDetail?.avatar}`}
              : require('../../../assets/image/Remedies/Image-not.png')
          }
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>{userDetail?.name}</Text>
        <Text
          style={[
            styles.profileID,
            {opacity: userDetail.length === 0 ? 0 : 1},
          ]}>
          ID: {userDetail?.id}
        </Text>
        <Text style={styles.profileEmail}>{userDetail?.email}</Text>
        <Text
          style={[
            styles.profileEmail,
            {marginBottom: 4},
            {opacity: userDetail.length === 0 ? 0 : 1},
          ]}>
          +91 {userDetail?.phone}
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('EditProfile')}
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
          style={styles.editProfileButton}>
          <Text style={styles.editProfileText}>Edit My Profile</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContent}>
        {/* {console.log(count,"sdmkflsmfl")} */}
        <View style={styles.statsSection}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Home1', {
                screen: 'MyProfile',
                params: {screen: 'MyOrder', params: {data: 'Remedies'}},
              })
            }
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
            style={styles.statItem}>
            <Text style={styles.statValue}>25</Text>
            <View style={styles.statLabelRow}>
              <Text style={styles.statLabel}>{'My Orders >'}</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.withBorder} />

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Home1', {
                screen: 'MyProfile',
                params: {screen: 'CoureList'},
              })
            }
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
            style={styles.statItem}>
            <Text style={styles.statValue}>{count?.total_course || 0}</Text>
            <View style={styles.statLabelRow}>
              <Text style={styles.statLabel}>{'My Courses >'}</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.withBorder} />

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Home1', {
                screen: 'MyProfile',
                params: {screen: 'Appointment'},
              })
            }
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
            style={styles.statItem}>
            <Text style={styles.statValue}>
              {count?.total_booking_appointment || 0}
            </Text>
            <View style={styles.statLabelRow}>
              <Text style={styles.statLabel}>{'Appointments >'}</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.horizontalSeparator} />

        <FlatList
          data={actionItems}
          keyExtractor={item => item.id}
          scrollEnabled={false}
          renderItem={renderItem}
          contentContainerStyle={styles.actionList}
          ItemSeparatorComponent={({leadingItem}) =>
            leadingItem?.id !== '5' && <View style={styles.separator} />
          }
        />
        <View style={styles.horizontalSeparator} />
      </ScrollView>
      <Modal
        transparent={true}
        animationType="fade"
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
        // onCancel={() => setIsModalVisible(false)}
        // onConfirm={() => removerItem(itemToRemove)}
      >
        <View style={styles.modalOverlay} pointerEvents="box-none">
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Log out</Text>
            <Text style={styles.modalMessage}>
              Are you sure you want to log out?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setIsModalVisible(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={() => handleLogout()}>
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MyProfile;
