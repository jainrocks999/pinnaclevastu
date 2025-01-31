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
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import styles from './styles';
import {Rating} from 'react-native-ratings';

import {widthPrecent} from '../../../Component/ResponsiveScreen/responsive';
import {useNavigation} from '@react-navigation/native';
import Imagepath from '../../../Component/Imagepath';
import axios from 'axios';
import constants from '../../../Redux/constant/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import {FlatList} from 'react-native-gesture-handler';
import {colors} from '../../../Component/colors';

const AppointmentDetails = ({route}) => {
  const navigation = useNavigation();

  const data = route?.params?.data;
  const [reviewData, setReviewData] = useState({
    reviewTitle: '',
    reviewMessage: '',
  });

  const [ratingStar, setRatingStar] = useState(0);
  // console.log(data, 'sdlskdl');

  const handleInputChange = (name, value) => {
    setReviewData({...reviewData, [name]: value});
  };
  console.log(data, 'sdfm,ldf');
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

      console.log('config ', config);
      // return;
      const response = await axios.request(config);

      // console.log('counting dmgkd ', response.data);
      if (response?.data?.status == 200) {
        Toast.show(response?.data?.msg);
        navigation.navigate('Home1', {
          screen: 'MyProfile',
          params: {screen: 'Appointment'},
        });
      } else {
        // console.log(response?.data.msg);
        Toast.show(response?.data?.msg);
        // navigation.navigate('Home1', {
        //   screen: 'MyProfile',
        //   params: {screen: 'Appointment'},
        // })
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
      // navigation.navigate('Appoiment');
    });
  };

  const shake = field => {
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
      <TouchableOpacity
        // onPress={() => navigation.navigate('profile')}
        style={[styles.cardContainer1]}>
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
              imageSize={widthPrecent(3.5)}
              startingValue={item.star}
              ratingColor="#52B1E9"
              readonly
              ratingBackgroundColor={colors.lightGrey} // Unfilled star color
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
            <Image
              style={styles.backBtn}
              source={require('../../../assets/drawer/Back1.png')}
            />
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
              <Image
                style={styles.ImgIcon}
                source={require('../../../assets/image/cale.png')}
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
              <Image
                style={styles.ImgIcon}
                source={require('../../../assets/image/Layer.png')}
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
                  // readonly={true}
                  startingValue={data?.franchise_details?.reviews_star || ''}
                  tintColor="#F5FAFF"
                  readonly
                  imageSize={widthPrecent(3.5)}
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
            {data?.franchise_details?.services[0]?.services_desc} Lorem Ipsum is
            simply dummy text of the printing and typesetting industry. Lorem
            Ipsum has been the industry's standard dummy text ever since the
            1500s, when an unknown printer took a galley of type and scrambled
            it to make a type specimen book. It has survived not only five
            centuries, but also the leap into electronic typesetting, remaining
            essentially unchanged. It was popularised in the 1960s with the
            release of Letraset sheets containing Lorem Ipsum passages, and more
            recently with desktop publishing software like Aldus PageMaker
            including versions of Lorem Ipsum.
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
            />
            <Text style={styles.seeall}>See all Reviews</Text>
          </View>
        ) : null}

        {data?.status == 'completed' && !reviewIsPresent() ? (
          <View style={[styles.reviewForm, {paddingHorizontal: 30}]}>
            <Text style={styles.formHeadText}>Review Form</Text>
            <Text style={styles.lableText}>Title</Text>
            <Animated.View
              style={[{transform: [{translateX: shakeAnimation.reviewTitle}]}]}>
              <View style={styles.textInputContainer}>
                <TextInput
                  placeholder="Title"
                  placeholderTextColor={'#D2D2D2'}
                  style={styles.textInput}
                  value={reviewData.reviewTitle}
                  onChangeText={text => handleInputChange('reviewTitle', text)}
                />
              </View>
            </Animated.View>

            <Text style={styles.lableText}>Rate</Text>
            <Animated.View
              style={[{transform: [{translateX: shakeAnimation.ratingStar}]}]}>
              <View style={styles.textInputContainer}>
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
                    // readonly
                    style={styles.starContainer}
                  />
                </View>
              </View>
            </Animated.View>

            <Text style={styles.lableText}>Write a Review</Text>
            <Animated.View
              style={[
                {transform: [{translateX: shakeAnimation.reviewMessage}]},
              ]}>
              <View style={[styles.textInputContainer, styles.heightInput]}>
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
