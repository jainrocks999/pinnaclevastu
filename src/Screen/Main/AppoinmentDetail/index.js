import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Animated,
  BackHandler,
  Vibration,
  FlatList,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import styles from './styles';
import BackIcon from '../../../assets/image/backIcon.svg';
import ClockIcon from '../../../assets/image/timeIcon.svg';
import CalendarIcon from '../../../assets/image/calendarIcon.svg';
import {Rating} from 'react-native-ratings';
import {widthPrecent as wp} from '../../../Component/ResponsiveScreen/responsive';
import {useNavigation} from '@react-navigation/native';
import Imagepath from '../../../Component/Imagepath';
import axios from 'axios';
import constants from '../../../Redux/constant/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import {colors} from '../../../Component/colors';

const AppointmentDetails = ({route}) => {
  const navigation = useNavigation();

  const data = route?.params?.data;
  const [reviewData, setReviewData] = useState({
    reviewTitle: '',
    reviewMessage: '',
  });

  const [ratingStar, setRatingStar] = useState(0);
  const handleInputChange = (name, value) => {
    setReviewData({...reviewData, [name]: value});
    setValidationError({...validationError, [name]: false});
  };
  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  const [shakeAnimation, setShakeAnimation] = useState({
    reviewTitle: new Animated.Value(0),
    reviewMessage: new Animated.Value(0),
    ratingStar: new Animated.Value(0),
  });

  const [validationError, setValidationError] = useState({
    reviewTitle: false,
    reviewMessage: false,
    ratingStar: false,
  });

  const buttonAnimatedValue = useRef(new Animated.Value(1)).current;

  const filterReviewByCustomerId = () => {
    const reviewData = data?.franchise_details?.franchise_reviews;
    return reviewData.filter(item => item.customer_id == data?.user_id);
  };

  const reviewIsPresent = () => {
    const reviewData = data?.franchise_details?.franchise_reviews;
    return reviewData.some(item => item.booking_id == data?.id);
  };

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

  const handleRatingChange = newRating => {
    setValidationError({...validationError, ratingStar: false});
    setRatingStar(newRating);
  };

  const addReview = async () => {
    try {
      const userStatus = await AsyncStorage.getItem('user_data');
      const userData = JSON.parse(userStatus);

      let bodyData = {
        franchise_id: data?.franchise_assign_to,
        title: reviewData.reviewTitle,
        star: ratingStar,
        comment: reviewData.reviewMessage,
        user_id: userData?.user_id,
        booking_id: data?.id,
      };
      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${constants.mainUrl}franchise-reviews-post`,
        headers: {
          Authorization: `Bearer ${userData?.token}`,
          'Content-Type': 'application/json',
        },
        data: JSON.stringify(bodyData),
      };
      const response = await axios.request(config);
      if (response?.data?.status == 200) {
        Toast.show(response?.data?.msg);
        navigation.navigate('Home1', {
          screen: 'MyProfile',
          params: {screen: 'Appointment'},
        });
      } else {
        Toast.show(response?.data?.msg);
      }
    } catch (error) {
      console.log('Error checking login status:', error);
    }
  };

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(buttonAnimatedValue, {
        toValue: 0.94,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(buttonAnimatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (reviewData.reviewTitle === '') {
        shake('reviewTitle');

        return;
      } else if (reviewData.reviewTitle.length < 4) {
        shake('reviewTitle');

        return;
      } else if (ratingStar == 0) {
        shake('ratingStar');
        return;
      } else if (reviewData.reviewMessage == '') {
        shake('reviewMessage');

        return;
      } else if (reviewData.reviewMessage.length < 4) {
        shake('reviewMessage');

        return;
      } else {
        addReview();
      }
    });
  };

  const shake = field => {
    setValidationError({...validationError, [field]: true});
    Vibration.vibrate(100);
    Animated.sequence([
      Animated.timing(shakeAnimation[field], {
        toValue: 5,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation[field], {
        toValue: -5,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation[field], {
        toValue: 5,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation[field], {
        toValue: -5,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation[field], {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const renderItem3 = ({item}) => {
    return (
      <TouchableOpacity style={[styles.cardContainer1]}>
        <View style={styles.reviewCard}>
          <View style={{paddingLeft: 5}}>
            <Image
              style={styles.reviewImage}
              source={
                item?.images
                  ? {uri: `${Imagepath?.Path}${item.images}`}
                  : require('../../../assets/image/Remedies/Image-not.png')
              }
            />
            <Rating
              type="custom"
              tintColor={colors.white}
              ratingCount={5}
              imageSize={wp(3.5)}
              startingValue={item.star}
              ratingColor="#52B1E9"
              readonly
              ratingBackgroundColor={colors.lightGrey}
            />
          </View>
          <View style={[styles.card, {paddingLeft: 10}]}>
            <Text style={styles.third1}>{item.customer_name}</Text>

            <Text style={[styles.third2, {marginTop: -8}]}>
              {item?.comment}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerView}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
            <BackIcon width={wp(4)} height={wp(4)} style={styles.backBtn} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Residential Vastu</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.ProfileInfoSection}>
          <View style={styles.imageSection}>
            <Image
              style={styles.mainImg}
              source={
                data?.franchise_details?.logo
                  ? {
                      uri: `${Imagepath?.Path}${data?.franchise_details?.logo}`,
                    }
                  : require('../../../assets/image/Remedies/Image-not.png')
              }
            />
          </View>
          <View style={styles.InfoSection}>
            <View>
              <Text style={[styles.nameText, {color: '#F4996C'}]}>
                {' '}
                {data?.franchise_details?.franchise_name}{' '}
              </Text>
              <Text style={styles.nameText}>
                {data?.franchise_details?.services[0]?.services_name}
              </Text>
            </View>

            <Text style={styles.sectionText}>Appointment</Text>
            <View style={styles.dateInfoContainer}>
              <CalendarIcon
                width={wp(4)}
                height={wp(4)}
                style={{marginRight: 5}}
              />
              <Text
                style={[
                  styles.dateText,
                  {color: data?.status == 'completed' ? '#F50E0E' : '#52B1E9'},
                ]}>
                {formatDateDirectly(data?.booking_date)}
              </Text>
            </View>

            <View style={styles.dateInfoContainer}>
              <ClockIcon
                width={wp(4)}
                height={wp(4)}
                style={{marginRight: 5}}
              />
              <Text
                style={[
                  styles.dateText,
                  {color: data?.status == 'completed' ? '#F50E0E' : '#52B1E9'},
                ]}>
                {convertToAmPm(data?.booking_time)}
              </Text>
            </View>

            {data?.status == 'completed' ? (
              <View style={styles.cardStar}>
                <Rating
                  type="custom"
                  ratingColor="#52B1E9"
                  startingValue={data?.franchise_details?.reviews_star || ''}
                  tintColor="#F5FAFF"
                  readonly
                  imageSize={wp(3.5)}
                  style={styles.starContainer}
                />
                <Text style={styles.ratingText}>
                  {' '}
                  {data?.franchise_details?.franchise_reviews?.length} reviews
                </Text>
              </View>
            ) : null}
          </View>
        </View>

        <View style={styles.textContainer}>
          <Text style={[styles.nameText, {textAlign: 'left'}]}>
            About {data?.franchise_details?.services[0]?.services_name}
          </Text>
          <Text style={styles.smallText}>
            {data?.franchise_details?.services[0]?.services_desc}
          </Text>
        </View>
        {data?.status == 'completed' &&
        filterReviewByCustomerId()?.length != 0 &&
        reviewIsPresent() ? (
          <View style={styles.reviewForm}>
            <Text
              style={[
                styles.formHeadText,
                {textAlign: 'left', marginLeft: 20},
              ]}>
              Your Reviews ({filterReviewByCustomerId()?.length})
            </Text>

            <FlatList
              data={filterReviewByCustomerId()}
              scrollEnabled={false}
              renderItem={renderItem3}
              keyExtractor={item => item.id}
              //   numColumns={3}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: 15,
              }}
            />
            {filterReviewByCustomerId()?.length >= 5 && (
              <Text style={styles.seeall}>See all Reviews</Text>
            )}
          </View>
        ) : null}

        {data?.status == 'completed' && !reviewIsPresent() ? (
          <View style={[styles.reviewForm, {paddingHorizontal: 30}]}>
            <Text style={styles.formHeadText}>Review Form</Text>
            <Text style={styles.lableText}>Title</Text>
            <Animated.View
              style={[{transform: [{translateX: shakeAnimation.reviewTitle}]}]}>
              <View
                style={[
                  styles.textInputContainer,
                  validationError.reviewTitle && {borderColor: 'red'},
                ]}>
                <TextInput
                  placeholder="Title"
                  placeholderTextColor={'#D2D2D2'}
                  style={styles.textInput}
                  value={reviewData.reviewTitle}
                  onChangeText={text => handleInputChange('reviewTitle', text)}
                />
              </View>
            </Animated.View>
            {validationError.reviewTitle && (
              <Text style={styles.errorText}>
                Please give your valid title.
              </Text>
            )}

            <Text style={styles.lableText}>Rate</Text>
            <Animated.View
              style={[{transform: [{translateX: shakeAnimation.ratingStar}]}]}>
              <View
                style={[
                  styles.textInputContainer,
                  validationError.ratingStar && {borderColor: 'red'},
                ]}>
                <Text style={[styles.textInput, {color: '#D2D2D2'}]}>
                  How would you rate this services
                </Text>
                <View style={{marginLeft: 14}}>
                  <Rating
                    type="custom"
                    ratingColor="#4A4A4A"
                    minValue={1}
                    tintColor="#FFFFFF"
                    ratingCount={5}
                    imageSize={20}
                    ratingBackgroundColor={'#D8E3E980'}
                    startingValue={ratingStar}
                    onFinishRating={handleRatingChange}
                    style={styles.starContainer}
                  />
                </View>
              </View>
            </Animated.View>
            {validationError.ratingStar && (
              <Text style={styles.errorText}>
                Please give your rating by selecting a star.
              </Text>
            )}

            <Text style={styles.lableText}>Write a Review</Text>
            <Animated.View
              style={[
                {transform: [{translateX: shakeAnimation.reviewMessage}]},
              ]}>
              <View
                style={[
                  styles.textInputContainer,
                  styles.heightInput,
                  validationError.reviewMessage && {borderColor: 'red'},
                ]}>
                <TextInput
                  placeholder="Type here..."
                  placeholderTextColor={'#D2D2D2'}
                  style={styles.textInput}
                  value={reviewData.reviewMessage}
                  onChangeText={text =>
                    handleInputChange('reviewMessage', text)
                  }
                />
              </View>
            </Animated.View>
            {validationError.reviewMessage && (
              <Text style={styles.errorText}>
                Please give your valid review message.
              </Text>
            )}

            <Animated.View
              style={[{transform: [{scale: buttonAnimatedValue}]}]}>
              <TouchableOpacity
                style={styles.submitBtn}
                onPress={handlePress}
                activeOpacity={1}>
                <Text style={styles.btext1}>SUBMIT</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
};

export default AppointmentDetails;
