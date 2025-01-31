// import React, { useState , useEffect} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   FlatList,
//   ImageBackground,
//   Animated
// } from 'react-native';
// import styles from './styles';
// import { colors } from '../../../Component/colors';
// import BannerSlider from '../../../Component/Banner';

// import { Rating } from 'react-native-ratings';
// import { widthPrecent as wp } from '../../../Component/ResponsiveScreen/responsive';
// const ResidentalScreen = ({ navigation }) => {
//   const [textAnim] = useState(new Animated.Value(1)); // Animation state

//   // Text animation for "Which direction boosts success?"
//   useEffect(() => {
//     Animated.loop(
//       Animated.sequence([
//         Animated.timing(textAnim, {
//           toValue: 0.9,
//           duration: 3000,
//           useNativeDriver: true,
//         }),
//         Animated.timing(textAnim, {
//           toValue: 1,
//           duration: 3000,
//           useNativeDriver: true,
//         }),
//       ])
//     ).start();
//   }, [textAnim]);
//   const renderItem3 = ({ item }) => {
//     return (
//       <TouchableOpacity
//         onPress={() => navigation.navigate('profile')}
//         style={[styles.cardContainer2]}>
//         <View
//           style={{
//             flexDirection: 'row',
//             // gap: 15,
//             alignItems: 'flex-start',
//           }}>
//           <View style={styles.imgContainer}>
//             <Image
//               style={styles.cardImage}
//               source={item.image} />

//             <View style={styles.direction}>
//               <Rating
//                 type="custom"
//                 tintColor={colors.white}
//                 ratingCount={5}
//                 imageSize={wp(3.8)}
//                 startingValue={2}
//                 ratingColor="#52B1E9"
//                 ratingBackgroundColor={colors.lightGrey} // Unfilled star color
//               />
//             </View>
//           </View>
//           <View style={styles.card}>
//             <Text style={styles.third1}>{item.name}</Text>

//             <Text style={[styles.third2,{marginBottom:2}]}>Services : {item.services}</Text>
//             <Text style={styles.third2}>{item.languages}</Text>
//             <Text style={styles.third2}>Exp: {item.experience}</Text>
//             <Text style={styles.priceText}>Price: {item.price}</Text>
//           </View>
//           <Image
//             style={styles.nextBtn}
//             source={require('../../../assets/drawer/raero.png')}
//           />
//         </View>
//       </TouchableOpacity>

//     );
//   };

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity
//           onPress={() => navigation.goBack()}>
//           <Image
//             style={styles.backBtn}
//             source={require('../../../assets/drawer/Back1.png')}
//           />
//         </TouchableOpacity>

//         <View style={styles.headerview}>
//           <Text style={styles.logoText}>Residential Vastu Experts</Text>
//         </View>
//       </View>

//       <ScrollView contentContainerStyle={styles.servicesContainer}>
//         <View style={styles.searchContainer}>
//           <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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

//         {/* <View style={styles.main}>
//           <Image
//             style={styles.arrowIcon}
//             source={require('../../../assets/drawer/aero.png')}
//           />
//           <Text style={styles.title}>Which direction boosts success?</Text>
//           <Image
//             style={styles.arrowIcon}
//             source={require('../../../assets/drawer/raero.png')}
//           />
//         </View> */}
//           <View style={styles.main}>
//           <Image
//             style={styles.arrowIcon}
//             source={require('../../../assets/drawer/aero.png')}
//           />
//           {/* Animated Text */}
//           <Animated.Text
//             style={[
//               styles.title,
//               {
//                 transform: [
//                   {
//                     scale: textAnim, // Apply animation
//                   },
//                 ],
//               },
//             ]}
//           >
//             Which direction boosts success?
//           </Animated.Text>
//           <Image
//             style={styles.arrowIcon}
//             source={require('../../../assets/drawer/raero.png')}
//           />
//         </View>
//         <FlatList
//           data={DATA}
//           renderItem={renderItem3}
//           keyExtractor={item => item.id}
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={styles.listContainer}
//         />
//       </ScrollView>

//     </View>
//   );
// };

// export default ResidentalScreen;

