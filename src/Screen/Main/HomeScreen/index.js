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
import DrawerIcon from '../../../assets/image/Drawer.svg';
import BagIcon from '../../../assets/image/bagIcon.svg';
import SearchIcon from '../../../assets/image/searchIcon.svg';
import DownarrowIcon from '../../../assets/image/down_arrow_icon.svg';
import OrgRightarrowIcon from '../../../assets/image/right_arrow_icon_org.svg';
import BottomGrp1 from '../../../assets/image/bottomGrp1.svg';
import BottomGrp2 from '../../../assets/image/bottomGrp2.svg';
import BottomGrp3 from '../../../assets/image/bottomGrp3.svg';
import AddtoCartIcon from '../../../assets/image/add_to_cart_icon.svg';
import styles from './style';
import {colors} from '../../../Component/colors';
import BannerSlider from '../../../Component/Banner';
import Toast from 'react-native-simple-toast';
import {Rating} from 'react-native-ratings';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../../Component/ResponsiveScreen/responsive';
import {useDispatch, useSelector} from 'react-redux';
import {
  Banner,
  CourceLis,
  getAllCityApi,
  GetConsultationList,
  submitEnquryApi,
} from '../../../Redux/Slice/HomeSlice';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Loader from '../../../Component/Loader';
import Imagepath from '../../../Component/Imagepath';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getUserDetailApi} from '../../../Redux/Slice/Authslice';
import {consultationDetail1} from '../../../Redux/Slice/ConsultancySlice';
import {Dropdown} from 'react-native-element-dropdown';
import WebView from 'react-native-webview';
import {SvgUri} from 'react-native-svg';
import {fetchExtraCollectonHome} from '../../../Redux/Slice/HomeBannerSlice';
import {addToCart} from '../../../Redux/Slice/CartSlice';
import {getUserDetails} from '../../../Redux/Slice/loginSlice';
import {getDrawerData} from '../../../Redux/Slice/drawerSlice';
let backPress = 0;
const HomeScreen = () => {
  const flatListRef = useRef(null);
  const navigation = useNavigation();
  // const [scaleAnim] = useState(new Animated.Value(1));
  const [scaleAnims, setScaleAnims] = useState({});
  const [userType, setUserType] = useState('');
  const [isLiveCourse, setIsLiveCourse] = useState(true);
  const [isPhoto, setIsPhoto] = useState(true);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentIndex1, setCurrentIndex1] = useState({
    imgBannerIndex2: 0,
    bestProdIndex: 0,
    courseIndex: 0,
    cousultationIndex: 0,
    reviewIndex: 0,
  });
  const dispatch = useDispatch();
  const placeholderText = 'Search';
  const [displayedText, setDisplayedText] = useState('');
  const [displayedText1, setDisplayedText1] = useState('');

  const homeData = useSelector(state => state?.HomeBanner);

  const Cource1 = useSelector(state => state?.home?.Cource);
  const city = useSelector(state => state?.home?.city);
  const consultationList = useSelector(state => state?.home?.ConsultationList);
  const submitedEnqury = useSelector(state => state?.home?.submitedEnqury);
  const userDetail = useSelector(state => state?.Auth?.userData);
  const Homebanner = useSelector(state => state.home?.HomeBanner?.data);
  const isLoading = useSelector(state => state.home?.loading);
  const cartTotalQuantity = useSelector(
    state => state?.cart?.cartTotalQuantity,
  );

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    city: '',
  });

  const [validationError, setValidationError] = useState({
    name: false,
    email: false,
    phone: false,
    course: false,
    city: false,
  });

  const handleInputChange = (key, value) => {
    setValidationError({...validationError, [key]: false});
    setFormData(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const {name, email, phone, course, city} = formData;

    if (name === '') {
      setValidationError({...validationError, name: true});
      return;
    } else if (email === '' || !emailRegex.test(email)) {
      setValidationError({...validationError, email: true});
      return;
    } else if (city === '') {
      setValidationError({...validationError, city: true});
      return;
    } else if (phone === '' || phone < 10) {
      setValidationError({...validationError, phone: true});
      return;
    } else if (course === '') {
      setValidationError({...validationError, course: true});
      return;
    } else {
      await dispatch(
        submitEnquryApi({
          url: 'lead-generate',
          Requestdata: {
            name,
            email,
            contact_no: phone,
            course,
          },
        }),
      );
    }
  };
  const formatDate = dateString => {
    const date = new Date(dateString);
    const options = {year: 'numeric', month: 'long', day: 'numeric'};
    return date.toLocaleDateString('en-US', options);
  };
  const getYouTubeEmbedUrl1 = url => {
    const videoId = url.split('v=')[1]?.split('&')[0];
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&showinfo=0&rel=0&modestbranding=1&fs=1`;
  };

  const getYouTubeEmbedUrl = url => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const videoIdMatch = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
      const videoId = videoIdMatch ? videoIdMatch[1] : null;
      return videoId
        ? `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&rel=0&modestbranding=1&fs=1`
        : url;
    }

    return url;
  };
  const [imageHeights, setImageHeights] = useState({});
  const newArray = [];
  (homeData?.image_banner || []).forEach(item => {
    newArray.push(...item.slider);
  });

  const focus = useIsFocused();

  useEffect(() => {
    if (focus) {
      apicall();
      getUserType();
    }
  }, [focus]);

  useEffect(() => {
    if (submitedEnqury) {
      setFormData({
        name: '',
        email: '',
        phone: '',
        course: '',
        city: '',
      });
    }
  }, [submitedEnqury]);

  const apicall = async () => {
    await dispatch(Banner({url: 'home-slider'}));
    await dispatch(getAllCityApi({url: 'fetch-city-all'}));
    await dispatch(CourceLis({url: 'fetch-course-data'}));
    await dispatch(GetConsultationList({url: 'franchise-data'}));
    await dispatch(getDrawerData());
  };

  const Addtocard = async item => {
    try {
      if (item?.variants?.length != 0) {
        const image = item.variants?.edges?.[0]?.node?.image?.src;
        let product = {...item};
        product.selectedVarient = item.variants?.edges?.[0];
        let productTemp = {
          ...product,
          image,
          qty: 1,
          productId: product?.id,
          compareAtPrice: item?.variants?.edges?.[0].node?.compareAtPrice,
          price: item?.variants?.edges?.[0].node?.price.amount,
          id: isNaN(product?.selectedVarient?.node?.id)
            ? await product?.selectedVarient?.node?.id
            : product?.selectedVarient?.node?.id,

          properties: {},
        };

        if (productTemp?.availableForSale) {
          dispatch(addToCart(productTemp));
        }
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  useEffect(() => {
    let currentIndex = 0;
    const startAnimation = () => {
      const intervalId = setInterval(() => {
        if (currentIndex < placeholderText.length) {
          setDisplayedText(prev => placeholderText.slice(0, currentIndex + 1));
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
  }, []);

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
        await dispatch(getUserDetails(userData?.shopify_access_token));
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

  const handleItemClick = (index, name) => {
    const newScaleAnims = {...scaleAnims};

    if (!newScaleAnims[index]) {
      newScaleAnims[index] = new Animated.Value(1);
    }

    setScaleAnims(newScaleAnims);

    Animated.sequence([
      Animated.timing(newScaleAnims[index], {
        toValue: 0.96,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(newScaleAnims[index], {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start(() => {
      navigation.navigate('Home1', {
        screen: 'Consultancy',
        params: {
          shopifyName: name,
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
            transform: [{scale: itemScaleAnim}],
          },
        ]}>
        <TouchableOpacity
          style={[
            styles.cardContainer,
            {backgroundColor: item?.background_color},
          ]}
          onPress={() => handleItemClick(index, item.text)}>
          <SvgUri width="35%" height="35%" uri={item?.CardImage} />
          <Text style={styles.text}>{item.text}</Text>
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
            transform: [{scale: itemScaleAnim}],
          },
        ]}>
        <TouchableOpacity
          style={[
            styles.smallCardContainer,
            {backgroundColor: item?.card_bg_color},
          ]}>

{item?.CardImage?.endsWith('.svg') ? (
                    <SvgUri width={22} height={22} uri={item?.CardImage} />
                  ) : (
                    <Image
                    source={{uri: `${item?.CardImage}`}}
                    style={[styles.itemImg, {resizeMode: 'contain'}]}
                  />
                  )}


          
          <Text style={[styles.smallCardtext, {color: item?.text_color}]}>
            {item.text}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };
  const renderItem2 = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
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
        }}
        style={[{height: wp(38), width: wp(38)}, styles.cardContainer3]}>
        <ImageBackground
          source={{uri: `${item.CardImage}`}}
          style={{height: '100%', width: '100%', backgroundColor: '#fff'}}>
          <LinearGradient
            colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.7)']}
            style={{
              position: 'absolute',
              height: '100%',
              width: '100%',
            }}
          />
          <Text style={styles.text1}>{item.card_text}</Text>
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
          {
            transform: [{scale: itemScaleAnim}],
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
              <Text style={[styles.third, {marginTop: 10}]}>{item?.level}</Text>
              <Text style={styles.third1}>{item?.franchise_name}</Text>
              <Text style={[styles.third2, {width: '85%'}]}>
                Services :{' '}
                {item?.franchise_services
                  ?.map(service => service.services_name)
                  .join(', ')
                  .slice(0, 30)}
                ...
              </Text>
              <View style={styles.starContainer}>
                <Rating
                  type="custom"
                  tintColor={colors.white}
                  ratingCount={5}
                  imageSize={16}
                  startingValue={calculateAverageRating(item?.reviews)}
                  ratingColor="#52B1E9"
                  readonly
                  ratingBackgroundColor={colors.lightGrey}
                />
                <Text style={[styles.third2]}>
                  {item?.reviews.length} reviews
                </Text>
              </View>
            </View>

            <OrgRightarrowIcon
              height={wp(3)}
              width={wp(3)}
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
          {item.svg}
          <Text style={styles.bottomCardtext}>{item.name}</Text>
        </View>
        {item.id !== '3' ? <View style={styles.viewLine} /> : null}
      </View>
    );
  };

  const renderItem5 = ({item}) => {
    const rating =
      item?.metafields[0]?.value && JSON.parse(item?.metafields[0]?.value);
    return (
      <TouchableOpacity
        style={[styles.card, styles.prodCard]}
        onPress={() => {
          navigation.navigate('ProductDetail', {itemId: item?.id});
        }}>
        <View style={styles.imgContainer}>
          <Image
            source={{uri: item?.featuredImage?.url}}
            width={'100%'}
            height={'100%'}
            resizeMode="contain"
            style={[styles.cardImg, {margin: 'auto',borderRadius:10}]}
          />
        </View>
        <View style={styles.cardInfo}>
          <Text style={styles.prodNameText}>{item?.title}</Text>

          <View style={{flexDirection: 'row', gap: 10}}>
            <Text style={styles.prodPriceText}>
              {`₹ ${item?.variants?.edges?.[0].node?.price.amount}`}
            </Text>

            {item?.variants?.edges?.[0].node?.compareAtPrice &&
              parseFloat(
                item?.variants?.edges?.[0].node?.compareAtPrice.amount,
              ) > parseFloat(item?.variants?.edges?.[0].node?.price.amount) && (
                <Text style={styles.prodCrossPriceText}>
                  {`₹ ${item?.variants?.edges?.[0].node?.compareAtPrice.amount}`}
                </Text>
              )}
          </View>
          <View style={styles.starContainer}>
            {rating?.value && (
              <>
                <Rating
                  type="custom"
                  tintColor={colors.white}
                  ratingCount={rating?.scale_max || 5}
                  imageSize={13}
                  startingValue={rating?.value}
                  ratingColor={colors?.Headertext}
                  readonly
                  ratingBackgroundColor={colors.lightGrey}
                />
                <Text style={[styles.third3]}>
                  ({item?.review?.count}) reviews
                </Text>
              </>
            )}
          </View>
          <TouchableOpacity
            onPress={() => {
              if (item?.availableForSale == true) {
                Addtocard(item);
              } else {
                Toast.show('This product  is currently not available for sale');
              }
            }}
            style={styles.addToCartBtn}>
            {/* <Image
              source={require('../../../assets/image/bagSmall.png')}
              style={styles.addCartIcon}
            /> */}
            <AddtoCartIcon height={wp(5)} width={wp(5)} />
          </TouchableOpacity>
        </View>
        {item?.variants?.edges?.[0].node?.compareAtPrice?.amount &&
          parseFloat(item?.variants?.edges?.[0].node?.compareAtPrice.amount) >
            parseFloat(item?.variants?.edges?.[0].node?.price.amount) &&
          ((parseFloat(item?.variants?.edges?.[0].node?.compareAtPrice.amount) -
            parseFloat(item?.variants?.edges?.[0].node?.price.amount)) /
            parseFloat(
              item?.variants?.edges?.[0].node?.compareAtPrice.amount,
            )) *
            100 >=
            1 && (
            <Text style={styles.discountTag}>
              {(
                ((parseFloat(
                  item?.variants?.edges?.[0].node?.compareAtPrice?.amount,
                ) -
                  parseFloat(item?.variants?.edges?.[0].node?.price.amount)) /
                  parseFloat(
                    item?.variants?.edges?.[0].node?.compareAtPrice?.amount,
                  )) *
                100
              ).toFixed(0)}
              % OFF
            </Text>
          )}
      </TouchableOpacity>
    );
  };

  const renderItem6 = ({item, index}) => {
    return (
      <TouchableOpacity
        style={[{height: wp(70), width: wp(55)}, styles.cardContainer3]}>
        <ImageBackground
          source={{uri: item?.mob_card_background}}
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
          <Text style={[styles.text2]}>{item?.card_text}</Text>
        </ImageBackground>
      </TouchableOpacity>
    );
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
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('CourseDetail', {
            coursetype: isLiveCourse,
            itemId: item?.id,
          });
        }}
        style={[styles.card, {margin: 0, marginLeft: 15}]}>
        <Image
          source={
            item?.featuredImage?.url
              ? {uri: `${item?.featuredImage?.url}`}
              : require('../../../assets/image/Remedies/Image-not.png')
          }
          width={wp(65)}
          style={[
            {
              height: imageHeights[item.id] || wp(isLiveCourse ? 65 : 38),
            },
          ]}
          onLoad={e => handleImageLoad(e, item.id, wp(65))}
          resizeMode="cover"
        />
        <View style={styles.cardInfo}>
          {isLiveCourse ? (
            <Text style={styles.DateText}>
              {CousrseDate(item?.metafields[1]?.value)}
            </Text>
          ) : null}
          <Text style={styles.titleText}>
            {' '}
            {item?.title
              ? item?.title.length > 20
                ? `${item?.title.substring(0, 20)}...`
                : item?.title
              : ' '}
          </Text>

          <Text style={styles.regularText}>
            {item?.description?.length > 45
              ? `${item?.description.substring(0, 45)}...`
              : item?.description || ''}
          </Text>

          <View style={{flexDirection: 'row', gap: 10}}>
            <Text style={[styles.price]}>
              {`₹ ${item?.variants?.edges?.[0].node?.price.amount}`}
            </Text>
            {item?.variants?.edges?.[0].node?.compareAtPrice ? (
              <Text
                style={[
                  styles.price,
                  {textDecorationLine: 'line-through', color: 'gray'},
                ]}>
                ₹ {item?.variants?.edges?.[0].node?.compareAtPrice?.amount}
              </Text>
            ) : null}
          </View>

          <Text style={styles.cardBtn}>View Details</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const [backPress, setBackPress] = useState(0);

  const handleBackButtonClick = () => {
    if (navigation.isFocused()) {
      if (backPress > 0) {
        BackHandler.exitApp();
        setBackPress(0);
      } else {
        setBackPress(prev => prev + 1);
        ToastAndroid.show('Press again to exit app', ToastAndroid.SHORT);
        setTimeout(() => setBackPress(0), 2000);
      }
      return true;
    }
    return false;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButtonClick,
    );

    return () => backHandler.remove();
  }, [backPress, navigation]);

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
          <DrawerIcon />
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
          <BagIcon width={wp(5)} height={wp(5)} style={styles.bagBtn} />
        </TouchableOpacity>
      </View>
      {isLoading ? <Loader /> : null}
      <ScrollView contentContainerStyle={styles.servicesContainer}>
        <View style={styles.searchContainer}>
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
          {/* <TouchableOpacity
            style={styles.filterBtn}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
            <Image source={require('../../../assets/image/Vector.png')} />
          </TouchableOpacity> */}
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
          data={homeData?.our_services ? homeData?.our_services : []}
          renderItem={renderItem}
          scrollEnabled={false}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />

        <View style={[styles.containe, {marginVertical: 10}]}>
          <FlatList
            data={homeData?.image_banner2 || []}
            keyExtractor={(item, index) => index.toString()}
            pagingEnabled
            snapToAlignment="center"
            decelerationRate="fast"
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[
              {paddingHorizontal: 10, marginBottom: wp(0)},
            ]}
            onMomentumScrollEnd={e => {
              const contentOffsetX = e.nativeEvent.contentOffset.x;
              const currentIndex = Math.round(contentOffsetX / wp(85));
              setCurrentIndex1({
                ...currentIndex1,
                imgBannerIndex2: currentIndex,
              });
            }}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={[
                  styles.imageContaine,
                  {
                    width: wp(85),
                    marginRight: 10,
                    borderColor: item.border_color,
                    backgroundColor: item?.background_color,
                    minHeight: wp(25),
                  },
                ]}>
                <View style={[styles.cardContaine, {paddingRight: 10}]}>
                  <View style={{marginLeft: -4}}>
                    {item?.cardIcon2?.endsWith('.svg') ? (
                      <SvgUri
                        width={wp(20)}
                        height={wp(28)}
                        uri={item?.cardIcon1}
                        resizeMode="contain"
                      />
                    ) : (
                      <Image
                        source={{uri: item?.cardIcon1}}
                        style={{
                          width: 100,
                          height: 100,
                          resizeMode: 'contain',
                        }}
                      />
                    )}
                  </View>

                  <View style={styles.textContaine}>
                    <Text style={[styles.titl]}>{item?.title}</Text>
                    <Text style={[styles.subtitl, {color: item?.text_color}]}>
                      {item?.title2}
                    </Text>
                  </View>
                  {item?.cardIcon2?.endsWith('.svg') ? (
                    <SvgUri width={15} height={15} uri={item?.cardIcon2} />
                  ) : (
                    <Image
                      source={{uri: item?.cardIcon2}}
                      style={styles.cardIco}
                    />
                  )}
                </View>
              </TouchableOpacity>
            )}
          />

          <View style={[styles.dotContainer, {marginTop: 10}]}>
            {homeData?.image_banner2?.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dot,
                  currentIndex1.imgBannerIndex2 === index && styles.activeDot,
                ]}
                onPress={() => {
                  if (index < (homeData?.image_banner2?.map || [])) {
                    handleImageChange(index);
                  }
                }}
              />
            ))}
          </View>
        </View>

        <View style={[styles.contain, {marginTop: wp(0)}]}>
          <Text style={styles.service}>Premium Services</Text>
        </View>
        <FlatList
          data={homeData?.premium_services ? homeData?.premium_services : []}
          renderItem={renderItem1}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
        <View style={styles.contain2}>
          <View style={[styles.contain1, {marginBottom: 15}]}>
            <Text style={styles.service}>Best Products</Text>
            <TouchableOpacity
              hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
              onPress={() => {
                navigation.navigate('Home1', {
                  screen: 'Remedie12',
                  params: {
                    screen: 'ProductList',
                    params: {
                      item: {
                        id: homeData?.best_Products?.collectionId,
                        title: 'Products',
                      },
                      Id: false,
                    },
                  },
                });
              }}>
              <Text style={styles.service1}>VIEW ALL</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={homeData?.best_Products?.products || []}
            renderItem={renderItem5}
            pagingEnabled
            snapToAlignment="center"
            decelerationRate="fast"
            keyExtractor={(item, index) => index.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[
              styles.cardContainer0,
              {paddingHorizontal: 10, marginBottom: wp(8)},
            ]}
            onMomentumScrollEnd={e => {
              const contentOffsetX = e.nativeEvent.contentOffset.x;
              const currentIndex = Math.round(contentOffsetX / wp(65));
              setCurrentIndex1({...currentIndex1, bestProdIndex: currentIndex});
            }}
          />

          <View style={[styles.dotContainer, {marginTop: -10}]}>
            {homeData?.best_Products?.products?.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dot,
                  currentIndex1.bestProdIndex == index && styles.activeDot,
                ]}
                onPress={() => {
                  if (index < (homeData?.best_Products?.products || [])) {
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
              await dispatch(
                fetchExtraCollectonHome(
                  homeData?.courses_section?.content?.live_courses,
                  'courses',
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
            disabled={!isLiveCourse}
            style={[styles.switchBtn, !isLiveCourse ? styles.activeBtn : null]}
            onPress={async () => {
              setIsLiveCourse(false);
              await dispatch(
                fetchExtraCollectonHome(
                  homeData?.courses_section?.content?.recorded_courses,
                  'courses',
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

        <View style={{marginHorizontal: 0, marginVertical: 10, zIndex: 1}}>
          <FlatList
            ref={flatListRef}
            contentContainerStyle={[styles.cardContainer0, {gap: 0}]}
            pagingEnabled
            snapToAlignment="center"
            decelerationRate="fast"
            data={homeData?.course ? homeData?.course : []}
            renderItem={renderCard}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            onMomentumScrollEnd={e => {
              const contentOffsetX = e.nativeEvent.contentOffset.x;
              const currentIndex = Math.round(contentOffsetX / wp(65)); // Calculate index based on item width
              setCurrentIndex1({...currentIndex1, courseIndex: currentIndex});
            }}
          />

          <View style={styles.dotContainer}>
            {(homeData?.course || []).map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dot,
                  currentIndex1.courseIndex == index && styles.activeDot,
                ]}
                onPress={() => {
                  if (index < (homeData?.course || [])) {
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
              {homeData?.how_it_works?.content?.work_heading}
            </Text>
            <Text style={[styles.subHeadText, {marginBottom: 20}]}>
              {homeData?.how_it_works?.content?.description}
            </Text>
            <FlatList
              data={homeData?.how_it_works?.cards?.slice(0, 3)}
              renderItem={renderItem6}
              keyExtractor={(item, index) => index?.toString()}
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
                value={formData.name}
                onChangeText={text => handleInputChange('name', text)}
              />
            </View>
            {validationError.name && (
              <Text style={styles.errorText}>
                Please enter your valid name.
              </Text>
            )}

            <View style={styles.textInputContainer}>
              <TextInput
                placeholder="Email"
                placeholderTextColor={'#7B93AF'}
                style={styles.textInput}
                value={formData.email}
                onChangeText={text => handleInputChange('email', text)}
              />
            </View>
            {validationError.email && (
              <Text style={styles.errorText}>
                Please enter your valid email.
              </Text>
            )}
            <View style={styles.textInputContainer}>
              <Dropdown
                style={[styles.input]}
                data={city}
                labelField="name"
                valueField="name"
                placeholder={'City'}
                placeholderStyle={[styles.inputText, {color: '#7B93AF'}]}
                selectedTextStyle={styles.selectedText}
                itemTextStyle={styles.inputText}
                search
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                searchPlaceholder="Search..."
                value={formData.course}
                onChange={item => handleInputChange('city', item.name)}
                renderRightIcon={() => (
                  <DownarrowIcon
                    width={wp(4)}
                    height={wp(3)}
                    style={{marginRight: 10}}
                  />
                )}
              />
            </View>
            {validationError.city && (
              <Text style={styles.errorText}>Please select your city.</Text>
            )}

            <View style={styles.textInputContainer}>
              <TextInput
                placeholder="Phone Number"
                placeholderTextColor={'#7B93AF'}
                style={styles.textInput}
                value={formData.phone}
                onChangeText={text => handleInputChange('phone', text)}
                keyboardType="numeric"
                maxLength={10}
              />
            </View>
            {validationError.phone && (
              <Text style={styles.errorText}>
                Please enter your valid phone number.
              </Text>
            )}
            <View style={styles.textInputContainer}>
              <Dropdown
                style={[styles.input]}
                data={Cource1}
                labelField="lable"
                valueField="lable"
                placeholder={'Courses'}
                placeholderStyle={[styles.inputText, {color: '#7B93AF'}]}
                selectedTextStyle={styles.selectedText}
                itemTextStyle={styles.inputText}
                value={formData.course}
                onChange={item => handleInputChange('course', item.lable)}
                renderRightIcon={() => (
                  <DownarrowIcon
                    width={wp(4)}
                    height={wp(3)}
                    style={{marginRight: 10}}
                  />
                )}
              />
            </View>
            {validationError.course && (
              <Text style={styles.errorText}>Please select a course.</Text>
            )}

            <TouchableOpacity onPress={() => handleSubmit()}>
              <Text style={[styles.cardBtn, styles.submitBtn]}>
                Submit Details
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        <View style={{backgroundColor: '#faf6ed', marginTop: 25}}>
          <ImageBackground
            source={{
              uri: `${homeData?.remedies?.content?.mob_background_image}`,
            }}
            style={{height: hp(32), width: '100%'}}>
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
              data={homeData?.remedies?.cards}
              renderItem={renderItem2}
              keyExtractor={(item, index) => index?.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: 10,
                marginBottom: wp(8),
              }}
            />
          </ImageBackground>
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
              hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
              <Text style={styles.service1}>VIEW ALL</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={consultationList}
            pagingEnabled
            snapToAlignment="center"
            decelerationRate="fast"
            renderItem={renderItem3}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            ref={flatListRef}
            contentContainerStyle={{padding: 10}}
            scrollEventThrottle={16}
            onMomentumScrollEnd={e => {
              const contentOffsetX = e.nativeEvent.contentOffset.x;
              const currentIndex = Math.round(contentOffsetX / wp(90));
              setCurrentIndex1({
                ...currentIndex1,
                cousultationIndex: currentIndex,
              });
            }}
          />
          <View style={[styles.dotContainer, {marginTop: 15}]}>
            {consultationList?.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.dot,
                  currentIndex1.cousultationIndex == index && styles.activeDot,
                ]}
                onPress={() => {
                  if (index < consultationList?.length) {
                    handleImageChange(index);
                  }
                }}
              />
            ))}
          </View>
        </View>
        <View style={[styles.contain1, {}]}>
          <Text
            style={[
              styles.service,
              {color: homeData?.core_values?.content?.heading_color},
            ]}>
            {homeData?.core_values?.content?.heading}
          </Text>
        </View>
        <View style={[{paddingHorizontal: 15, paddingVertical: 20}]}>
          <Text
            style={[
              styles.CoreValues,
              {color: homeData?.core_values?.content?.description_color},
            ]}>
            {homeData?.core_values?.content?.description}
          </Text>
          <View style={styles.cirleContainer}>
            {homeData?.core_values?.items?.map((item, index) => (
              <View
                key={item.id || index}
                style={{alignItems: 'center', width: '25%', borderWidth: 0}}>
                <View style={styles.cirleItem}>
                  <Text style={styles.cirle}>{item.stat_value}</Text>
                </View>
                <Text style={styles.cirletext}>{item?.stat_label}</Text>
              </View>
            ))}
          </View>

          <View
            style={{
              marginTop: 25,
              borderRadius: 15,
              overflow: 'hidden',
              marginBottom: 10,
            }}>
            <Image
              style={styles.bannerImg2}
              source={
                homeData?.core_values?.content?.mob_image
                  ? {uri: homeData?.core_values?.content?.mob_image}
                  : require('../../../assets/otherApp/coreValuesBanner.png')
              }
            />
          </View>
        </View>

        <ImageBackground
          source={{
            uri: `${homeData?.custom_testimonial?.content?.mob_background_image}`,
          }}
          style={styles.testimonalSection}>
          <View>
            <View style={{alignSelf: 'center', borderWidth: 0.1}}>
              <Text style={styles.Testimonals}>
                {homeData?.custom_testimonial?.content?.heading}
              </Text>
            </View>
            <View style={{marginTop: 10, paddingVertical: 5}}>
              <FlatList
                data={
                  homeData?.custom_testimonial?.custom_review
                    ? homeData?.custom_testimonial?.custom_review
                    : []
                }
                keyExtractor={(item, index) => index?.toString()}
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
                  setCurrentIndex1({
                    ...currentIndex1,
                    reviewIndex: currentIndex,
                  });
                }}
                renderItem={({item, index}) => (
                  <View style={styles.testimonalsCardWrapper}>
                    <View style={styles.testimonalsCard}>
                      <Text style={styles.cardUserNameText}>
                        {item?.reviewer_name}
                      </Text>
                      <View style={styles.starContainer}>
                        <Rating
                          type="custom"
                          tintColor={colors.white}
                          ratingCount={5}
                          imageSize={16}
                          startingValue={3}
                          ratingColor="#F4C76C"
                          readonly
                          ratingBackgroundColor={colors.lightGrey}
                        />
                      </View>
                      <Text style={styles.testimonalsCardContant}>
                        {item?.review_text}
                      </Text>
                    </View>

                    <View style={styles.CardProfileImage}>
                      <Image
                        source={
                          item?.mob_review_image
                            ? {uri: item?.mob_review_image}
                            : require('../../../assets/image/Remedies/Image-not.png')
                        }
                        style={{
                          width: '100%',
                          height: '100%',
                        }}
                      />
                    </View>
                  </View>
                )}
              />

              <View style={[styles.dotContainer, {marginVertical: 20}]}>
                {homeData?.custom_testimonial?.custom_review?.map(
                  (item, index) => (
                    <TouchableOpacity
                      key={index.toString()}
                      style={[
                        styles.dot,
                        currentIndex1.reviewIndex == index && styles.activeDot,
                      ]}
                      onPress={() => handleImageChange(index)}
                    />
                  ),
                )}
              </View>
            </View>
          </View>
        </ImageBackground>
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
            style={[
              styles.service,
              {
                textAlign: 'center',
                marginVertical: 10,
                color: homeData?.captured_highlights?.content?.title_color,
              },
            ]}>
            {homeData?.captured_highlights?.content?.title}
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
          data={
            isPhoto
              ? homeData?.captured_highlights?.image
              : homeData?.captured_highlights?.video
          }
          renderItem={({item}) => {
            return isPhoto ? (
              <Image
                style={styles.highlightImg}
                source={
                  item.mob_photo
                    ? {uri: item.mob_photo}
                    : require('../../../assets/otherApp/highlightsImg.png')
                }
              />
            ) : (
              <View
                style={[
                  styles.videoContianer,
                  {height: wp(50), width: wp(85)},
                ]}>
                <WebView
                  source={{uri: getYouTubeEmbedUrl(item.video_url)}}
                  style={{height: '100%', width: '100%'}}
                  javaScriptEnabled={true}
                  domStorageEnabled={true}
                  allowsFullscreenVideo={true}
                />
              </View>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 10}}
        />

        <View style={[styles.contain]}>
          <Text
            style={[
              styles.service1,
              {
                textDecorationLine: 'none',
                color:
                  homeData?.about_pinnacle_vastu?.content?.subheading_color,
              },
            ]}>
            {homeData?.about_pinnacle_vastu?.content?.subheading}
          </Text>
          <Text
            style={[
              styles.service,
              {color: homeData?.about_pinnacle_vastu?.content?.heading_color},
            ]}>
            {homeData?.about_pinnacle_vastu?.content?.heading}
          </Text>

          <Text
            style={[
              styles.selectedText,
              {
                color:
                  homeData?.about_pinnacle_vastu?.content?.description_color,
              },
            ]}>
            {homeData?.about_pinnacle_vastu?.content?.description}
          </Text>

          <TouchableOpacity onPress={() => console.log('hy!')}>
            <Text
              style={[
                styles.cardBtn,
                styles.btnFontSize,
                {
                  marginVertical: 15,
                  color:
                    homeData?.about_pinnacle_vastu?.content?.button_text_color,
                },
              ]}>
              {homeData?.about_pinnacle_vastu?.content?.button_text}
            </Text>
          </TouchableOpacity>

          <View style={styles.cirleContainer}>
            {homeData?.about_pinnacle_vastu?.items?.map((item, index) => (
              <View
                key={item.id || index}
                style={{alignItems: 'center', width: '25%', borderWidth: 0}}>
                <View style={styles.cirleItem}>
                  <Text style={styles.cirle}>{item.stat_value}</Text>
                </View>
                <Text style={styles.cirletext}>{item?.stat_label}</Text>
              </View>
            ))}
          </View>

          <View style={{marginTop: 25}}>
            <Image
              style={[styles.bannerImg2, {borderRadius: 15}]}
              source={
                homeData?.about_pinnacle_vastu?.content?.mob_image
                  ? {uri: homeData.about_pinnacle_vastu.content.mob_image}
                  : require('../../../assets/otherApp/demo3.png')
              }
            />
          </View>
        </View>
        <ImageBackground
          source={{
            uri: `${homeData?.featured_blog_section?.content?.mob_background_image}`,
          }}
          style={styles.contain2}>
          <View style={[styles.contain1, {marginBottom: 15}]}>
            <Text style={styles.service}>
              {homeData?.featured_blog_section?.content?.heading}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Home', {screen: 'BlogList'})}
              hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
              <Text style={styles.service1}>VIEW ALL</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={homeData?.featured_blogs}
            keyExtractor={(item, index) => index?.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[
              styles.cardContainer0,
              {paddingHorizontal: 10, marginBottom: wp(8)},
            ]}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Home', {
                    screen: 'BlogDetail',
                    params: {item: item},
                  })
                }
                style={styles.blogCard}>
                <Image
                  source={
                    item?.node?.image?.url
                      ? {uri: item?.node?.image?.url}
                      : require('../../../assets/otherApp/demo3.png')
                  }
                  style={{
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    width: wp(80),
                    height: hp(30),
                  }}
                />
                <View style={styles.cardInfo}>
                  {item?.node?.publishedAt ? (
                    <Text style={styles.DateText}>
                      {formatDate(item?.node?.publishedAt)}
                    </Text>
                  ) : null}
                  <Text style={styles.blogCardHeadText}>
                    {item?.node?.handle
                      ? item?.node?.handle?.length > 55
                        ? `${item?.node?.handle?.substring(0, 55)}...`
                        : item?.node?.handle
                      : ' '}
                  </Text>

                  <Text style={styles.blogCardContantText}>
                    {item?.node?.content
                      ? item?.node?.content?.length > 100
                        ? `${item?.node?.content?.substring(0, 100)}...`
                        : item?.node?.content
                      : ' '}
                  </Text>

                  <Text style={styles.blogCardBtnText}>{'View Details >'}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </ImageBackground>

        <View style={styles.bottomCardContainer}>
          <FlatList
            data={data5}
            renderItem={renderItem4}
            keyExtractor={(item, index) => index.toString()}
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
const data5 = [
  {
    id: '1',
    name: 'Private & Confidential',
    svg: <BottomGrp1 width={wp(6)} height={wp(6)} />,
  },
  {
    id: '2',
    name: 'Verified Vastu Experts',
    svg: <BottomGrp2 width={wp(6)} height={wp(6)} />,
  },
  {
    id: '3',
    name: 'Secure Payments',
    svg: <BottomGrp3 width={wp(5)} height={wp(5)} />,
  },
];
