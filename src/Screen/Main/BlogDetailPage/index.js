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
import {useNavigation} from '@react-navigation/native';
import DrawerIcon from '../../../assets/image/Drawer.svg';
import BagIcon from '../../../assets/image/bagIcon.svg';
import ShareIcon from '../../../assets/image/share.svg';
import FbIcon from '../../../assets/image/fbIcon.svg';
import InstaIcon from '../../../assets/image/instaIcon.svg';
import CopyIcon from '../../../assets/image/copyIcon.svg';
import styles from './styles';

import {useDispatch, useSelector} from 'react-redux';

import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../../Component/ResponsiveScreen/responsive';

const BlogDetails = ({route}) => {
  const item = route.params.item;
  const navigation = useNavigation();
  const [reviewData, setReviewData] = useState({
    reviewTitle: '',
    reviewMessage: '',
    ratingStar: '',
  });
  const cartTotalQuantity = useSelector(
    state => state?.cart?.cartTotalQuantity,
  );
  const handleInputChange = (name, value) => {
    setReviewData({...reviewData, [name]: value});
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

  const buttonAnimatedValue = useRef(new Animated.Value(1)).current;

  const formatDate = dateString => {
    const date = new Date(dateString);
    const options = {year: 'numeric', month: 'long', day: 'numeric'};
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerview}>
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
            <DrawerIcon />
          </TouchableOpacity>
          <Image
            style={{marginLeft: 15}}
            source={require('../../../assets/image/header.png')}
          />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home', {screen: 'MyCart'})}
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
          style={styles.bagBtn}>
          {cartTotalQuantity > 0 && (
            <View style={styles.itemCount}>
              <Text style={styles.countText}>{cartTotalQuantity}</Text>
            </View>
          )}
          <BagIcon width={wp(5)} height={wp(5)} style={styles.bagBtn} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.viewinner1}>
          <View style={styles.viewinner}>
            <TouchableOpacity style={styles.blogCard}>
              <Image
                source={
                  item?.node?.image?.url
                    ? {uri: item?.node?.image?.url}
                    : require('../../../assets/otherApp/demo3.png')
                }
                style={{
                  borderRadius: 10,
                  width: '100%',
                  height: hp(27),
                }}
              />
              <View style={styles.cardInfo}>
                {item?.node?.publishedAt ? (
                  <Text style={styles.DateText}>
                    {formatDate(item?.node?.publishedAt)}
                  </Text>
                ) : null}
                <Text style={styles.blogCardHeadText}>
                  {item?.node?.handle}
                </Text>

                <Text style={styles.blogCardContantText}>
                  {item?.node?.content}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.shareview}>
            <View style={styles.rowSection}>
              <TouchableOpacity
                style={styles.shareIcon}
                onPress={() => share()}>
               
                 <ShareIcon width={wp(4)} height={wp(4)}/>
              </TouchableOpacity>

              <Text style={[styles.cont, {marginTop: 0}]}>{'Share it :'}</Text>

              <TouchableOpacity
                onPress={() => openApp('fb://profile', 'https://facebook.com')}>
                <FbIcon width={wp(4)} height={wp(4)} />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  openApp('instagram://app', 'https://instagram.com')
                }>
                 <InstaIcon width={wp(4)} height={wp(4)} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => copyToClipboard()}>
                <CopyIcon width={wp(4)} height={wp(4)} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
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

          <Text style={styles.lableText}>Write a Review</Text>
          <Animated.View
            style={[{transform: [{translateX: shakeAnimation.ratingStar}]}]}>
            <View style={[styles.textInputContainer, styles.heightInput]}>
              <TextInput
                placeholder="Type here..."
                placeholderTextColor={'#D2D2D2'}
                style={styles.textInput}
                value={reviewData.ratingStar}
                onChangeText={text => handleInputChange('ratingStar', text)}
              />
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
              // onPress={handlePress}
              activeOpacity={1}>
              <Text style={styles.btext1}>SUBMIT</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
        {/* <LinearGradient
          colors={['#52B0E8', '#FF9770']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.formContainer}>
          <Text style={[styles.extraBoldText, {marginBottom: 20}]}>
            Start Learning From World’s Best Vedic Science Expert
          </Text>

          <View style={styles.textInputContainer}>
            <TextInput
              placeholder="Enter Email Address"
              placeholderTextColor={'#7B93AF'}
              style={styles.textInput}
              // value={formData.email}
              // onChangeText={text => handleInputChange('email', text)}
            />
          </View>

          <TouchableOpacity onPress={() => handleSubmit()}>
            <Text style={[styles.cardBtn, styles.submitBtn]}>
              Subscribe Now
            </Text>
          </TouchableOpacity>
        </LinearGradient> */}
      </ScrollView>
    </View>
  );
};

export default BlogDetails;
