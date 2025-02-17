import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  TextInput,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import styles from './styles';

import {colors} from '../../../Component/colors';
import {
  clearRemeiesDetail1,
  CourceDetailApi,
  CourceLis,
} from '../../../Redux/Slice/HomeSlice';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../../Component/Loader';
import {useIsFocused} from '@react-navigation/native';
import Imagepath from '../../../Component/Imagepath';
import {widthPrecent} from '../../../Component/ResponsiveScreen/responsive';
import AsyncStorage from '@react-native-async-storage/async-storage';
import style from '../HomeScreen/style';
import {fetchCollection} from '../../../Redux/Slice/collectionSlice';
import {fetchProduct, InitProduct} from '../../../Redux/Slice/productSlice';
import {getProductMetafieldsApiCall} from '../../../Redux/Api';

const OtherCourses = ({navigation}) => {
  const [isLiveCourse, setIsLiveCourse] = useState(true);
  const scrollViewRef = useRef(null);
  const [userType, setUserType] = useState('');
  const RemediesCategor1 = useSelector(state => state.collection?.courseData);
  const placeholderText = 'Search';
  const [displayedText, setDisplayedText] = useState('');
  const [countdata, setCountdata] = useState(0);
  const cartTotalQuantity = useSelector(
    state => state?.cart?.cartTotalQuantity,
  );
  const focus = useIsFocused();
  const dispatch = useDispatch();
  const CouseDetail1 = async (item, id) => {
    dispatch(clearRemeiesDetail1());

    if (Object.keys(item).length == 0) {
    } else {
      dispatch(InitProduct());
      dispatch(fetchProduct(id));
    }
    const data = await getProductMetafieldsApiCall(id);
    console.log('datata get by meta feild', id);
    navigation.navigate('CourseDetail', {coursetype: isLiveCourse});
    //  navigation.navigate('ProductDetail', {data: item});
    // await dispatch(
    //   CourceDetailApi({
    //     url: 'fetch-courses-details',
    //     course_id: item?.id,
    //     navigation,
    //     isLiveCourse,
    //   }),
    // );
  };

  useEffect(() => {
    let currentIndex = 0;

    const startAnimation = () => {
      const intervalId = setInterval(() => {
        if (currentIndex < placeholderText.length) {
          setDisplayedText(placeholderText.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          currentIndex = 0;
          setDisplayedText('');
        }
      }, 450);

      return intervalId;
    };

    const intervalId = startAnimation();

    return () => clearInterval(intervalId);
  }, [placeholderText]);

  useEffect(() => {
    apicall();
    getUserType();
  }, []);

  const getUserType = async () => {
    const userStatus = await AsyncStorage.getItem('user_data');
    const userData = userStatus ? JSON.parse(userStatus) : null;
    const userType = userData?.user_type;
    setUserType(userType);
  };

  const handleScroll = async event => {
    // const {layoutMeasurement, contentOffset, contentSize} = event.nativeEvent;
    // if (layoutMeasurement.height + contentOffset.y >= contentSize.height - 20) {
      // {isLiveCourse?
      //   setCountdata(countdata+10);
      //   await dispatch(fetchCollection( 'gid://shopify/Collection/488102920499',countdata)):

      // }
      if (isLiveCourse) {
        setCountdata(countdata + 10);
        await dispatch(
          fetchCollection('gid://shopify/Collection/488102920499', countdata),
        );
      } else {
        setCountdata(countdata + 10);
        await dispatch(
          fetchCollection('gid://shopify/Collection/488102953267', countdata),
        );
      }
    // }
  };

  const apicall = async () => {
    await dispatch(
      fetchCollection('gid://shopify/Collection/488102920499', countdata),
    );

    // await dispatch(CourceLis({url: 'fetch-courses', slug: 'live'}));
  };
  const LiveCourseData = [
    {id: 1, image: require('../../../assets/otherApp/courseCard1.png')},
    {id: 2, image: require('../../../assets/otherApp/courseCard1.png')},
    {id: 3, image: require('../../../assets/otherApp/courseCard1.png')},
    {id: 4, image: require('../../../assets/otherApp/courseCard1.png')},
  ];
  const RecordedCourseData = [
    {id: 1, image: require('../../../assets/otherApp/courseCard2.png')},
    {id: 2, image: require('../../../assets/otherApp/courseCard2.png')},
    {id: 3, image: require('../../../assets/otherApp/courseCard2.png')},
    {id: 4, image: require('../../../assets/otherApp/courseCard2.png')},
  ];

  const [imageHeights, setImageHeights] = useState({}); // Store dynamic heights

  // const IMAGE_WIDTH = width * 0.9;

  const handleImageLoad = (event, id) => {
    const {width: imgWidth, height: imgHeight} = event.nativeEvent.source;
    const calculatedHeight = (widthPrecent(45) * imgHeight) / imgWidth;
    setImageHeights(prev => ({...prev, [id]: calculatedHeight}));
  };

  const extractFirstItem = htmlString => {
    // 1. Sabhi HTML tags remove karne ke liye regex
    const plainText = htmlString.replace(/<[^>]+>/g, ' ');

    // 2. Pehli line ya pehli list item extract karna
    const firstItem = plainText
      ?.split('\n')
      .filter(line => line?.trim() !== '')[0];

    return firstItem?.trim();
  };

  const renderCard = ({item}) => {
    return (
      <View style={styles.card}>
        <TouchableOpacity
          onPress={() => CouseDetail1(item, item?.node?.id)}
          style={{flex: 1}}>
          <Image
            source={
              item?.node?.variants?.edges?.[0]?.node?.image?.src
                ? {uri: `${item?.node?.variants?.edges?.[0]?.node?.image?.src}`}
                : require('../../../assets/image/Remedies/Image-not.png')
            }
            width={widthPrecent(45)}
            style={[
              styles.cardImg,
              {
                height:
                  imageHeights[item?.node?.id] ||
                  widthPrecent(isLiveCourse ? 45 : 25),
              },
            ]}
            onLoad={e => handleImageLoad(e, item?.node?.id)}
            resizeMode="cover"
          />
          <View style={styles.cardInfo}>
            {!isLiveCourse ? null : (
              <Text style={styles.DateText}>{item?.start_date}</Text>
            )}
            <Text style={styles.titleText}>
              {' '}
              {item?.node?.title
                ? item?.node?.title.length > 20
                  ? `${item?.node?.title.substring(0, 20)}...`
                  : item?.node.title
                : ' '}
            </Text>
            <Text style={[styles.regularText, styles.shortDescription]}>
              {extractFirstItem(item?.node?.descriptionHtml)?.length > 45
                ? `${extractFirstItem(item?.node?.descriptionHtml).substring(
                    0,
                    45,
                  )}...`
                : extractFirstItem(item?.node?.descriptionHtml) || ''}
            </Text>

            <View style={{flexDirection: 'row', gap: 10}}>
              <Text style={[styles.price]}>
                {`₹ ${item?.node?.variants?.edges?.[0].node?.price.amount}`}
              </Text>
              {item?.node?.variants?.edges?.[0].node?.compareAtPrice ? (
                <Text
                  style={[
                    styles.price,
                    {textDecorationLine: 'line-through', color: 'gray'},
                  ]}>
                  ₹{' '}
                  {
                    item?.node?.variants?.edges?.[0].node?.compareAtPrice
                      ?.amount
                  }
                </Text>
              ) : null}
            </View>

            <TouchableOpacity
              onPress={() => CouseDetail1(item, item?.node?.id)}>
              <Text style={styles.cardBtn}>View Details</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
          <Image source={require('../../../assets/image/Drawer.png')} />
        </TouchableOpacity>
        <Image source={require('../../../assets/image/header.png')} />
        <TouchableOpacity
          onPress={() => navigation.navigate('Home', {screen: 'MyCart'})}
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
          style={styles.bagIcon}>
          {cartTotalQuantity > 0 && (
            <View style={styles.itemCount}>
              <Text style={styles.countText}>{cartTotalQuantity}</Text>
            </View>
          )}
          <Image source={require('../../../assets/image/small_bag.png')} />
        </TouchableOpacity>
      </View>
      {/*  {isLoading ? <Loader /> : null} */}
        <View style={[styles.scroll]}>
      {/* <ScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={400}
        contentContainerStyle={[styles.scroll, {flexGrow: 1}]}> */}
        <View style={styles.searchContainer}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
              <Image source={require('../../../assets/image/SearchIcon.png')} />
            </TouchableOpacity>

            <TextInput
              style={styles.searchInput}
              placeholder={displayedText}
              placeholderTextColor={colors.searchBarTextColor}
            />
          </View>
          <TouchableOpacity
            style={styles.filterBtn}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
            <Image source={require('../../../assets/image/Vector.png')} />
          </TouchableOpacity>
        </View>

        <View style={styles.switchBtnContainer}>
          <TouchableOpacity
            style={[styles.switchBtn, isLiveCourse ? styles.activeBtn : null]}
            disabled={isLiveCourse}
            onPress={async () => {
              setIsLiveCourse(true);
              await dispatch(
                fetchCollection(
                  'gid://shopify/Collection/488102920499',
                  countdata,
                ),
              );
              // await dispatch(CourceLis({url: 'fetch-courses', slug: 'live'}));
            }}>
            <Text
              style={[
                styles.switchText,
                isLiveCourse ? {color: '#fff'} : null,
              ]}>
              Live Course
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.switchBtn, !isLiveCourse ? styles.activeBtn : null]}
            disabled={!isLiveCourse}
            onPress={async () => {
              setIsLiveCourse(false);
              await dispatch(
                fetchCollection(
                  'gid://shopify/Collection/488102953267',
                  countdata,
                ),
              );
              // await dispatch(
              //   CourceLis({url: 'fetch-courses', slug: 'recorded'}),
              // );
            }}>
            <Text
              style={[
                styles.switchText,
                !isLiveCourse ? {color: '#fff'} : null,
              ]}>
              Recorded Courses
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          contentContainerStyle={styles.cardContainer}
          data={RemediesCategor1 ? RemediesCategor1 : []}
          renderItem={renderCard}
          scrollEnabled={false}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          nestedScrollEnabled={true}
          onEndReachedThreshold={0.5}
          onEndReached={() => handleScroll()}
          //  style={{ flex: 1 }} 
          // numColumns={2}
        />
      {/* </ScrollView> */}
      </View>
    </View>
  );
};

export default OtherCourses;
