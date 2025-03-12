import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import styles from './styles';
import {colors} from '../../../Component/colors';
import {useDispatch, useSelector} from 'react-redux';
import {widthPrecent as wp} from '../../../Component/ResponsiveScreen/responsive';
import DrawerIcon from '../../../assets/image/Drawer.svg';
import BagIcon from '../../../assets/image/bagIcon.svg';
import SearchIcon from '../../../assets/image/searchIcon.svg';
import FilterIcon from '../../../assets/image/filterIcon.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {fetchCollection} from '../../../Redux/Slice/collectionSlice';

const OtherCourses = ({navigation}) => {
  const [isLiveCourse, setIsLiveCourse] = useState(true);
  const [userType, setUserType] = useState('');
  const RemediesCategor1 = useSelector(state => state.collection?.courseData);
  const placeholderText = 'Search';
  const [displayedText, setDisplayedText] = useState('');
   const [displayedText1, setDisplayedText1] = useState('');
  const [countdata, setCountdata] = useState(0);
  const cartTotalQuantity = useSelector(
    state => state?.cart?.cartTotalQuantity,
  );
  const dispatch = useDispatch();
  const CouseDetail1 = async (item, id) => {
    navigation.navigate('CourseDetail', {coursetype: isLiveCourse, itemId: id});
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
  };

  const apicall = async () => {
    await dispatch(
      fetchCollection('gid://shopify/Collection/488102920499', countdata),
    );
  };

  const [imageHeights, setImageHeights] = useState({});

  const handleImageLoad = (event, id) => {
    const {width: imgWidth, height: imgHeight} = event.nativeEvent.source;
    const calculatedHeight = (wp(45) * imgHeight) / imgWidth;
    setImageHeights(prev => ({...prev, [id]: calculatedHeight}));
  };

  const extractFirstItem = htmlString => {
    const plainText = htmlString.replace(/<[^>]+>/g, ' ');

    const firstItem = plainText
      ?.split('\n')
      .filter(line => line?.trim() !== '')[0];

    return firstItem?.trim();
  };

  const CousrseDate = dateString => {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    const date = new Date(dateString); // Convert string to Date object
    const day = date.getDate().toString().padStart(2, '0'); // Ensure two-digit day
    const month = months[date.getMonth()]; // Get short month name
    const year = date.getFullYear(); // Get full year

    return `${day} ${month} ${year}`;
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
            width={wp(45)}
            style={[
              styles.cardImg,
              {
                height:
                  imageHeights[item?.node?.id] || wp(isLiveCourse ? 45 : 25),
              },
            ]}
            onLoad={e => handleImageLoad(e, item?.node?.id)}
            resizeMode="cover"
          />

          <View style={styles.cardInfo}>
          {!isLiveCourse || !item?.node?.date?.value || isNaN(new Date(item?.node?.date?.value).getTime()) ? null : (
  <Text style={styles.DateText}>
    {CousrseDate(item?.node?.date?.value)}
  </Text>
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
          <DrawerIcon />
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
          <BagIcon width={wp(5)} height={wp(5)} style={styles.bagBtn} />
        </TouchableOpacity>
      </View>

      <View style={[styles.scroll]}>
        <View style={styles.searchContainer}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {/* <TouchableOpacity
              hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
              <SearchIcon width={wp(5)} height={wp(5)} />
            </TouchableOpacity>

            <TextInput
              style={styles.searchInput}
              placeholder={displayedText}
              placeholderTextColor={colors.searchBarTextColor}
            /> */}


                  <TouchableOpacity
                                    onPress={() => navigation.navigate('Searchlist')}
                                    hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                                    style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <TouchableOpacity style={{marginBottom: wp(1)}}>
                                      {/* <Image source={require('../../../assets/image/SearchIcon.png')} /> */}
                                      <SearchIcon width={wp(5)} height={wp(5)} />
                                    </TouchableOpacity>
                                    <TextInput
                                      style={styles.searchInput}
                                      value={displayedText1}
                                      onChangeText={val => setDisplayedText1(val)}
                                      placeholder={displayedText}
                                      editable={false}
                                      placeholderTextColor={colors.searchBarTextColor}
                                    />
                                  </TouchableOpacity>
          </View>
          {/* <TouchableOpacity
            style={styles.filterBtn}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
            <FilterIcon width={wp(5)} height={wp(5)} />
          </TouchableOpacity> */}
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
        />
      </View>
    </View>
  );
};

export default OtherCourses;