// const DATA = [
//   {
//     id: '1',
//     name: 'Shreni Rajbhandary',
//     services: 'Residential Vastu, Industrial Vastu, Gemstone',
//     languages: 'Marathi, Hindi, English',
//     experience: '6 Years',
//     price: '₹ 500 to ₹ 25000',
//     image: require('../../../assets/image/Rectangle.png'), // Replace with your image path
//   },
//   {
//     id: '2',
//     name: 'Deepika',
//     services: 'Commercial Vastu, Numerology, Rudraksha',
//     languages: 'Marathi, Hindi, English',
//     experience: '5 Years',
//     price: '₹ 600 to ₹ 20000',
//     image: require('../../../assets/image/Im.png'),
//   },
//   {
//     id: '2',
//     name: 'Payal Gupta',
//     services: 'Commercial Vastu, Numerology, Rudraksha',
//     languages: 'Marathi, Hindi, English',
//     experience: '5 Years',
//     price: '₹ 600 to ₹ 20000',
//     image: require('../../../assets/image/Imag.png'),
//   },
//   {
//     id: '1',
//     name: 'Shreni Rajbhandary',
//     services: 'Residential Vastu, Industrial Vastu, Gemstone',
//     languages: 'Marathi, Hindi, English',
//     experience: '6 Years',
//     price: '₹ 500 to ₹ 25000',
//     image: require('../../../assets/image/Rectangle.png'), // Replace with your image path
//   },
//   {
//     id: '2',
//     name: 'Deepika',
//     services: 'Commercial Vastu, Numerology, Rudraksha',
//     languages: 'Marathi, Hindi, English',
//     experience: '5 Years',
//     price: '₹ 600 to ₹ 20000',
//     image: require('../../../assets/image/Im.png'),
//   },
//   {
//     id: '2',
//     name: 'Payal Gupta',
//     services: 'Commercial Vastu, Numerology, Rudraksha',
//     languages: 'Marathi, Hindi, English',
//     experience: '5 Years',
//     price: '₹ 600 to ₹ 20000',
//     image: require('../../../assets/image/Imag.png'),
//   },
// ];

import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Animated,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  TextInput,
} from 'react-native';
import styles from './styles';
import {colors} from '../../../Component/colors';
import {Rating} from 'react-native-ratings';
import {widthPrecent as wp} from '../../../Component/ResponsiveScreen/responsive';
import {useDispatch, useSelector} from 'react-redux';
// import {clearConsultationDetail, consultationDetail1} from '../../../Redux/Slice/HomeSlice';
import {consultationDetail1} from '../../../Redux/Slice/ConsultancySlice';
import {getCosultationListApi} from '../../../Redux/Slice/ConsultancySlice';
import Imagepath from '../../../Component/Imagepath';
import {useIsFocused, useNavigation} from '@react-navigation/native';

