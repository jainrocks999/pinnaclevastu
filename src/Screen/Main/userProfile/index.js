import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Modal,
  Share as SocialShare,
  Linking,
} from 'react-native';
import styles from './styles';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {widthPrecent as wp} from '../../../Component/ResponsiveScreen/responsive';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  clearcartdata,
  clearLocalCartData,
} from '../../../Redux/Slice/CartSlice';
import {useDispatch, useSelector} from 'react-redux';
import BackIcon from '../../../assets/image/backIcon.svg';
import LogoutIcon from '../../../assets/image/logoutIcon.svg';
import RightarrowIcon from '../../../assets/image/right_arrow_icon.svg';
import ProfileIcon1 from '../../../assets/image/profileIcon1.svg';
import ProfileIcon2 from '../../../assets/image/profileIcon2.svg';
import ProfileIcon3 from '../../../assets/image/profileIcon3.svg';
import ProfileIcon4 from '../../../assets/image/profileIcon4.svg';
import ProfileIcon5 from '../../../assets/image/profileIcon5.svg';
import Loader from '../../../Component/Loader';
import Imagepath from '../../../Component/Imagepath';
import {clearUserData} from '../../../Redux/Slice/Authslice';
import constants from '../../../Redux/constant/constants';
import axios from 'axios';
import {orderlistapi} from '../../../Redux/Slice/orderSclice';

const MyProfile = () => {
  const navigation = useNavigation();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const userDetail = useSelector(state => state?.Auth?.userData);
  const {userDetails} = useSelector(state => state.Login);
  const isUserLoading = useSelector(state => state?.Auth?.loading);
  const product = useSelector(state => state?.order?.orderList1);

  const focus = useIsFocused();

  const [count, setCount] = useState('');

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const userStatus = await AsyncStorage.getItem('user_data');
        const userData = JSON.parse(userStatus);

        if (userStatus) {
          apiCall(userData);
          apiCall1(userData);
        }
      } catch (error) {
        console.log('Error checking login status:', error);
      }
    };
    checkLoginStatus();
  }, [focus]);

  const apiCall1 = async userData => {
    await dispatch(
      orderlistapi({
        id: userData?.user_id,
        token: userData?.token,
        url: 'shopify-customer-order-list',
        accessToken: JSON.parse(userData).shopify_access_token,
      }),
    );
  };

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
      const response = await axios.request(config);
      setIsLoading(false);

      if (response?.data?.status == 200) {
        setCount(response?.data?.data);
      } else {
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
      dispatch(clearLocalCartData());
      await AsyncStorage.clear();
      setIsLoading(false);
      setIsModalVisible(false);
      navigation.replace('Home');
      dispatch(clearUserData());
    } catch (error) {
      setIsLoading(false);
      console.log('Error in logout', error);
    }
  };

  const share = async () => {
    const productUrl = `https://pinnaclevastu-in/products`; // Product URL to share
    const productDescription = `Check out this amazing product!`;
    try {
      await SocialShare.share({
        title:'share App',
        message: `${productDescription} ${productUrl}`,
      });
    } catch (error) {
      console.error("Couldn't share to Instagram", error);
    }
  };

  const actionItems = [
    {
      id: '1',
      title: 'Contact Support',
      svg: (
        <ProfileIcon1 width={wp(6)} height={wp(6)} style={styles.actionIcon} />
      ),
    },
    {
      id: '2',
      title: 'Sign up as Franchise',
      svg: (
        <ProfileIcon2 width={wp(6)} height={wp(6)} style={styles.actionIcon} />
      ),
    },
    {
      id: '3',
      title: 'Rate Pinnacle Vastu on App Store',
      svg: (
        <ProfileIcon3 width={wp(6)} height={wp(6)} style={styles.actionIcon} />
      ),
    },
    {
      id: '4',
      title: 'Share App',
      svg: (
        <ProfileIcon4 width={wp(6)} height={wp(6)} style={styles.actionIcon} />
      ),
    },
    {
      id: '5',
      title: 'Delete My Account',
      noArrow: true,
      svg: (
        <ProfileIcon5 width={wp(6)} height={wp(6)} style={styles.actionIcon} />
      ),
    },
  ];

  const renderItem = ({item}) => (
    <TouchableOpacity
      hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
      style={styles.actionItem}
      onPress={() => {
        if (item?.title.includes('Franchise')) {
          navigation.navigate('signupFranchise');
        } else if (item?.title.includes('Share')) {
          share();
        } else if (item?.title.includes('Contact')) {
          Linking.openURL(`tel:+919056611064`).catch(err =>
            console.error('Error opening dialer:', err)
          );
        }
      }
      }>
      <View style={styles.actionContent}>
        {/* <Image source={item.image} style={styles.actionIcon} /> */}
        {item?.svg}
        <Text style={styles.actionText}>{item.title}</Text>
      </View>
      {!item.noArrow && <RightarrowIcon width={wp(3)} height={wp(3)} />}
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
          <BackIcon width={wp(4)} height={wp(4)} style={styles.backIcon} />
        </TouchableOpacity>

        <View style={styles.headerview}>
          <Text style={styles.logoText}>My Profile</Text>
        </View>

        <TouchableOpacity
          style={styles.settingsButton}
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
          onPress={() => setIsModalVisible(true)}>
          {/* <Image
            style={styles.settingsIcon}
            source={require('../../../assets/otherApp/shutdown.png')}
          /> */}
          <LogoutIcon
            width={wp(4)}
            height={wp(4)}
            style={styles.settingsIcon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.profileSection}>
        <Image
          source={
            userDetail?.avatar
              ? {uri: `${Imagepath.Path}${userDetail?.avatar}`}
              : require('../../../assets/image/Remedies/Image-not.png')
          }
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>{userDetails?.displayName}</Text>
        <Text
          style={[
            styles.profileID,
            {opacity: userDetail.length === 0 ? 0 : 1},
          ]}>
          ID: {userDetails?.id?.split('/')?.pop()}
        </Text>
        <Text style={styles.profileEmail}>{userDetails?.email}</Text>
        <Text
          style={[
            styles.profileEmail,
            {marginBottom: 4},
            {opacity: userDetails.length === 0 ? 0 : 1},
          ]}>
          {userDetails?.phone}
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('EditProfile')}
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
          style={styles.editProfileButton}>
          <Text style={styles.editProfileText}>Edit My Profile</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}
      nestedScrollEnabled={true}  
      showsVerticalScrollIndicator={false}  
      >
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
            <Text style={styles.statValue}>{''}</Text>
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
        onRequestClose={() => setIsModalVisible(false)}>
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
