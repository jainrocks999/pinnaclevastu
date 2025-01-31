import {View, Text, Vibration, TextInput, Animated, TouchableOpacity} from 'react-native';
import React, {useRef, useState} from 'react';
import styles from './styles';
import {Rating} from 'react-native-ratings';

const Reviewform = () => {
  const buttonAnimatedValue = useRef(new Animated.Value(1)).current;
  const [ratingStar, setRatingStar] = useState(0);
  const [reviewData, setReviewData] = useState({
    reviewTitle: '',
    reviewMessage: '',
  });

  const [shakeAnimation, setShakeAnimation] = useState({
    reviewTitle: new Animated.Value(0),
    reviewMessage: new Animated.Value(0),
    ratingStar: new Animated.Value(0),
  });

  const handleRatingChange = newRating => {
    setRatingStar(newRating);
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

  return (
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
        style={[{transform: [{translateX: shakeAnimation.reviewMessage}]}]}>
        <View style={[styles.textInputContainer, styles.heightInput]}>
          <TextInput
            placeholder="Type here..."
            placeholderTextColor={'#D2D2D2'}
            style={styles.textInput}
            value={reviewData.reviewMessage}
            onChangeText={text => handleInputChange('reviewMessage', text)}
          />
        </View>
      </Animated.View>

      <Animated.View style={[{transform: [{scale: buttonAnimatedValue}]}]}>
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={handlePress}
          activeOpacity={1}>
          <Text style={styles.btext1}>SUBMIT</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default Reviewform;
