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
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../../Component/ResponsiveScreen/responsive';
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
import {Dropdown} from 'react-native-element-dropdown';
import WebView from 'react-native-webview';

let backPress = 0;
const HomeScreen = () => {
  const flatListRef = useRef(null);
  const navigation = useNavigation();
  const [scaleAnim] = useState(new Animated.Value(1));
  const [scaleAnims, setScaleAnims] = useState({});
  const [userType, setUserType] = useState('');
  const [isLiveCourse, setIsLiveCourse] = useState(true);
  const [isPhoto, setIsPhoto] = useState(true);
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

  const [imageHeights, setImageHeights] = useState({});

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
    if (!data?.length) return 0;

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
        if (userDetail.length === 0) {
          await dispatch(
            getUserDetailApi({
              token: userData.token,
              url: `profile-list?user_id=${userData.user_id}`,
            }),
          );
        }

        // await dispatch(
        //   getAddress({
        //     user_id: userData.user_id,
        //     token: userData.token,

        //     url: 'fetch-customer-address',
        //     // navigation,
        //   }),
        // );
        // console.log(cartDataList.length)
        // console.log(localCartDataList.length)
        // if (cartDataList.length === 0) {
        //   await dispatch(
        //     getCartDataApi({
        //       token: userData.token,
        //       url: `cart?user_id=${userData.user_id}`,
        //     }),
        //   );
        // }
        // if (localCartDataList.length > 0) {
        //   for (const item of localCartDataList) {
        //     await dispatch(
        //       addToCartApi({
        //          user_id: userData.user_id,
        //         itemId: item.id,
        //         qty: item.qty,
        //         user_type: userData.user_type,
        //         token: userData?.token,
        //         url: 'add-to-cart',
        //       }),
        //     );
        //   }
        //   dispatch(clearLocalCartData());
        //   await dispatch(
        //     getCartDataApi({
        //       token: userData.token,
        //       url: `cart?user_id=${userData.user_id}`,
        //     }),
        //   );
        // }
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

  const handleItemClick = (index, itemId, servicesName) => {
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
          servicesName,
        },
      });
    });
  };

  const handleImageLoad = (event, id, defaultHeight) => {
    const {width: imgWidth, height: imgHeight} = event.nativeEvent.source;
    const calculatedHeight = (defaultHeight * imgHeight) / imgWidth;
    setImageHeights(prev => ({...prev, [id]: calculatedHeight}));
  };

  const renderItem = ({item, index}) => {
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
          onPress={() => handleItemClick(index, item.id, item.services_name)}>
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
        <TouchableOpacity style={[styles.smallCardContainer]}>
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
        style={[{height: wp(40), width: wp(46)}, styles.cardContainer3]}>
        <ImageBackground
          resizeMode="contain"
          source={{uri: `${Imagepath.Path}${item.image}`}}
          style={{height: '100%', width: '100%', backgroundColor: '#fff'}}>
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
              <Text style={[styles.third2, {width: '85%'}]}>
                Services :{' '}
                {item?.franchise_services
                  ?.map(service => service.services_name)
                  .join(', ')
                  .slice(0, 30)}
                ...
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

  const renderItem5 = ({item, index}) => {
    return (
      <TouchableOpacity style={[styles.card, styles.prodCard]}>
        <View style={styles.imgContainer}>
          <Image
            source={{uri: `${Imagepath.Path}${item.image}`}}
            width={'100%'}
            height={'100%'}
            resizeMode="contain"
            style={[styles.cardImg, {margin: 'auto'}]}
          />
        </View>
        <View style={styles.cardInfo}>
          <Text style={styles.prodNameText}>{'Amethyst Bracelet'}</Text>

          <View style={{flexDirection: 'row', gap: 10}}>
            <Text style={styles.prodPriceText}>{`₹ 905.00`}</Text>
            <Text style={styles.prodCrossPriceText}>{`₹ 1205.00`}</Text>
          </View>
          <View style={styles.starContainer}>
            <Rating
              type="custom"
              tintColor={colors.white}
              ratingCount={5}
              imageSize={13}
              startingValue={2}
              ratingColor="#F4C76C"
              readonly
              ratingBackgroundColor={colors.lightGrey} // Unfilled star color
            />
            <Text style={[styles.third3]}>{32} reviews</Text>
          </View>

          <TouchableOpacity style={styles.addToCartBtn}>
            <Image
              source={require('../../../assets/image/bagSmall.png')}
              style={styles.addCartIcon}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.discountTag}>20% OFF</Text>
      </TouchableOpacity>
    );
  };

  const renderItem6 = ({index}) => {
    return (
      <TouchableOpacity
        style={[{height: wp(70), width: wp(55)}, styles.cardContainer3]}>
        <ImageBackground
          // resizeMode="contain"
          source={require('../../../assets/otherApp/featureBanner.png')}
          style={{height: '100%', width: '100%'}}>
          <LinearGradient
            colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.7)']}
            style={{
              position: 'absolute',
              height: '100%',
              width: '100%',
            }}
          />
          <Text style={styles.serialNoText}>{index + 1}</Text>
          <Text style={[styles.text2]}>Pick a Suitable Course</Text>
        </ImageBackground>
        {/* </LinearGradient> */}
      </TouchableOpacity>
    );
  };

  const renderCard = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => CouseDetail1(item)}
        style={[styles.card, {margin: 0, marginLeft: 15}]}>
        {/* <AutoHeightImage
          source={
            item.image == null
              ? require('../../../assets/otherApp/courseCard1.png')
              : {uri: `${Imagepath.Path}${item?.image}`}
          }
          width={wp(65)}
          // style={styles.cardImg}
        /> */}
        <Image
          source={
            item.image == null
              ? require('../../../assets/otherApp/courseCard1.png')
              : {uri: `${Imagepath.Path}${item?.image}`}
          }
          width={wp(65)}
          style={[
            // styles.cardImg,
            {
              height: imageHeights[item.id] || wp(isLiveCourse ? 65 : 38),
            },
          ]}
          onLoad={e => handleImageLoad(e, item.id, wp(65))}
          resizeMode="cover"
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

  const coursesOptions = [
    {label: 'label1', value: 'value1'},
    {label: 'label2', value: 'value2'},
    {label: 'label3', value: 'value3'},
  ];

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
          keyExtractor={item => item.id}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
        {/* {imagesilder11.length != 0 ? (
          <ImageSlider
            data={imagesilder11}
            onPress={
              (item, index) => console.log('hh', index, item)

              // alert('Item Pressed', `Item: ${JSON.stringify(item)}, Index: ${index}`)
              // navigation.navigate('UserProfile')
            }
          />
        ) : null} */}

        <View style={[styles.contain, {marginTop: wp(2)}]}>
          <Text style={styles.service}>Premium Services</Text>
        </View>
        <FlatList
          data={
            Homebanner?.premium_services ? Homebanner?.premium_services : []
          }
          renderItem={renderItem1}
          keyExtractor={item => item.id}
          numColumns={3}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />

        <View style={styles.contain2}>
          <View style={[styles.contain1, {marginBottom: 15}]}>
            <Text style={styles.service}>Best Products</Text>
            <TouchableOpacity
              onPress={() =>
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
            renderItem={renderItem5}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[
              styles.cardContainer0,
              {paddingHorizontal: 10, marginBottom: wp(8)},
            ]}
            onMomentumScrollEnd={e => {
              const contentOffsetX = e.nativeEvent.contentOffset.x;
              const currentIndex = Math.round(contentOffsetX / wp(65));
              setCurrentIndex(currentIndex);
            }}
          />
          <View style={[styles.dotContainer, {marginTop: -10}]}>
            {Homebanner?.remedies?.slice(0, 5).map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.dot, currentIndex === index && styles.activeDot]}
                onPress={() => {
                  if (index < (Homebanner?.remedies?.slice(0, 5) || [])) {
                    handleImageChange(index);
                  }
                }}
              />
            ))}
          </View>
        </View>

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

        <View style={{marginHorizontal: 0, marginVertical: 10, zIndex: 1}}>
          <FlatList
            ref={flatListRef}
            contentContainerStyle={[styles.cardContainer0, {gap: 0}]}
            data={
              isLiveCourse
                ? Homebanner?.live_courses?.slice(0, 4) || []
                : Homebanner?.recoded_courses?.slice(0, 4) || []
            }
            renderItem={renderCard}
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
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

        <View style={[styles.cardContainer4]}>
          <View style={[styles.contain4]}>
            <Text
              style={[
                styles.service,
                {
                  paddingHorizontal: 15,
                  color: '#fff',
                  marginTop: hp(19),
                },
              ]}>
              How it works
            </Text>
            <Text style={[styles.subHeadText, {marginBottom: 20}]}>
              Become a professional consultant in 3 simple steps
            </Text>
            <FlatList
              data={Homebanner?.remedies?.slice(0, 3)}
              renderItem={renderItem6}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: 10,
                marginBottom: wp(0),
              }}
            />
          </View>

          <LinearGradient
            colors={['#52B0E8', '#FF9770']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.formContainer}>
            <Text style={[styles.service1, styles.smallHeadText]}>Enquire</Text>
            <Text style={[styles.extraBoldText, {marginBottom: 20}]}>
              About Course
            </Text>
            <View style={styles.textInputContainer}>
              <TextInput
                placeholder="Your Name"
                placeholderTextColor={'#7B93AF'}
                style={styles.textInput}
                value={''}
              />
            </View>
            <View style={styles.textInputContainer}>
              <TextInput
                placeholder="Email"
                placeholderTextColor={'#7B93AF'}
                style={styles.textInput}
                value={''}
              />
            </View>
            <View style={styles.textInputContainer}>
              <TextInput
                placeholder="Phone Number"
                placeholderTextColor={'#7B93AF'}
                style={styles.textInput}
                value={''}
              />
            </View>
            <View style={styles.textInputContainer}>
              <Dropdown
                style={[styles.input]}
                data={coursesOptions}
                labelField="label"
                valueField="value"
                placeholder={'Courses'}
                placeholderStyle={[styles.inputText, {color: '#7B93AF'}]}
                selectedTextStyle={styles.selectedText}
                itemTextStyle={styles.inputText}
                value={''}
                renderRightIcon={() => (
                  <Image
                    style={{
                      height: 8,
                      width: 15,
                    }}
                    source={require('../../../assets/image/arrow_icon.png')}
                  />
                )}
              />
            </View>
            <TouchableOpacity>
              <Text style={[styles.cardBtn, styles.submitBtn]}>
                Submit Details
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        <View style={{backgroundColor: '#faf6ed', marginTop: 25}}>
          <View style={[styles.contain1, {marginTop: 20}]}>
            <Text style={styles.service}>Remedies</Text>
            <TouchableOpacity
              onPress={() =>
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
        </View>

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
            keyExtractor={item => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            ref={flatListRef}
            contentContainerStyle={{padding: 10}}
            scrollEventThrottle={16}
            onMomentumScrollEnd={e => {
              const contentOffsetX = e.nativeEvent.contentOffset.x;
              const currentIndex = Math.round(contentOffsetX / wp(90));
              setCurrentIndex(currentIndex);
            }}
          />
          <View style={[styles.dotContainer, {marginTop: 15}]}>
            {Homebanner?.franchises.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                style={[styles.dot, currentIndex == index && styles.activeDot]}
                onPress={() => {
                  if (index < Homebanner?.franchises.length) {
                    handleImageChange(index);
                  }
                  {
                    console.log(index, 'skldf');
                  }
                }}
              />
            ))}
          </View>
        </View>

        <View style={[styles.contain1, {}]}>
          <Text style={styles.service}>Core Values</Text>
        </View>
        <View style={[{paddingHorizontal: 15, paddingVertical: 20}]}>
          <Text style={styles.CoreValues}>
            We’re passionate & believe in motivating leadership. We focus to
            move forward in faith than following a superstitious path.
            Relentless growth but not alone: We aim at team building and its
            management. We believe in doing the right things with integrity,
            honesty, and reliability.
          </Text>
          <View style={styles.cirleContainer}>
            {data.map((item,index) => (
              <View key={index}
                style={{alignItems: 'center', width: '25%', borderWidth: 0}}>
                <View style={styles.cirleItem}>
                  <Text style={styles.cirle}>{item.title}</Text>
                </View>
                <Text style={styles.cirletext}>{item?.name}</Text>
              </View>
            ))}
          </View>

          <View
            style={{
              marginTop: 25,
              borderRadius: 15,
              overflow: 'hidden',
              marginBottom: 10,
              // borderWidth:1
            }}>
            <Image
              style={styles.bannerImg2}
              // source={require('../../../assets/image/Sc.png')}
              source={require('../../../assets/otherApp/coreValuesBanner.png')}
            />
            <LinearGradient
              colors={['rgba(0,0,0,0)', '#003251']}
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                top: 0,
              }}
            />
            <Text style={[styles.costCalBannerText, {bottom: 20}]}>
              We’re passionate & believe in motivating leadership.
            </Text>
          </View>
        </View>

        <View style={styles.testimonalSection}>
          <View style={{alignSelf: 'center', borderWidth: 0.1}}>
            <Text style={styles.Testimonals}>Testimonials</Text>
          </View>
          <View style={{marginTop: 10, paddingVertical: 5}}>
            <FlatList
              data={data5}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              snapToAlignment="center"
              decelerationRate="fast"
              snapToInterval={wp(100)}
              ref={flatListRef}
              scrollEventThrottle={16}
              onMomentumScrollEnd={e => {
                const contentOffsetX = e.nativeEvent.contentOffset.x;
                const currentIndex = Math.round(contentOffsetX / wp(100));
                setCurrentIndex(currentIndex);
              }}
              renderItem={({item}) => (
                <View style={styles.testimonalsCardWrapper}>
                  <View style={styles.testimonalsCard}>
                    {/* Text Content */}
                    <Text style={styles.cardUserNameText}>
                      {'Krishnaveni Ji'}
                    </Text>
                    <View style={styles.starContainer}>
                      <Rating
                        type="custom"
                        tintColor={colors.white}
                        ratingCount={5}
                        imageSize={16}
                        startingValue={2}
                        ratingColor="#F4C76C"
                        readonly
                        ratingBackgroundColor={colors.lightGrey} // Unfilled star color
                      />
                    </View>
                    <Text style={styles.testimonalsCardContant}>
                      {item.review ||
                        "“Am really grateful to be a part of the pinnacle vastu. It gives immense opportunity for everyone associated with it. It's an amazing experience working with this organisation! Vastu products are of high quality & value. Everything is done very professionally.”"}
                    </Text>
                  </View>

                  {/* Image Wrapper */}
                  <View style={styles.CardProfileImage}>
                    <Image
                      source={require('../../../assets/image/Remedies/Image-not.png')}
                      style={{
                        width: '100%',
                        height: '100%',
                        resizeMode: 'cover', // Ensures full image display
                      }}
                    />
                  </View>
                </View>
              )}
            />

            {/* Pagination Dots */}
            <View style={[styles.dotContainer, {marginVertical: 20}]}>
              {data5.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.dot,
                    currentIndex === index && styles.activeDot,
                  ]}
                  onPress={() => handleImageChange(index)}
                />
              ))}
            </View>
          </View>
        </View>

        <ImageBackground
          style={styles.costCalBannerImg}
          source={require('../../../assets/otherApp/costCal.png')}>
          <Text style={[styles.costCalBannerText]}>
            This is a Life Transformation window to fill and attend. No one can
            miss even
          </Text>
        </ImageBackground>
        <LinearGradient
          colors={['#52B0E8', '#FF9770']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={[styles.formContainer, {marginBottom: 0, marginTop: -50}]}>
          <Text style={[styles.service1, styles.smallHeadText]}>Cost</Text>
          <Text style={[styles.extraBoldText, {marginBottom: 20}]}>
            Calculator
          </Text>
          <View style={styles.textInputContainer}>
            <TextInput
              placeholder="Your Name"
              placeholderTextColor={'#7B93AF'}
              style={styles.textInput}
              value={''}
            />
          </View>
          <View style={styles.textInputContainer}>
            <TextInput
              placeholder="Email"
              placeholderTextColor={'#7B93AF'}
              style={styles.textInput}
              value={''}
            />
          </View>
          <View style={styles.textInputContainer}>
            <TextInput
              placeholder="Phone Number"
              placeholderTextColor={'#7B93AF'}
              style={styles.textInput}
              value={''}
            />
          </View>
          <View style={styles.textInputContainer}>
            <TextInput
              placeholder="City"
              placeholderTextColor={'#7B93AF'}
              style={styles.textInput}
              value={''}
            />
          </View>
          <View style={styles.textInputContainer}>
            <Dropdown
              style={[styles.input]}
              data={coursesOptions}
              labelField="label"
              valueField="value"
              placeholder={'Courses'}
              placeholderStyle={[styles.inputText, {color: '#7B93AF'}]}
              selectedTextStyle={styles.selectedText}
              itemTextStyle={styles.inputText}
              value={''}
              renderRightIcon={() => (
                <Image
                  style={{
                    height: 8,
                    width: 15,
                  }}
                  source={require('../../../assets/image/arrow_icon.png')}
                />
              )}
            />
          </View>
          <TouchableOpacity>
            <Text style={[styles.cardBtn, styles.submitBtn]}>
              Submit Details
            </Text>
          </TouchableOpacity>
        </LinearGradient>

        <View style={[styles.contain, {marginTop: 30}]}>
          <Text
            style={[styles.service, {textAlign: 'center', marginVertical: 10}]}>
            Captured Highlights
          </Text>
        </View>

        <View style={styles.switchBtnContainer}>
          <TouchableOpacity
            style={[styles.switchBtn, isPhoto ? styles.activeBtn : null]}
            disabled={isPhoto}
            onPress={async () => {
              setIsPhoto(true);
            }}>
            <Text style={[styles.switchText, isPhoto ? {color: '#fff'} : null]}>
              Photo
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            disabled={!isPhoto}
            style={[styles.switchBtn, !isPhoto ? styles.activeBtn : null]}
            onPress={async () => {
              setIsPhoto(false);
            }}>
            <Text
              style={[styles.switchText, !isPhoto ? {color: '#fff'} : null]}>
              Video
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={Homebanner?.remedies?.slice(0, 3)}
          renderItem={({item}) => {
            return isPhoto ? (
              <Image
                style={styles.highlightImg}
                source={require('../../../assets/otherApp/highlightsImg.png')}
              />
            ) : (
              <View style={styles.videoContianer}>
                <WebView
                  source={{
                    uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                  }}
                  style={{height: wp(50), width: wp(85)}}
                  javaScriptEnabled={true}
                  domStorageEnabled={true}
                  allowsFullscreenVideo={true}
                />
              </View>
            );
          }}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 10}}
        />
        <View style={[styles.contain]}>
          <Text style={[styles.service1, {textDecorationLine: 'none'}]}>
            Since 2010
          </Text>
          <Text style={styles.service}>About Pinnacle Vastu</Text>

          <Text style={styles.selectedText}>
            Occult Sciences is a concept of healing and therapeutic energies
            that extends a better living style, and Pinnacle Vastu is
            extensively working on the remedies and practical analysis of the
            situation. From learning to implementing, Pinnacle Vastu offers it
            all. With over 60 franchises spread across India including Dubai and
            Australia, Pinnacle Vastu is dedicated to the services like Vastu,
            Numerology, and Astrology Consultancy, Courses, and Remedies. In
            all, Pinnacle Vastu is a one-stop destination for Occult Sciences
            and its application.
          </Text>

          <TouchableOpacity onPress={() => console.log('hy!')}>
            <Text
              style={[
                styles.cardBtn,
                styles.btnFontSize,
                {marginVertical: 15},
              ]}>
              Read More
            </Text>
          </TouchableOpacity>

          <View style={styles.cirleContainer}>
            {data1.map((item,index) => (
              <View key={index}
                style={{alignItems: 'center', width: '25%', borderWidth: 0}}>
                <View style={styles.cirleItem}>
                  <Text style={styles.cirle}>{item.title}</Text>
                </View>
                <Text style={styles.cirletext}>{item?.name}</Text>
              </View>
            ))}
          </View>

          <View style={{marginTop: 25}}>
            {/* <AutoHeightImage
              width={wp(95)}
              style={{borderRadius: 15}}
              source={require('../../../assets/otherApp/demo3.png')}
            /> */}
            <Image
              // width={wp(95)}
              style={[styles.bannerImg2, {borderRadius: 15}]}
              source={require('../../../assets/otherApp/demo3.png')}
            />
            <Text style={[styles.costCalBannerText, {bottom: 20}]}>
              We believe in doing the right things with integrity, honesty, and
              reliability.
            </Text>
          </View>
        </View>

        <View style={styles.contain2}>
          <View style={[styles.contain1, {marginBottom: 15}]}>
            <Text style={styles.service}>Latest Blogs</Text>
            <TouchableOpacity
              // onPress={() =>
              //   navigation.navigate('Home1', {
              //     screen: 'Remedie12',
              //     params: {screen: 'Remedies'},
              //   })
              // }
              hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
              <Text style={styles.service1}>VIEW ALL</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={Homebanner?.remedies?.slice(0, 5)}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[
              styles.cardContainer0,
              {paddingHorizontal: 10, marginBottom: wp(8)},
            ]}
            onMomentumScrollEnd={e => {
              const contentOffsetX = e.nativeEvent.contentOffset.x;
              const currentIndex = Math.round(contentOffsetX / wp(80));
              setCurrentIndex(currentIndex);
            }}
            renderItem={({item}) => (
              <TouchableOpacity style={styles.blogCard}>
                {/* <AutoHeightImage
                  source={require('../../../assets/image/Scr2.png')}
                  width={wp(80)}
                  style={{borderTopLeftRadius: 10, borderTopRightRadius: 10}}
                /> */}
                <Image
                  source={require('../../../assets/image/Scr2.png')}
                  style={{
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    width: wp(80),
                    height:hp(30),
                    // borderWidth:1,
                    // resizeMode:"contain"
                  }}
                />
                <View style={styles.cardInfo}>
                  {isLiveCourse ? (
                    <Text style={styles.DateText}>{'January 23, 2024'}</Text>
                  ) : null}
                  <Text style={styles.blogCardHeadText}>
                    {'Removewat Download Windows 10 ➤ Activate Your OS Today'}
                  </Text>

                  <Text style={styles.blogCardContantText}>
                    When we’re setting up our computers, one of the biggest
                    hassles can be dealing with Windows activation
                    notifications. It feels... like every time we turn around,
                  </Text>
                  {/* <Text style={styles.price}>{`₹ ${item?.price}`}</Text> */}

                  <Text style={styles.blogCardBtnText}>{'View Details >'}</Text>
                </View>
              </TouchableOpacity>
            )}
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
  {
    id: '1',
    image: require('../../../assets/image/Group1x.png'),
    title: '2K',
    name: 'Completed Projects',
  },
  {
    id: '2',
    image: require('../../../assets/image/Group1x.png'),
    title: '3K',
    name: 'Student Trained',
  },
  {
    id: '3',
    image: require('../../../assets/image/Group1x.png'),
    title: '90K',
    name: 'Order Products',
  },
  {
    id: '4',
    image: require('../../../assets/image/Group1x.png'),
    title: '60+',
    name: 'Franchise',
  },
];
const data1 = [
  {
    id: '1',
    title: '99+',
    name: 'Trusted by Million Clients',
  },
  {
    id: '2',
    title: '25+',
    name: 'Years of Experience',
  },
  {
    id: '3',
    title: '10+',
    name: 'Types of Horoscopes',
  },
  {
    id: '4',
    title: '99+',
    name: 'Qualified Astrologers',
  },
];

const BannerImg = [
  {id: '1', image: require('../../../assets/image/bannerImg1.png')},
  {id: '2', image: require('../../../assets/image/bannerImg2.png')},
  {id: '3', image: require('../../../assets/image/bannerImg3.png')},
];

const data6 = [
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