const ResidentalScreen = ({route}) => {
  const navigation = useNavigation();
  const itemId = route?.params?.itemId;
  const [textAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(1));
  const [scaleAnims, setScaleAnims] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const animatedValue = useRef(new Animated.Value(1)).current;
  const bgAnim = useRef(new Animated.Value(0)).current;
  const CosultationListData = useSelector(
    state => state.consultation.ConsultationList,
  );
  const ConsultancyLoading = useSelector(state => state?.consultation?.loading);
  const focus = useIsFocused();

  const dispatch = useDispatch();

  const textItems = [
    {text: 'Which direction boosts success?', color: '#B1F0F7'},
    {text: 'Unlock Prosperity with Vastu!', color: '#E195AB'},
    {text: 'Transform Space, Elevate Success', color: '#FFE7A7'},
  ];

  const placeholderText = 'Search';
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    apicall();
  }, [focus]);

  const apicall = async () => {
    await dispatch(
      getCosultationListApi({
        url: `fetch-franchise-list?franchise_services_id=${
          itemId ? itemId : 0
        }`,
      }),
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      slideText('left');
    }, 4000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 0.9,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [animatedValue]);

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

  const slideText = direction => {
    const newIndex =
      direction === 'left'
        ? currentIndex === textItems.length - 1
          ? 0
          : currentIndex + 1
        : currentIndex === 0
        ? textItems.length - 1
        : currentIndex - 1;

    Animated.timing(bgAnim, {
      toValue: newIndex,
      duration: 600,
      useNativeDriver: false,
    }).start();

    setCurrentIndex(newIndex);
    scaleAnim.setValue(0.8);
    Animated.parallel([
      Animated.timing(textAnim, {
        toValue: direction === 'left' ? -wp(100) : wp(100),
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start(() => {
      textAnim.setValue(0);
      scaleAnim.setValue(1);
    });
  };

  const backgroundColor = bgAnim.interpolate({
    inputRange: textItems.map((_, index) => index),
    outputRange: textItems.map(item => item.color),
  });

  const handlePress = (index, itemId) => {
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
      // dispatch(clearConsultationDetail())
      await dispatch(
        consultationDetail1({
          url: 'fetch-franchise-details',
          franchise_id: itemId,
          navigation,
        }),
      );
      // navigation.navigate('profile');
    });
  };

  const calculateAverageRating = reviews => {
    const totalRatings = reviews?.reduce(
      (sum, review) => sum + JSON.parse(review?.star),
      0,
    );
    const averageRating =
      reviews?.length > 0 ? totalRatings / reviews?.length : 0;
    return averageRating?.toFixed(1);
  };
  const renderItem3 = ({item, index}) => {
    const itemScaleAnim = scaleAnims[index] || new Animated.Value(1);

    return (
      <Animated.View
        style={[
          styles.cardContainer2,
          {
            transform: [{scale: itemScaleAnim}],
          },
        ]}>
        <TouchableOpacity onPress={() => handlePress(index, item.id)}>
          <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
            <View style={styles.imgContainer}>
              {/* <Image
              style={[
                styles.cardImage,
                
              ]}
              source={item.image}
            /> */}
              <Image
                source={
                  item.logo
                    ? {uri: `${Imagepath.Path}${item?.logo}`}
                    : require('../../../assets/image/Remedies/Image-not.png')
                }
                style={styles.cardImage}
              />
              <View style={styles.direction}>
                {calculateAverageRating(item?.reviews) != 0 ? (
                  <Rating
                    type="custom"
                    tintColor={colors.white}
                    ratingCount={5}
                    imageSize={wp(3.8)}
                    startingValue={calculateAverageRating(item?.reviews)}
                    ratingColor="#52B1E9"
                    readonly
                    ratingBackgroundColor={colors.lightGrey}
                  />
                ) : null}
              </View>
            </View>
            <View style={styles.card}>
              <Text style={styles.third1}>{item.franchise_name}</Text>

              <Text style={[styles.third2, {marginBottom: 2}]}>
                Services :{' '}
                {item?.franchise_services
                  ?.map(service => service.service_name)
                  .join(', ')}
              </Text>
                <Text style={styles.third2}>
                  {' '}
                  {item?.language?.map(language => language).join(', ')}
                </Text>
           
              <Text style={styles.third2}>
                Exp: {item?.experience_of_year} year
              </Text>
              <Text style={styles.priceText}>Price:₹ {item?.charges}</Text>
            </View>
            <Image
              style={styles.nextBtn}
              source={require('../../../assets/drawer/raero.png')}
            />
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
          <Image
            style={styles.backBtn}
            source={require('../../../assets/drawer/Back1.png')}
          />
        </TouchableOpacity>

        <View style={styles.headerview}>
          <Text style={styles.logoText}>{route?.params?.servicesName || 'Vastu'} Experts</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.servicesContainer}>
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

        <Animated.View style={[styles.main, {backgroundColor}]}>
          <TouchableOpacity
            onPress={() => slideText('right')}
            activeOpacity={0.6}
            style={styles.arrowButton}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
            <Image
              style={styles.arrowIcon}
              source={require('../../../assets/drawer/aero.png')}
            />
          </TouchableOpacity>

          <Animated.View
            style={[
              styles.titleContainer,
              {transform: [{translateX: textAnim}]},
            ]}>
            <Animated.Text
              style={[styles.title, {transform: [{scale: animatedValue}]}]}>
              {textItems[currentIndex].text}
            </Animated.Text>
          </Animated.View>

          <TouchableOpacity
            onPress={() => slideText('left')}
            activeOpacity={0.6}
            style={styles.arrowButton}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
            <Image
              style={styles.arrowIcon}
              source={require('../../../assets/drawer/raero.png')}
            />
          </TouchableOpacity>
        </Animated.View>

        {CosultationListData.length !== 0 ? (
          <FlatList
            // data={DATA}
            data={CosultationListData}
            renderItem={renderItem3}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            contentContainerStyle={styles.listContainer}
          />
        ) : (
          !ConsultancyLoading && (
            <View style={styles.emptyMessageContainer}>
              <Text style={styles.emptyMessage}>
                Sorry, no Vastu experts were found for this service.
              </Text>
            </View>
          )
        )}
      </ScrollView>
    </View>
  );
};

export default ResidentalScreen;

const DATA = [
  {
    id: '1',
    name: 'Shreni Rajbhandary',
    services: 'Residential Vastu, Industrial Vastu, Gemstone',
    languages: 'Marathi, Hindi, English',
    experience: '6 Years',
    price: '₹ 500 to ₹ 25000',
    image: require('../../../assets/image/Rectangle.png'),
  },
  {
    id: '2',
    name: 'Deepika',
    services: 'Commercial Vastu, Numerology, Rudraksha',
    languages: 'Marathi, Hindi, English',
    experience: '5 Years',
    price: '₹ 600 to ₹ 20000',
    image: require('../../../assets/image/Im.png'),
  },
  {
    id: '3',
    name: 'Payal Gupta',
    services: 'Commercial Vastu, Numerology, Rudraksha',
    languages: 'Marathi, Hindi, English',
    experience: '5 Years',
    price: '₹ 600 to ₹ 20000',
    image: require('../../../assets/image/Imag.png'),
  },
];
