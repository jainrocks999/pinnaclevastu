import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  Animated,
  Alert,
  BackHandler,
} from 'react-native';
import styles from './styles';

import {Rating} from 'react-native-ratings';
import {heightPercent} from '../../../Component/ResponsiveScreen/responsive';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getAppoinment} from '../../../Redux/Slice/ConsultancySlice';
import {useDispatch, useSelector} from 'react-redux';
import Imagepath from '../../../Component/Imagepath';

const upcomingAppointments = [
  {
    id: '1',
    title: 'Residential Vastu',
    title1: 'Appointment',
    date: '25 Jan 2024',
    time: '02:30 PM',
    image: require('../../../assets/otherApp/upcomings2.png'),
  },
  {
    id: '2',
    title: 'Industrial Vastu',
    title1: 'Appointment',
    date: '25 Jan 2024',
    time: '07:00 PM',
    image: require('../../../assets/otherApp/upcomings1.png'),
  },
  {
    id: '3',
    title: 'Gemstone',
    title1: 'Appointment',
    date: '25 Jan 2024',
    time: '07:00 PM',
    image: require('../../../assets/otherApp/upcomings3.png'),
  },
];

const completedAppointments = [
  {
    id: '4',
    title: 'Shreni Rajbhandary - Vastu',
    title1: 'Appointment',
    date: '25 Jan 2024',
    time: '02:30 PM',
    reviews: '5 Reviews',
    image: require('../../../assets/otherApp/upcomings2.png'),
  },
  {
    id: '5',
    title: 'Industrial Vastu',
    title1: 'Appointment',
    date: '25 Jan 2024',
    time: '07:00 PM',
    reviews: '5 Reviews',
    image: require('../../../assets/otherApp/upcomings1.png'),
  },
  {
    id: '6',
    title: 'Gemstone',
    title1: 'Appointment',
    date: '25 Jan 2024',
    time: '07:00 PM',
    reviews: '5 Reviews',
    image: require('../../../assets/otherApp/upcomings3.png'),
  },
];

const Appointment = ({}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const appoinment1 = useSelector(state => state?.consultation?.Appoinment1);
  console.log(appoinment1, 'sdfdfsddfsd');
  const [selectedTab, setSelectedTab] = useState('Upcoming');
  const [appointmentsData, setAppointmentsData] = useState(appoinment1);
  const [sessionOver, setSessionOver] = useState(true);
  const [scaleAnims, setScaleAnims] = useState({});
  console.log('data  get', appointmentsData);
  useEffect(() => {
    APPoinemet();
  }, []);
  const APPoinemet = async () => {
    const token = await AsyncStorage.getItem('Token');
    const userid = await AsyncStorage.getItem('user_id');
    await dispatch(
      getAppoinment({
        user_id: userid,
        token: token,
        url: 'franchise-appointment-list',
      }),
    );
  };
  const handlePress = index => {
    const newScaleAnims = {...scaleAnims};

    if (!newScaleAnims[index]) {
      newScaleAnims[index] = new Animated.Value(1);
    }

    setScaleAnims(newScaleAnims);

    Animated.sequence([
      Animated.timing(newScaleAnims[index], {
        toValue: 0.97,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(newScaleAnims[index], {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      navigation.navigate('AppoinmentDetail');
    });
  };

  const handleTabClick = tab => {
    setSelectedTab(tab);
    if (tab === 'Upcoming') {
      setAppointmentsData(appoinment1);
    } else {
      setAppointmentsData(completedAppointments);
    }
  };
  function formatDateDirectly(dateString) {
    // Convert "16-01-2025" into a valid Date object
    const [day, month, year] = dateString.split('-');
    const date = new Date(`${year}-${month}-${day}`);

    // Use Intl.DateTimeFormat for formatting
    return new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(date);
  }
  const renderAppointment = ({item, index}) => {
    const itemScaleAnim = scaleAnims[index] || new Animated.Value(1);

    return (
      <Animated.View
        style={[
          {
            transform: [{scale: itemScaleAnim}],
          },
        ]}>
        <TouchableOpacity
          onPress={() => handlePress(index)}
          style={styles.appointmentContainer}>
          <Image
            source={
              item?.franchise_details?.logo
                ? {uri: `${Imagepath?.Path}${item?.franchise_details?.logo}`}
                : require('../../../assets/image/Remedies/Image-not.png')
            }
            style={styles.appointmentImage}
          />
          <View style={styles.appointmentDetails}>
            <Text
              style={[
                styles.appointmentTitle,
                selectedTab === 'Upcoming' && styles.upcomingTitleStyle,
              ]}>
              {item.franchise_details?.franchise_name}
            </Text>
            <Text
              style={[
                styles.appointmentTitle1,
                selectedTab === 'Upcoming' && styles.upcomingTitle1Style, // Conditional style
              ]}>
              {item.booking_text}
            </Text>
            <View style={styles.direction1}>
              <Image
                source={require('../../../assets/image/cale.png')}
                style={styles.dateimg}
              />
              <Text
                style={[
                  styles.appointmentDate,
                  selectedTab === 'Completed' && styles.redText,
                  selectedTab === 'Upcoming' && styles.upcomingDateStyle, // Conditional styling for date
                ]}>
                {formatDateDirectly(item?.booking_date)}
              </Text>
            </View>
            <View style={styles.direction1}>
              <Image
                source={require('../../../assets/image/Layer.png')}
                style={styles.dateimg}
              />
              <Text
                style={[
                  styles.appointmentTime,
                  selectedTab === 'Completed' && styles.redText,
                  selectedTab === 'Upcoming' && styles.upcomingTimeStyle, // Conditional styling for time
                ]}>
                {item.booking_time}
              </Text>
            </View>
            {selectedTab === 'Completed' && (
              <View style={styles.reviewContainer}>
                {sessionOver ? (
                  <View style={styles.cardStar}>
                    <Rating
                      type="custom"
                      ratingColor="#52B1E9"
                      startingValue={5}
                      tintColor="#fff"
                      imageSize={12}
                      style={styles.starContainer}
                    />
                    <Text style={styles.ratingText}> 5 reviews</Text>
                  </View>
                ) : null}
              </View>
            )}
          </View>
          <View style={styles.arrowButton}>
            <Image
              source={require('../../../assets/otherApp/arrowcom.png')}
              style={[
                styles.arrowIcon,
                selectedTab === 'Upcoming' && styles.arrowIconup,
              ]}
            />
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerview}>
          <TouchableOpacity
            style={{height: 20, width: 30}}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
            // onPress={() =>
            //   navigation.reset({
            //     index: 0,
            //     routes: [{name: 'UserProfile'}],
            //   })}
            onPress={() => navigation.goBack()}>
            <Image
              style={{height: 15, width: 10}}
              source={require('../../../assets/drawer/Back.png')}
            />
          </TouchableOpacity>
          <Text style={styles.logoText}>Appointments</Text>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: heightPercent(10),
        }}>
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'Upcoming' && styles.activeTab]}
            onPress={() => handleTabClick('Upcoming')}>
            <Text
              style={[
                styles.tabText,
                selectedTab === 'Upcoming' && styles.activeTabText,
              ]}>
              Upcoming
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tab,
              selectedTab === 'Completed' && styles.activeTab,
            ]}
            onPress={() => handleTabClick('Completed')}>
            <Text
              style={[
                styles.tabText,
                selectedTab === 'Completed' && styles.activeTabText,
              ]}>
              Completed
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={appointmentsData}
          renderItem={renderAppointment}
          keyExtractor={item => item.id}
        />
      </ScrollView>
    </View>
  );
};

export default Appointment;
