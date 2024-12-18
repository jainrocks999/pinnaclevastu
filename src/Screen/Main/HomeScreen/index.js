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
  CourceDetailApi,
  CourceLis,
  Remedie,
  RemediesCategory,
  Service,
} from '../../../Redux/Slice/HomeSlice';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Loader from '../../../Component/Loader';
import Imagepath from '../../../Component/Imagepath';
import LinearGradient from 'react-native-linear-gradient';
let backPress = 0;
const HomeScreen = () => {
  const flatListRef = useRef(null);
  const navigation = useNavigation();
  const [isLiveCourse, setIsLiveCourse] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const dispatch = useDispatch();
  const Homebanner = useSelector(state => state.home?.HomeBanner);
  const Remediesproduct = useSelector(state => state.home?.Remedi?.data);
  const isLoading = useSelector(state => state.home?.loading);

  const servies = useSelector(state => state?.home?.services);
  const Live_cource = useSelector(state => state?.home?.Cource);

  const combinedData = servies?.map(service => {
    const matchedItem = data1?.find(
      item => item?.name === service?.services_name,
    );
    return {
      id: service.id,
      services_name: service.services_name,
      image: matchedItem ? matchedItem.image : null, // Add image if match is found
    };
  });

  const newArray = [];
  (Homebanner?.data?.[0]?.slider_items || []).forEach(item => {
    const formattedItem = {
      id: item.id,
      image: `${Imagepath.Path}${item.image}`,
      word: item.title,
    };

    newArray.push(formattedItem);
  });
  const focus = useIsFocused();

  const CouseDetail1 = async item => {
    await dispatch(
      CourceDetailApi({
        url: 'fetch-courses-details',
        course_id: item?.course_category_id,
        navigation,
      }),
    );
  };

  useEffect(() => {
    if (focus) {
      apicall();
    }
  }, [focus]);

  const apicall = async () => {
    await dispatch(Banner({url: 'home-slider'}));
    await dispatch(Remedie({url: 'remedies'}));
    await dispatch(Service({url: 'fetch-franchise-services'}));
    await dispatch(CourceLis({url: 'fetch-courses', slug: 'live'}));
  };
  const RemediesProductcategory = async item => {
    await dispatch(
      RemediesCategory({
        url: 'remedies-by-product',
        category_id: item.id,
        navigation,
        name: item.name,
      }),
    );
  };
  const handleImageChange = index => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({index, animated: true});
    }
    setCurrentIndex(index);
  };

  const renderItem = ({item}) => {
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

    return (
      <TouchableOpacity style={[styles.cardContainer, {backgroundColor}]}>
        <Image source={item.image} style={styles.itemImg} />
        <Text style={styles.text}>{item.services_name}</Text>
      </TouchableOpacity>
    );
  };

  const renderItem1 = ({item}) => {
    return (
      <TouchableOpacity style={[styles.smallCardContainer]}>
        <Image
          source={item.image}
          style={[styles.itemImg, {resizeMode: 'contain'}]}
        />
        <Text style={styles.smallCardtext}>{item.name}</Text>
      </TouchableOpacity>
    );
  };
  const renderItem2 = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => RemediesProductcategory(item)}
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
  const renderItem3 = ({item}) => {
    return (
      <TouchableOpacity style={[styles.cardContainer2]}>
        <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
          <Image source={item.image} style={styles.cardImage} />
          <View style={styles.infoSection}>
            <Text style={styles.third}>{item.name}</Text>
            <Text style={styles.third1}>{item.title}</Text>
            <Text style={styles.third2}>{item.address}</Text>
            <View style={styles.starContainer}>
              <Rating
                type="custom"
                tintColor={colors.white}
                ratingCount={5}
                imageSize={wp(3.5)}
                startingValue={item.rating}
                ratingColor="#52B1E9"
                ratingBackgroundColor={colors.lightGrey} // Unfilled star color
              />
              <Text style={[styles.third2]}>{item.rating}</Text>
            </View>
          </View>

          <Image
            source={require('../../../assets/otherApp/arrowrc.png')}
            style={styles.arrowNext}
          />
        </View>
      </TouchableOpacity>
    );
  };
  const renderItem4 = ({item}) => {
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity style={[styles.itemContainer]}>
          <Image
            source={item.image}
            style={{width: '35%', resizeMode: 'contain'}}
          />
          <Text style={styles.bottomCardtext}>{item.name}</Text>
        </TouchableOpacity>
        {item.id !== '3' ? <View style={styles.viewLine} /> : null}
      </View>
    );
  };

  const renderCard = ({item}) => {
    return (
      <View style={styles.card}>
        <Image
          source={
            item.image == null
              ? require('../../../assets/otherApp/courseCard1.png')
              : {uri: `${Imagepath.Path}${item?.image}`}
          }
          style={styles.cardImg}
        />
        <View style={styles.cardInfo}>
          <Text style={styles.DateText}>{item?.start_date}</Text>
          <Text style={styles.titleText}>{item?.title}</Text>
          <Text style={styles.regularText}>
            While Vastu Shastra gives us data about our...
          </Text>
          <Text style={styles.price}>{`₹ ${item?.price}`}</Text>
          <TouchableOpacity onPress={() => CouseDetail1(item)}>
            <Text style={styles.cardBtn}>View Details</Text>
          </TouchableOpacity>
        </View>
      </View>
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
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image source={require('../../../assets/image/Drawer.png')} />
        </TouchableOpacity>
        <Image source={require('../../../assets/image/header.png')} />
        <TouchableOpacity style={styles.bagIcon}>
          <Image source={require('../../../assets/image/Group.png')} />
        </TouchableOpacity>
      </View>
      {isLoading ? <Loader /> : null}
      <ScrollView contentContainerStyle={styles.servicesContainer}>
        <View style={styles.searchContainer}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image source={require('../../../assets/image/SearchIcon.png')} />
            <TextInput
              placeholder="Search..."
              style={styles.searchInput}
              placeholderTextColor={colors.searchBarTextColor}
            />
          </View>
          <TouchableOpacity style={styles.filterBtn}>
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
          data={combinedData ? combinedData : []}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />

        <ImageSlider
        data={imagesilder1}
        onPress ={(item,index)=>
           console.log('hh',index,item)
        
          // alert('Item Pressed', `Item: ${JSON.stringify(item)}, Index: ${index}`)
        
          // navigation.navigate('UserProfile')
        }
        />

        <View style={[styles.contain, {marginTop: wp(2)}]}>
          <Text style={styles.service}>Premium Services</Text>
        </View>
        <FlatList
          data={data2}
          renderItem={renderItem1}
          keyExtractor={item => item.id}
          numColumns={3}
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
              await dispatch(CourceLis({url: 'fetch-courses', slug: 'live'}));
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
                CourceLis({url: 'fetch-courses', slug: 'recorded'}),
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

        <View style={{paddingHorizontal: 10, marginVertical: 10}}>
          <FlatList
            ref={flatListRef}
            contentContainerStyle={styles.cardContainer0}
            data={Live_cource ? Live_cource?.slice(0, 4) : []}
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
            onMomentumScrollEnd={(e) => {
              const contentOffsetX = e.nativeEvent.contentOffset.x;
              const currentIndex = Math.round(contentOffsetX /wp(65)); // Calculate index based on item width
              setCurrentIndex(currentIndex); // Update the current index state
            }}
            
          />

          <View style={styles.dotContainer}>
            {(Live_cource ? Live_cource?.slice(0, 4) : []).map((_, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.dot, currentIndex === index && styles.activeDot]}
                onPress={() => {
                  if (index < (Live_cource?.length || 0)) {
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
            onPress={
              () =>
                navigation.reset({
                  index: 0,
                  routes: [{name: 'Home1', params: {screen: 'Remedie12'}}],
                })
              // navigation.navigate('Home1', {
              //   screen: 'Remedie12',
              //    params: {screen: 'Remedies'},
              // })
            }>
            <Text style={styles.service1}>VIEW ALL</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={Remediesproduct?.slice(0, 5)}
          renderItem={renderItem2}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 10, marginBottom: wp(8)}}
        />
        <View style={styles.consultationSection}>
          <View style={[styles.contain1, {}]}>
            <Text style={styles.service}>Consultation</Text>
            <Text style={styles.service1}>VIEW ALL</Text>
          </View>
          <FlatList
            data={data4}
            renderItem={renderItem3}
            keyExtractor={item => item.id}
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
  { id: '1', image: require('../../../assets/image/bannerImg1.png') },
  { id: '2', image: require('../../../assets/image/bannerImg2.png') },
  { id: '3', image: require('../../../assets/image/bannerImg3.png') },
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
