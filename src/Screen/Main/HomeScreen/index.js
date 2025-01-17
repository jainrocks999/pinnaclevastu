import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ImageBackground,
  BackHandler,
  ToastAndroid,
  Animated,
} from 'react-native';
import styles from './style';
import {colors} from '../../../Component/colors';
import BannerSlider from '../../../Component/Banner';

import {Rating} from 'react-native-ratings';
import {widthPrecent as wp} from '../../../Component/ResponsiveScreen/responsive';
import ImageSlider from '../../../Component/myBanner';
import {useDispatch, useSelector} from 'react-redux';
import {
  Banner,
  clearRemedis,
  CourceDetailApi,
} from '../../../Redux/Slice/HomeSlice';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Loader from '../../../Component/Loader';
import Imagepath from '../../../Component/Imagepath';
import LinearGradient from 'react-native-linear-gradient';
import AutoHeightImage from 'react-native-auto-height-image';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getAddress} from '../../../Redux/Slice/Addresslice';
import {
  addToCartApi,
  clearLocalCartData,
  getCartDataApi,
} from '../../../Redux/Slice/CartSlice';
import {getUserDetailApi} from '../../../Redux/Slice/Authslice';
import {consultationDetail1} from '../../../Redux/Slice/ConsultancySlice';

let backPress = 0;
const HomeScreen = () => {
  const flatListRef = useRef(null);
  const navigation = useNavigation();
  const [scaleAnim] = useState(new Animated.Value(1));
  const [scaleAnims, setScaleAnims] = useState({});
  const [userType, setUserType] = useState('');
  const [isLiveCourse, setIsLiveCourse] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const dispatch = useDispatch();
  const placeholderText = 'Search';
  const [displayedText, setDisplayedText] = useState('');
  const [displayedText1, setDisplayedText1] = useState('');

  const userDetail = useSelector(state => state?.Auth?.userData);

  const Homebanner = useSelector(state => state.home?.HomeBanner?.data);

  const isLoading = useSelector(state => state.home?.loading);

  const cartDataList = useSelector(state => state?.cart?.CartData);
  const localCartDataList = useSelector(
    state => state?.cart?.localStorageCartData,
  );
  const cartTotalQuantity = useSelector(
    state => state?.cart?.cartTotalQuantity,
  );

  const newArray = [];
  (Homebanner?.home_slider?.[0]?.slider_items || []).forEach(item => {
    const updatedItem = {
      ...item,
      image: `${Imagepath.Path}${item.image}`,
    };

    newArray.push(updatedItem);
  });

  const imagesilder11 = [];
  (Homebanner?.offer_slider?.[0]?.slider_items || []).forEach(item => {
    const updatedItem = {
      ...item,
      image: `${Imagepath.Path}${item.image}`,
    };

    imagesilder11.push(updatedItem);
  });

  const CouseDetail1 = async item => {
    await dispatch(
      CourceDetailApi({
        url: 'fetch-courses-details',
        course_id: item?.id,
        navigation,
      }),
    );
  };
  const focus = useIsFocused();

  useEffect(() => {
    if (focus) {
      apicall();
      getUserType();
    }
  }, [focus]);

  const apicall = async () => {
    await dispatch(Banner({url: 'home-slider'}));
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

  const calculateAverageRating = data => {
    if (!data.length) return 0;

    const totalStars = data.reduce((sum, item) => {
      return sum + Number(item?.star);
    }, 0);

    const averageStars = totalStars / data?.length;

    return averageStars;
  };

  const getUserType = async () => {
    try {
      const userStatus = await AsyncStorage.getItem('user_data');
      const userData = userStatus ? JSON.parse(userStatus) : null;
      const userType = userData?.user_type;
      setUserType(userType);
      if (userType) {
        await dispatch(
          getAddress({
            user_id: userData.user_id,
            token: userData.token,

            url: 'fetch-customer-address',
            // navigation,
          }),
        );
        // console.log(cartDataList.length)
        // console.log(localCartDataList.length)
        if (cartDataList.length === 0) {
          await dispatch(
            getCartDataApi({
              token: userData.token,
              url: `cart?user_id=${userData.user_id}`,
            }),
          );
        }
        if (localCartDataList.length > 0) {
          for (const item of localCartDataList) {
            await dispatch(
              addToCartApi({
                 user_id: userData.user_id,
                itemId: item.id,
                qty: item.qty,
                user_type: userData.user_type,
                token: userData?.token,
                url: 'add-to-cart',
              }),
            );
          }
          dispatch(clearLocalCartData());
          await dispatch(
            getCartDataApi({
              token: userData.token,
              url: `cart?user_id=${userData.user_id}`,
            }),
          );
        }
        if (userDetail.length === 0) {
          await dispatch(
            getUserDetailApi({
              token: userData.token,
              url: `profile-list?user_id=${userData.user_id}`,
            }),
          );
        }
      }
    } catch (error) {
      console.error('Error syncing cart and address data:', error);
    }
  };

  const handleImageChange = index => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({index, animated: true});
    }
    setCurrentIndex(index);
  };

  const handleItemClick = (index,itemId) => {
    const newScaleAnims = {...scaleAnims};

    if (!newScaleAnims[index]) {
      newScaleAnims[index] = new Animated.Value(1);
    }

    setScaleAnims(newScaleAnims);

    // Trigger the animation sequence for the clicked item
    Animated.sequence([
      Animated.timing(newScaleAnims[index], {
        toValue: 0.96, // Shrink to 30% of the original size
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(newScaleAnims[index], {
        toValue: 1, // Return to original size
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start(() => {
      navigation.navigate('Home1', {
        screen: 'Consultancy',
        params: {
          itemId: itemId,
        },
      });
    });
  };

  const renderItem = ({item, index}) => {
    let backgroundColor;
    if (item.services_name === 'Residential Vastu') {
      backgroundColor = colors.card4;
    } else if (item.services_name === 'Rudraksha') {
      backgroundColor = colors.card;
    } else if (item.services_name === 'Commercial Vastu') {
      backgroundColor = colors.card5;
    } else if (item.services_name === 'Gemstone') {
      backgroundColor = colors.card2;
    } else if (item.services_name === 'Numerology Report') {
      backgroundColor = '#F9E4E8';
    } else {
      backgroundColor = colors.card3;
    }

    const itemScaleAnim = scaleAnims[index] || new Animated.Value(1);
    return (
      <Animated.View
        style={[
          styles.cardContainer,
          {
            transform: [{scale: itemScaleAnim}], // Apply scale animation to the view
          },
        ]}>
        <TouchableOpacity
          style={[styles.cardContainer, {backgroundColor: item?.color_code}]}
          onPress={() => handleItemClick(index, item.id)}>
          {/* {console.log(item,"sadmlkasdlas")} */}
          <Image
            source={{uri: `${Imagepath.Path}${item?.logo}`}}
            style={styles.itemImg}
          />
          <Text style={styles.text}>{item.services_name}</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const renderItem1 = ({item, index}) => {
    const itemScaleAnim = scaleAnims[index] || new Animated.Value(1);
    return (
      <Animated.View
        style={[
          styles.smallCardContainer,
          {
            transform: [{scale: itemScaleAnim}], // Apply scale animation to the view
          },
        ]}>
        <TouchableOpacity
          style={[styles.smallCardContainer]}
          onPress={() => handleItemClick(index)}>
          <Image
            source={{uri: `${Imagepath.Path}${item?.logo}`}}
            style={[styles.itemImg, {resizeMode: 'contain'}]}
          />
          <Text style={styles.smallCardtext}>{item.services_name}</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };
  const renderItem2 = ({item}) => {
    return (
      <TouchableOpacity
        onPress={
          () => {
            dispatch(clearRemedis());
            navigation.navigate('Home1', {
              screen: 'Remedie12',
              params: {
                screen: 'ProductList',
                params: {
                  item: item,
                  Id: true,
                },
              },
            });
          }
          // navigation.navigate('Home1', {
          //   screen: 'Remedie12',
          //   params: {screen: 'ProductList', params: {item: item, Id: true}},
          // })
        }
        style={[styles.cardContainer1]}>
        <ImageBackground
          resizeMode="contain"
          source={{uri: `${Imagepath.Path}${item.image}`}}
          style={{height: '100%', width: '100%'}}>
          <LinearGradient
            colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.7)']}
            style={{
              position: 'absolute',
              height: '100%',
              width: '100%',
            }}
          />
          <Text style={styles.text1}>{item.name}</Text>
        </ImageBackground>
        {/* </LinearGradient> */}
      </TouchableOpacity>
    );
  };

  const handlePress = (item, index) => {
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
    ]).start(async () => {
      await dispatch(
        consultationDetail1({
          url: 'fetch-franchise-details',
          franchise_id: item.id,
          navigation,
        }),
      );
    });
  };

  const renderItem3 = ({item, index}) => {
    
    const itemScaleAnim = scaleAnims[index] || new Animated.Value(1);
    return (
      <Animated.View
        style={[
          // styles.cardContainer2,
          {
            transform: [{scale: itemScaleAnim}], // Apply scale animation to the view
          },
        ]}>
        <TouchableOpacity
          style={[styles.cardContainer2]}
          onPress={() => handlePress(item, index)}>
          <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
            <Image
              source={
                item.logo
                  ? {uri: `${Imagepath.Path}${item?.logo}`}
                  : require('../../../assets/image/Remedies/Image-not.png')
              }
              style={styles.cardImage}
            />
            <View style={styles.infoSection}>
              <Text style={styles.third}>{item?.franchise_name}</Text>
              <Text style={styles.third1}>{item?.specializations}</Text>
              <Text style={[styles.third2]}>
                Services :{' '}
                {item?.franchise_services
                  ?.map(service => service.services_name) // Extract all services_name
                  .join(', ')}
              </Text>
              {/* <Text style={styles.third2}>{"item?.franchise_services"}</Text> */}
              <View style={styles.starContainer}>
                <Rating
                  type="custom"
                  tintColor={colors.white}
                  ratingCount={5}
                  imageSize={16}
                  startingValue={calculateAverageRating(item?.reviews)}
                  ratingColor="#52B1E9"
                  readonly
                  ratingBackgroundColor={colors.lightGrey} // Unfilled star color
                />
                <Text style={[styles.third2]}>
                  {item?.reviews.length} reviews
                </Text>
              </View>
            </View>

            <Image
              source={require('../../../assets/otherApp/arrowrc.png')}
              style={styles.arrowNext}
            />
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const renderItem4 = ({item}) => {
    return (
      <View style={{flexDirection: 'row'}}>
        <View style={[styles.itemContainer]}>
          <Image
            source={item.image}
            style={{width: '35%', resizeMode: 'contain'}}
          />
          <Text style={styles.bottomCardtext}>{item.name}</Text>
        </View>
        {item.id !== '3' ? <View style={styles.viewLine} /> : null}
      </View>
    );
  };

  const renderCard = ({item}) => {
    return (
      <TouchableOpacity onPress={() => CouseDetail1(item)} style={styles.card}>
        {/* <Image
          source={
            item.image == null
              ? require('../../../assets/otherApp/courseCard1.png')
              : {uri: `${Imagepath.Path}${item?.image}`}
          }
          style={styles.cardImg}
        /> */}
        {/* {changes} */}
        <AutoHeightImage
          source={
            item.image == null
              ? require('../../../assets/otherApp/courseCard1.png')
              : {uri: `${Imagepath.Path}${item?.image}`}
          }
          width={wp(65)}
          style={styles.cardImg}
        />
        <View style={styles.cardInfo}>
          {isLiveCourse ? (
            <Text style={styles.DateText}>{item?.start_date}</Text>
          ) : null}
          <Text style={styles.titleText}>{item?.title}</Text>

          <Text style={styles.regularText}>
            {item?.short_description
              ? item?.short_description.length > 45
                ? `${item?.short_description.substring(0, 45)}...`
                : item?.short_description
              : ''}
          </Text>
          {/* <Text style={styles.price}>{`₹ ${item?.price}`}</Text> */}

          <View style={{flexDirection: 'row', gap: 10}}>
            <Text style={[styles.price]}>
              {`₹ ${
                userType === 'customers' && item?.sale_price
                  ? item?.sale_price
                  : userType === 'student' && item?.student_price
                  ? item?.student_price
                  : userType === 'franchise' && item?.franchise_price
                  ? item?.franchise_price
                  : item?.price
              }`}
            </Text>
            {userType &&
            (item?.sale_price < item?.price ||
              item?.student_price < item?.price ||
              item?.franchise_price < item?.price) &&
            (item?.sale_price ||
              item?.student_price ||
              item?.franchise_price) ? (
              <Text
                style={[
                  styles.price,
                  {textDecorationLine: 'line-through', color: 'gray'},
                ]}>
                ₹ {item?.price}
              </Text>
            ) : null}
          </View>

          {/* <TouchableOpacity onPress={() => CouseDetail1(item)}> */}
          <Text style={styles.cardBtn}>View Details</Text>
          {/* </TouchableOpacity> */}
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButtonClick,
    );
    return () => backHandler.remove();
  }, []);

  const handleBackButtonClick = () => {
    if (navigation.isFocused()) {
      if (backPress > 0) {
        BackHandler.exitApp();
        backPress = 0;
      } else {
        backPress++;
        ToastAndroid.show('Press again to exit app', ToastAndroid.SHORT);
        setTimeout(() => {
          backPress = 0;
        }, 2000);
        BackHandler.removeEventListener('hardwareBackPress');
      }
      return true;
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
          <Image source={require('../../../assets/image/Drawer.png')} />
        </TouchableOpacity>
        <Image source={require('../../../assets/image/header.png')} />
        <TouchableOpacity
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
          onPress={() => navigation.navigate('Home', {screen: 'MyCart'})}
          style={styles.bagIcon}>
          {cartTotalQuantity > 0 && (
            <View style={styles.itemCount}>
              <Text style={styles.countText}>{cartTotalQuantity}</Text>
            </View>
          )}

          <Image source={require('../../../assets/image/Group.png')} />
        </TouchableOpacity>
      </View>
      {isLoading ? <Loader /> : null}
      <ScrollView contentContainerStyle={styles.servicesContainer}>
        <View style={styles.searchContainer}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
              <Image source={require('../../../assets/image/SearchIcon.png')} />
            </TouchableOpacity>
            <TextInput
              style={styles.searchInput}
              value={displayedText1}
              onChangeText={val => setDisplayedText1(val)}
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

        <View style={styles.welcomeCard}>
          {newArray?.length != 0 ? (
            <BannerSlider
              onPress={item => {}}
              height1={wp(40)}
              data={newArray ? newArray : []}
              local={true}
            />
          ) : null}
        </View>

        <View style={styles.contain}>
          <Text style={styles.service}>Our Services</Text>
        </View>
        <FlatList
          data={Homebanner?.services ? Homebanner?.services : []}
          renderItem={renderItem}
          scrollEnabled={false}
          keyExtractor={item => item?.id}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
        {imagesilder11.length != 0 ? (
          <ImageSlider
            data={imagesilder11}
            onPress={
              (item, index) => console.log('hh', index, item)

              // alert('Item Pressed', `Item: ${JSON.stringify(item)}, Index: ${index}`)

              // navigation.navigate('UserProfile')
            }
          />
        ) : null}

        <View style={[styles.contain, {marginTop: wp(2)}]}>
          <Text style={styles.service}>Premium Services</Text>
        </View>
        <FlatList
          data={
            Homebanner?.premium_services ? Homebanner?.premium_services : []
          }
          renderItem={renderItem1}
          keyExtractor={item => item?.id}
          numColumns={3}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
        <View style={[styles.contain, {marginTop: 10}]}>
          <Text style={styles.service}>Courses</Text>
        </View>

        <View style={styles.switchBtnContainer}>
          <TouchableOpacity
            style={[styles.switchBtn, isLiveCourse ? styles.activeBtn : null]}
            disabled={isLiveCourse}
            onPress={async () => {
              setIsLiveCourse(true);
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
            disabled={!isLiveCourse}
            style={[styles.switchBtn, !isLiveCourse ? styles.activeBtn : null]}
            onPress={async () => {
              setIsLiveCourse(false);
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

        <View style={{paddingHorizontal: 10, marginVertical: 10}}>
          <FlatList
            ref={flatListRef}
            contentContainerStyle={styles.cardContainer0}
            data={
              isLiveCourse
                ? Homebanner?.live_courses?.slice(0, 4) || []
                : Homebanner?.recoded_courses?.slice(0, 4) || []
            }
            renderItem={renderCard}
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            // onScroll={e => {
            //   const screenWidth = Dimensions.get('window').width*0.65;
            //   const slide = Math.ceil(
            //     e.nativeEvent.contentOffset.x / wp(65)+20,
            //   );
            //   setCurrentIndex(slide);
            // }}
            onMomentumScrollEnd={e => {
              const contentOffsetX = e.nativeEvent.contentOffset.x;
              const currentIndex = Math.round(contentOffsetX / wp(65)); // Calculate index based on item width
              setCurrentIndex(currentIndex); // Update the current index state
            }}
          />

          <View style={styles.dotContainer}>
            {(isLiveCourse
              ? Homebanner?.live_courses?.slice(0, 4) || []
              : Homebanner?.recoded_courses?.slice(0, 4) || []
            ).map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.dot, currentIndex === index && styles.activeDot]}
                onPress={() => {
                  if (
                    index <
                    (isLiveCourse
                      ? Homebanner?.live_courses?.slice(0, 4) || []
                      : Homebanner?.recoded_courses?.slice(0, 4) || [])
                  ) {
                    handleImageChange(index);
                  }
                }}
              />
            ))}
          </View>
        </View>

        <View style={styles.contain1}>
          <Text style={styles.service}>Remedies</Text>
          <TouchableOpacity
            onPress={() =>
              // navigation.reset({
              //   index: 0,
              //   routes: [{name: 'Home1', params: {screen: 'Remedie12'}}],
              // })
              navigation.navigate('Home1', {
                screen: 'Remedie12',
                params: {screen: 'Remedies'},
              })
            }
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
            <Text style={styles.service1}>VIEW ALL</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={Homebanner?.remedies?.slice(0, 5)}
          renderItem={renderItem2}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 10, marginBottom: wp(8)}}
        />
        <View style={styles.consultationSection}>
          <View style={[styles.contain1, {}]}>
            <Text style={styles.service}>Consultation</Text>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Home1', {
                  screen: 'Consultancy',
                })
              }
              hitSlop={{top: 10, bottom: 10, left: 10, right: 10}} // Touch area increase
            >
              <Text style={styles.service1}>VIEW ALL</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={Homebanner?.franchises}
            // data={data4}
            renderItem={renderItem3}
            keyExtractor={index => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{padding: 10}}
          />
        </View>
        <View style={styles.bottomCardContainer}>
          <FlatList
            data={data5}
            renderItem={renderItem4}
            keyExtractor={item => item.id}
            // numColumns={3}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.bottomCard}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
const data = [
  {id: '1', image: require('../../../assets/image/Group1x.png')},
  {id: '2', image: require('../../../assets/image/Group1x.png')},
  {id: '3', image: require('../../../assets/image/Group1x.png')},
];

const BannerImg = [
  {id: '1', image: require('../../../assets/image/bannerImg1.png')},
  {id: '2', image: require('../../../assets/image/bannerImg2.png')},
  {id: '3', image: require('../../../assets/image/bannerImg3.png')},
];

const data1 = [
  {
    id: '1',
    image: require('../../../assets/image/house.png'),
    name: 'Residential Vastu',
  },
  {
    id: '2',
    image: require('../../../assets/image/house.png'),
    name: 'Commercial Vastu',
  },
  {
    id: '3',
    image: require('../../../assets/image/industry.png'),
    name: 'Insustrial Vastu',
  },
  {
    id: '4',
    image: require('../../../assets/image/numerology.png'),
    name: 'Numerology Report',
  },
  {
    id: '5',
    image: require('../../../assets/image/Layer_x.png'),
    name: 'Gemstone',
  },
  {
    id: '6',
    image: require('../../../assets/image/beads.png'),
    name: 'Rudraksha',
  },
];

const data2 = [
  {
    id: '1',
    image: require('../../../assets/image/numerology.png'),
    name: 'Numerology Report',
  },
  {
    id: '2',
    image: require('../../../assets/image/g2.png'),
    name: 'Vastu Evaluation Report',
  },
  {
    id: '3',
    image: require('../../../assets/image/astro.png'),
    name: 'Astro Vastu Fortune Report',
  },
];
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

const imagesilder1 = [
  {id: '1', image: require('../../../assets/image/bannerImg1.png')},
  {id: '2', image: require('../../../assets/image/bannerImg2.png')},
  {id: '3', image: require('../../../assets/image/bannerImg3.png')},
];

const data5 = [
  {
    id: '1',
    image: require('../../../assets/image/Gro.png'),
    name: 'Private & Confidential',
  },
  {
    id: '2',
    image: require('../../../assets/image/gp1.png'),
    name: 'Verified Vastu Experts',
  },
  {
    id: '3',
    image: require('../../../assets/image/credit-card.png'),
    name: 'Secure Payments',
  },
];

const data4 = [
  {
    id: '1',
    image: require('../../../assets/image/Rectangle.png'),
    name: 'Acharya',
    title: 'Shreni Rajbhandary',
    address: 'Services : Residential Vastu, Industrial Vastu, Gemstone',
    rating: '5 reviews',
  },
  {
    id: '2',
    image: require('../../../assets/image/Rectangle.png'),
    name: '3d-Acharya',
    title: 'Shreni Rajbhandary',
    address: 'Services : Residential Vastu, Industrial Vastu, Gemstone',
    rating: '5 reviews',
  },
  {
    id: '3',
    image: require('../../../assets/image/Rectangle.png'),
    name: '3d-Acharya',
    title: 'Shreni Rajbhandary',
    address: 'Services : Residential Vastu, Industrial Vastu, Gemstone',
    rating: '5 reviews',
  },
];
const data3 = [
  {
    id: '1',
    image: require('../../../assets/image/Remid.png'),
    name: 'Bracelets',
  },
  {
    id: '2',
    image: require('../../../assets/image/Remid.png'),
    name: '3d-Remedies',
  },
  {
    id: '3',
    image: require('../../../assets/image/Remid.png'),
    name: '3d-Remedies',
  },
];

// import React, {useEffect, useRef, useState} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   Image,
//   TouchableOpacity,
//   ScrollView,
//   FlatList,
//   ImageBackground,
//   BackHandler,
//   ToastAndroid,
// } from 'react-native';
// import styles from './style';
// import {colors} from '../../../Component/colors';
// import BannerSlider from '../../../Component/Banner';

// import {Rating} from 'react-native-ratings';
// import {widthPrecent as wp} from '../../../Component/ResponsiveScreen/responsive';
// import ImageSlider from '../../../Component/myBanner';
// import {useDispatch, useSelector} from 'react-redux';
// import {
//   Banner,
//   CourceDetailApi,
//   CourceLis,
//   Remedie,
//   RemediesCategory,
//   Service,
// } from '../../../Redux/Slice/HomeSlice';
// import {useIsFocused, useNavigation} from '@react-navigation/native';
// import Loader from '../../../Component/Loader';
// import Imagepath from '../../../Component/Imagepath';
// import LinearGradient from 'react-native-linear-gradient';
// import AutoHeightImage from 'react-native-auto-height-image';
// let backPress = 0;
// const HomeScreen = () => {
//   const flatListRef = useRef(null);
//   const navigation = useNavigation();
//   const [isLiveCourse, setIsLiveCourse] = useState(true);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const dispatch = useDispatch();
//   const Homebanner = useSelector(state => state.home?.HomeBanner?.data);

//   const isLoading = useSelector(state => state.home?.loading);

//   const Live_cource = useSelector(state => state?.home?.Cource);

//   const newArray = [];
//   (Homebanner?.home_slider?.[0]?.slider_items || []).forEach(item => {
//     const updatedItem = {
//       ...item,
//       image: `${Imagepath.Path}${item.image}`,
//     };

//     newArray.push(updatedItem);
//   });

//   const imagesilder11 = [];
//   (Homebanner?.offer_slider?.[0]?.slider_items || []).forEach(item => {
//     const updatedItem = {
//       ...item,
//       image: `${Imagepath.Path}${item.image}`,
//     };

//     imagesilder11.push(updatedItem);
//   });

//   const CouseDetail1 = async item => {
//     await dispatch(
//       CourceDetailApi({
//         url: 'fetch-courses-details',
//         course_id: item?.id,
//         navigation,
//       }),
//     );
//   };
//   // const focus = useIsFocused();

//   useEffect(() => {
//     // if (focus) {
//       apicall();
//     // }
//   }, []);

//   const apicall = async () => {
//     await dispatch(Banner({url: 'home-slider'}));
//   };
//   const RemediesProductcategory = async item => {
//     await dispatch(
//       RemediesCategory({
//         url: 'remedies-by-product',
//         category_id: item.id,
//         navigation,
//         name: item.name,
//         id: true,
//       }),
//     );
//   };
//   const handleImageChange = index => {
//     if (flatListRef.current) {
//       flatListRef.current.scrollToIndex({index, animated: true});
//     }
//     setCurrentIndex(index);
//   };

//   const renderItem = ({item}) => {
//     let backgroundColor;
//     if (item.services_name === 'Residential Vastu') {
//       backgroundColor = colors.card4;
//     } else if (item.services_name === 'Rudraksha') {
//       backgroundColor = colors.card;
//     } else if (item.services_name === 'Commercial Vastu') {
//       backgroundColor = colors.card5;
//     } else if (item.services_name === 'Gemstone') {
//       backgroundColor = colors.card2;
//     } else if (item.services_name === 'Numerology Report') {
//       backgroundColor = '#F9E4E8';
//     } else {
//       backgroundColor = colors.card3;
//     }

//     return (
//       <TouchableOpacity
//         style={[styles.cardContainer, {backgroundColor: item?.color_code}]}>
//         <Image
//           source={{uri: `${Imagepath.Path}${item?.logo}`}}
//           style={styles.itemImg}
//         />
//         <Text style={styles.text}>{item.services_name}</Text>
//       </TouchableOpacity>
//     );
//   };

//   const renderItem1 = ({item}) => {
//     return (
//       <TouchableOpacity style={[styles.smallCardContainer]}>
//         <Image
//           source={{uri: `${Imagepath.Path}${item?.logo}`}}
//           style={[styles.itemImg, {resizeMode: 'contain'}]}
//         />
//         <Text style={styles.smallCardtext}>{item.services_name}</Text>
//       </TouchableOpacity>
//     );
//   };
//   const renderItem2 = ({item}) => {
//     return (
//       <TouchableOpacity
//         onPress={() => RemediesProductcategory(item)}
//         style={[styles.cardContainer1]}>
//         <ImageBackground
//           resizeMode="contain"
//           source={{uri: `${Imagepath.Path}${item.image}`}}
//           style={{height: '100%', width: '100%'}}>
//           <LinearGradient
//             colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.7)']}
//             style={{
//               position: 'absolute',
//               height: '100%',
//               width: '100%',
//             }}
//           />
//           <Text style={styles.text1}>{item.name}</Text>
//         </ImageBackground>
//         {/* </LinearGradient> */}
//       </TouchableOpacity>
//     );
//   };
//   const renderItem3 = ({item}) => {
//     return (
//       <TouchableOpacity style={[styles.cardContainer2]}>
//         <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
//           <Image source={item.image} style={styles.cardImage} />
//           <View style={styles.infoSection}>
//             <Text style={styles.third}>{item.name}</Text>
//             <Text style={styles.third1}>{item.title}</Text>
//             <Text style={styles.third2}>{item.address}</Text>
//             <View style={styles.starContainer}>
//               <Rating
//                 type="custom"
//                 tintColor={colors.white}
//                 ratingCount={5}
//                 imageSize={16}
//                 startingValue={item.rating}
//                 ratingColor="#52B1E9"
//                 ratingBackgroundColor={colors.lightGrey} // Unfilled star color
//               />
//               <Text style={[styles.third2]}>{item.rating}</Text>
//             </View>
//           </View>

//           <Image
//             source={require('../../../assets/otherApp/arrowrc.png')}
//             style={styles.arrowNext}
//           />
//         </View>
//       </TouchableOpacity>
//     );
//   };
//   const renderItem4 = ({item}) => {
//     return (
//       <View style={{flexDirection: 'row'}}>
//         <TouchableOpacity style={[styles.itemContainer]}>
//           <Image
//             source={item.image}
//             style={{width: '35%', resizeMode: 'contain'}}
//           />
//           <Text style={styles.bottomCardtext}>{item.name}</Text>
//         </TouchableOpacity>
//         {item.id !== '3' ? <View style={styles.viewLine} /> : null}
//       </View>
//     );
//   };

//   const renderCard = ({item}) => {
//     return (
//       <View style={styles.card}>
//         {/* <Image
//           source={
//             item.image == null
//               ? require('../../../assets/otherApp/courseCard1.png')
//               : {uri: `${Imagepath.Path}${item?.image}`}
//           }
//           style={styles.cardImg}
//         /> */}
//         {/* {changes} */}
//         <AutoHeightImage
//           source={
//             item.image == null
//               ? require('../../../assets/otherApp/courseCard1.png')
//               : {uri: `${Imagepath.Path}${item?.image}`}
//           }
//           width={wp(65)}
//           style={styles.cardImg}
//         />
//         <View style={styles.cardInfo}>
//           <Text style={styles.DateText}>{item?.start_date}</Text>
//           <Text style={styles.titleText}>{item?.title}</Text>

//           <Text style={styles.regularText}>
//             {item?.short_description == null
//               ? 'While Vastu Shastra gives us data about our...'
//               : item?.short_description}
//           </Text>
//           <Text style={styles.price}>{`₹ ${item?.price}`}</Text>
//           <TouchableOpacity onPress={() => CouseDetail1(item)}>
//             <Text style={styles.cardBtn}>View Details</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   };

//   useEffect(() => {
//     const backHandler = BackHandler.addEventListener(
//       'hardwareBackPress',
//       handleBackButtonClick,
//     );
//     return () => backHandler.remove();
//   }, []);

//   const handleBackButtonClick = () => {
//     if (navigation.isFocused()) {
//       if (backPress > 0) {
//         BackHandler.exitApp();
//         backPress = 0;
//       } else {
//         backPress++;
//         ToastAndroid.show('Press again to exit app', ToastAndroid.SHORT);
//         setTimeout(() => {
//           backPress = 0;
//         }, 2000);
//         BackHandler.removeEventListener('hardwareBackPress');
//       }
//       return true;
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.openDrawer()}>
//           <Image source={require('../../../assets/image/Drawer.png')} />
//         </TouchableOpacity>
//         <Image source={require('../../../assets/image/header.png')} />
//         <TouchableOpacity
//           onPress={() => navigation.navigate('Home', {screen: 'MyCart'})}
//           style={styles.bagIcon}>
//           <Image source={require('../../../assets/image/Group.png')} />
//         </TouchableOpacity>
//       </View>
//       {isLoading ? <Loader /> : null}
//       <ScrollView contentContainerStyle={styles.servicesContainer}>
//         <View style={styles.searchContainer}>
//           <View style={{flexDirection: 'row', alignItems: 'center'}}>
//             <Image source={require('../../../assets/image/SearchIcon.png')} />
//             <TextInput
//               placeholder="Search..."
//               style={styles.searchInput}
//               placeholderTextColor={colors.searchBarTextColor}
//             />
//           </View>
//           <TouchableOpacity style={styles.filterBtn}>
//             <Image source={require('../../../assets/image/Vector.png')} />
//           </TouchableOpacity>
//         </View>

//         <View style={styles.welcomeCard}>
//           {newArray?.length != 0 ? (
//             <BannerSlider
//               onPress={item => {}}
//               height1={wp(40)}
//               data={newArray ? newArray : []}
//               local={true}
//             />
//           ) : null}
//         </View>

//         <View style={styles.contain}>
//           <Text style={styles.service}>Our Services</Text>
//         </View>
//         <FlatList
//           data={Homebanner?.services ? Homebanner?.services : []}
//           renderItem={renderItem}
//           keyExtractor={item => item.id}
//           numColumns={3}
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={styles.listContainer}
//         />
//         {imagesilder11.length != 0 ? (
//           <ImageSlider
//             data={imagesilder11}
//             onPress={
//               (item, index) => console.log('hh', index, item)

//               // alert('Item Pressed', `Item: ${JSON.stringify(item)}, Index: ${index}`)

//               // navigation.navigate('UserProfile')
//             }
//           />
//         ) : null}

//         <View style={[styles.contain, {marginTop: wp(2)}]}>
//           <Text style={styles.service}>Premium Services</Text>
//         </View>
//         <FlatList
//           data={
//             Homebanner?.premium_services ? Homebanner?.premium_services : []
//           }
//           renderItem={renderItem1}
//           keyExtractor={item => item.id}
//           numColumns={3}
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={styles.listContainer}
//         />
//         <View style={[styles.contain, {marginTop: 10}]}>
//           <Text style={styles.service}>Courses</Text>
//         </View>

//         <View style={styles.switchBtnContainer}>
//           <TouchableOpacity
//             style={[styles.switchBtn, isLiveCourse ? styles.activeBtn : null]}
//             disabled={isLiveCourse}
//             onPress={async () => {
//               setIsLiveCourse(true);
//             }}>
//             <Text
//               style={[
//                 styles.switchText,
//                 isLiveCourse ? {color: '#fff'} : null,
//               ]}>
//               Live Course
//             </Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             disabled={!isLiveCourse}
//             style={[styles.switchBtn, !isLiveCourse ? styles.activeBtn : null]}
//             onPress={async () => {
//               setIsLiveCourse(false);
//             }}>
//             <Text
//               style={[
//                 styles.switchText,
//                 !isLiveCourse ? {color: '#fff'} : null,
//               ]}>
//               Recorded Courses
//             </Text>
//           </TouchableOpacity>
//         </View>

//         <View style={{paddingHorizontal: 10, marginVertical: 10}}>
//           <FlatList
//             ref={flatListRef}
//             contentContainerStyle={styles.cardContainer0}
//             data={
//               isLiveCourse
//                 ? Homebanner?.live_courses?.slice(0, 4) || []
//                 : Homebanner?.recoded_courses?.slice(0, 4) || []
//             }
//             renderItem={renderCard}
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             scrollEventThrottle={16}
//             // onScroll={e => {
//             //   const screenWidth = Dimensions.get('window').width*0.65;
//             //   const slide = Math.ceil(
//             //     e.nativeEvent.contentOffset.x / wp(65)+20,
//             //   );
//             //   setCurrentIndex(slide);
//             // }}
//             onMomentumScrollEnd={e => {
//               const contentOffsetX = e.nativeEvent.contentOffset.x;
//               const currentIndex = Math.round(contentOffsetX / wp(65)); // Calculate index based on item width
//               setCurrentIndex(currentIndex); // Update the current index state
//             }}
//           />

//           <View style={styles.dotContainer}>
//             {(isLiveCourse
//               ? Homebanner?.live_courses?.slice(0, 4) || []
//               : Homebanner?.recoded_courses?.slice(0, 4) || []
//             ).map((item, index) => (
//               <TouchableOpacity
//                 key={index}
//                 style={[styles.dot, currentIndex === index && styles.activeDot]}
//                 onPress={() => {
//                   if (
//                     index <
//                     (isLiveCourse
//                       ? Homebanner?.live_courses?.slice(0, 4) || []
//                       : Homebanner?.recoded_courses?.slice(0, 4) || [])
//                   ) {
//                     handleImageChange(index);
//                   }
//                 }}
//               />
//             ))}
//           </View>
//         </View>

//         <View style={styles.contain1}>
//           <Text style={styles.service}>Remedies</Text>
//           <TouchableOpacity
//             onPress={() =>
//               // navigation.reset({
//               //   index: 0,
//               //   routes: [{name: 'Home1', params: {screen: 'Remedie12'}}],
//               // })
//               navigation.navigate('Home1', {
//                 screen: 'Remedie12',
//                 params: {screen: 'Remedies'},
//               })
//             }>
//             <Text style={styles.service1}>VIEW ALL</Text>
//           </TouchableOpacity>
//         </View>
//         <FlatList
//           data={Homebanner?.remedies?.slice(0, 5)}
//           renderItem={renderItem2}
//           keyExtractor={item => item.id}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={{paddingHorizontal: 10, marginBottom: wp(8)}}
//         />
//         <View style={styles.consultationSection}>
//           <View style={[styles.contain1, {}]}>
//             <Text style={styles.service}>Consultation</Text>
//             <Text style={styles.service1}>VIEW ALL</Text>
//           </View>
//           <FlatList
//             data={data4}
//             renderItem={renderItem3}
//             keyExtractor={item => item.id}
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             contentContainerStyle={{padding: 10}}
//           />
//         </View>
//         <View style={styles.bottomCardContainer}>
//           <FlatList
//             data={data5}
//             renderItem={renderItem4}
//             keyExtractor={item => item.id}
//             // numColumns={3}
//             showsVerticalScrollIndicator={false}
//             contentContainerStyle={styles.bottomCard}
//           />
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// export default HomeScreen;
// const data = [
//   {id: '1', image: require('../../../assets/image/Group1x.png')},
//   {id: '2', image: require('../../../assets/image/Group1x.png')},
//   {id: '3', image: require('../../../assets/image/Group1x.png')},
// ];

// const BannerImg = [
//   {id: '1', image: require('../../../assets/image/bannerImg1.png')},
//   {id: '2', image: require('../../../assets/image/bannerImg2.png')},
//   {id: '3', image: require('../../../assets/image/bannerImg3.png')},
// ];

// const data1 = [
//   {
//     id: '1',
//     image: require('../../../assets/image/house.png'),
//     name: 'Residential Vastu',
//   },
//   {
//     id: '2',
//     image: require('../../../assets/image/house.png'),
//     name: 'Commercial Vastu',
//   },
//   {
//     id: '3',
//     image: require('../../../assets/image/industry.png'),
//     name: 'Insustrial Vastu',
//   },
//   {
//     id: '4',
//     image: require('../../../assets/image/numerology.png'),
//     name: 'Numerology Report',
//   },
//   {
//     id: '5',
//     image: require('../../../assets/image/Layer_x.png'),
//     name: 'Gemstone',
//   },
//   {
//     id: '6',
//     image: require('../../../assets/image/beads.png'),
//     name: 'Rudraksha',
//   },
// ];

// const data2 = [
//   {
//     id: '1',
//     image: require('../../../assets/image/numerology.png'),
//     name: 'Numerology Report',
//   },
//   {
//     id: '2',
//     image: require('../../../assets/image/g2.png'),
//     name: 'Vastu Evaluation Report',
//   },
//   {
//     id: '3',
//     image: require('../../../assets/image/astro.png'),
//     name: 'Astro Vastu Fortune Report',
//   },
// ];
// const LiveCourseData = [
//   {id: 1, image: require('../../../assets/otherApp/courseCard1.png')},
//   {id: 2, image: require('../../../assets/otherApp/courseCard1.png')},
//   {id: 3, image: require('../../../assets/otherApp/courseCard1.png')},
//   {id: 4, image: require('../../../assets/otherApp/courseCard1.png')},
// ];
// const RecordedCourseData = [
//   {id: 1, image: require('../../../assets/otherApp/courseCard2.png')},
//   {id: 2, image: require('../../../assets/otherApp/courseCard2.png')},
//   {id: 3, image: require('../../../assets/otherApp/courseCard2.png')},
//   {id: 4, image: require('../../../assets/otherApp/courseCard2.png')},
// ];

// const imagesilder1 = [
//   {id: '1', image: require('../../../assets/image/bannerImg1.png')},
//   {id: '2', image: require('../../../assets/image/bannerImg2.png')},
//   {id: '3', image: require('../../../assets/image/bannerImg3.png')},
// ];

// const data5 = [
//   {
//     id: '1',
//     image: require('../../../assets/image/Gro.png'),
//     name: 'Private & Confidential',
//   },
//   {
//     id: '2',
//     image: require('../../../assets/image/gp1.png'),
//     name: 'Verified Vastu Experts',
//   },
//   {
//     id: '3',
//     image: require('../../../assets/image/credit-card.png'),
//     name: 'Secure Payments',
//   },
// ];

// const data4 = [
//   {
//     id: '1',
//     image: require('../../../assets/image/Rectangle.png'),
//     name: 'Acharya',
//     title: 'Shreni Rajbhandary',
//     address: 'Services : Residential Vastu, Industrial Vastu, Gemstone',
//     rating: '5 reviews',
//   },
//   {
//     id: '2',
//     image: require('../../../assets/image/Rectangle.png'),
//     name: '3d-Acharya',
//     title: 'Shreni Rajbhandary',
//     address: 'Services : Residential Vastu, Industrial Vastu, Gemstone',
//     rating: '5 reviews',
//   },
//   {
//     id: '3',
//     image: require('../../../assets/image/Rectangle.png'),
//     name: '3d-Acharya',
//     title: 'Shreni Rajbhandary',
//     address: 'Services : Residential Vastu, Industrial Vastu, Gemstone',
//     rating: '5 reviews',
//   },
// ];
// const data3 = [
//   {
//     id: '1',
//     image: require('../../../assets/image/Remid.png'),
//     name: 'Bracelets',
//   },
//   {
//     id: '2',
//     image: require('../../../assets/image/Remid.png'),
//     name: '3d-Remedies',
//   },
//   {
//     id: '3',
//     image: require('../../../assets/image/Remid.png'),
//     name: '3d-Remedies',
//   },
// ];
