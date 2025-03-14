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
import {widthPrecent as wp} from '../../../Component/ResponsiveScreen/responsive';
import BackIcon from '../../../assets/image/backIcon.svg';
import ClockIcon from '../../../assets/image/timeIcon.svg';
import CalendarIcon from '../../../assets/image/calendarIcon.svg';
import RightarrowIcon from '../../../assets/image/right_arrow_icon_org.svg';
import {Rating} from 'react-native-ratings';
import {heightPercent} from '../../../Component/ResponsiveScreen/responsive';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getAppoinment} from '../../../Redux/Slice/ConsultancySlice';
import {useDispatch, useSelector} from 'react-redux';
import Imagepath from '../../../Component/Imagepath';

const Appointment = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const appoinment1 = useSelector(state => state?.consultation?.Appoinment1);
  const [selectedTab, setSelectedTab] = useState('upcoming');
  const [scaleAnims, setScaleAnims] = useState({});

  useEffect(() => {
    APPoinemet();
  }, []);

  const APPoinemet = async status => {
    const token = await AsyncStorage.getItem('Token');
    const userid = await AsyncStorage.getItem('user_id');
    await dispatch(
      getAppoinment({
        user_id: userid,
        token: token,
        url: `franchise-appointment-list?user_id=${userid}&type=${
          status || 'upcoming'
        }`,
      }),
    );
  };

  const handlePress = (index, item) => {
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
      navigation.navigate('AppoinmentDetail', {data: item});
    });
  };

  const handleTabClick = tab => {
    setSelectedTab(tab);
    APPoinemet(tab);
  };

  useEffect(() => {
    const backAction = () => {
      navigation.reset({
        index: 0,
        routes: [{name: 'UserProfile'}],
      });
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [navigation]);

  function formatDateDirectly(dateString) {
    const [day, month, year] = dateString.split('-');
    const date = new Date(`${year}-${month}-${day}`);
    return new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(date);
  }

  function convertToAmPm(timeString) {
    let [hours, minutes] = timeString.split(':').map(Number);

    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12 || 12;
    return `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
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
          onPress={() => handlePress(index, item)}
          style={[styles.appointmentContainer]}>
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
                item?.status == 'upcoming' && styles.upcomingTitleStyle,
              ]}>
              {item.franchise_details?.franchise_name}
            </Text>

            <View style={styles.direction1}>
              {/* <Image
                source={require('../../../assets/image/cale.png')}
                style={styles.dateimg}
              /> */}
              <CalendarIcon width={wp(4)} height={wp(4)} style={{marginRight: 10}} />
              <Text
                style={[
                  styles.appointmentDate,
                  item?.status == 'completed' && styles.redText,
                  item?.status == 'upcoming' && styles.upcomingDateStyle,
                ]}>
                {formatDateDirectly(item?.booking_date)}
              </Text>
            </View>
            <View style={styles.direction1}>
              {/* <Image
                source={require('../../../assets/image/Layer.png')}
                style={styles.dateimg}
              /> */}
               <ClockIcon width={wp(4)} height={wp(4)} style={{marginRight: 10}} />
              <Text
                style={[
                  styles.appointmentTime,
                  item?.status == 'completed' && styles.redText,
                  item?.status == 'upcoming' && styles.upcomingTimeStyle,
                ]}>
                {convertToAmPm(item.booking_time)}
              </Text>
            </View>
            {item?.status == 'completed' && (
              <View style={styles.reviewContainer}>
                <View style={styles.cardStar}>
                  <Rating
                    type="custom"
                    ratingColor="#52B1E9"
                    startingValue={item?.franchise_details?.reviews_star}
                    tintColor="#fff"
                    imageSize={12}
                    readonly
                    ratingBackgroundColor={'#D8E3E980'}
                    style={styles.starContainer}
                  />
                  <Text style={styles.ratingText}>
                    {' '}
                    {item?.franchise_details?.franchise_reviews?.length} reviews
                  </Text>
                </View>
              </View>
            )}
          </View>
          <View style={styles.arrowButton}>
               <RightarrowIcon width={wp(4)} height={wp(4)} />
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
            onPress={() =>
              navigation.reset({
                index: 0,
                routes: [{name: 'UserProfile'}],
              })
            }>
            <BackIcon width={wp(4)} height={wp(4)} style={styles.backBtn} />
          </TouchableOpacity>
          <Text style={styles.logoText}>Appointments</Text>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: heightPercent(10),
          minHeight: '100%',
        }}>
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, selectedTab == 'upcoming' && styles.activeTab]}
            onPress={() => handleTabClick('upcoming')}>
            <Text
              style={[
                styles.tabText,
                selectedTab == 'upcoming' && styles.activeTabText,
              ]}>
              Upcoming
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedTab == 'completed' && styles.activeTab]}
            onPress={() => handleTabClick('completed')}>
            <Text
              style={[
                styles.tabText,
                selectedTab == 'completed' && styles.activeTabText,
              ]}>
              Completed
            </Text>
          </TouchableOpacity>
        </View>

        {appoinment1.length == 0 ? (
          <View style={styles.emptyMessageContainer}>
            <Text style={styles.emptyMessage}>
              Sorry, no Vastu expert appointments were found.
            </Text>
          </View>
        ) : (
          <FlatList
            data={[...appoinment1].reverse()}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            renderItem={renderAppointment}
            keyExtractor={item => item.id.toString()}
          />
        )}
      </ScrollView>
    </View>
  );
};

export default Appointment;
