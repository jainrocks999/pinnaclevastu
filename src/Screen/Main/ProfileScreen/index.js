import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Animated,
  Linking,
  Alert,
  Share,
} from 'react-native';
import styles from './styles';
import {colors} from '../../../Component/colors';
import {Rating} from 'react-native-ratings';
import {widthPrecent as wp} from '../../../Component/ResponsiveScreen/responsive';
import {useNavigation} from '@react-navigation/native';
import {consultationDetail1} from '../../../Redux/Slice/HomeSlice';
import {useSelector} from 'react-redux';
import Imagepath from '../../../Component/Imagepath';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-simple-toast';
const ResidentalScreen = ({navigation}) => {
  const userDetail = useSelector(state => state?.Auth?.userData);
  // const data = useSelector(state => state?.home?.ConsultationDetail?.data);
  const data = useSelector(state => state.consultation.ConsultationDetail);

  // console.log(fromScreen," se aaya hai....")
  // console.log(data,"scmlsmkcl")

  const [scaleAnims, setScaleAnims] = useState({});
  const buttonAnimatedValue = useRef(new Animated.Value(1)).current;

  const data2 = [
    {
      id: '1',
      image: require('../../../assets/image/house.png'),
      name: 'Residential Vastu',
    },
    {
      id: '3',
      image: require('../../../assets/image/industry.png'),
      name: 'Industrial Vastu',
    },
    {
      id: '5',
      image: require('../../../assets/image/Layer_x.png'),
      name: 'Gemstone',
    },
  ];

  const openApp = async (url, fallbackUrl) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        if (fallbackUrl) {
          await Linking.openURL(fallbackUrl);
        } else {
          Alert.alert(
            'App Not Installed',
            'The app is not installed on your device.',
          );
        }
      }
    } catch (error) {
      // Alert.alert('Error', `An error occurred: ${error.message}`);
    }
  };
  const share = async () => {
    try {
      await Share.share({
        message: 'Check out this amazing app: https://example.com',
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };
  const copyToClipboard = async () => {
    const textToCopy = "This is the text you want to copy"; // Replace with your desired text or URL
    try {
       await Clipboard.setString(textToCopy);
       Toast.show({
        type: 'success', 
        text1: 'Copied!', 
        text2: 'Text copied to clipboard successfully!', 
      });
    } catch (error) {
      console.log('error',error);
      
      Alert.alert("Error", "Failed to copy text.");
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
      if (userDetail.length === 0) {
        navigation.navigate('Login', {from: 'profile'});
      } else {
        navigation.navigate('Appoiment');
      }
    });
  };

  const handleItemClick = index => {
    const newScaleAnims = {...scaleAnims};

    // Create the animated value for the clicked item if not already present
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
    ]).start();
  };
  const renderItem = ({item, index}) => {
    
    let backgroundColor;

    if (item.services_name === 'Residential Vastu') {
      backgroundColor = colors.card4;
    } else if (item.services_name === 'Industrial Vastu') {
      backgroundColor = colors.card3;
    } else if (item.services_name === 'Gemstone') {
      backgroundColor = colors.card2;
    } else {
      backgroundColor = colors.card3;
    }
    const itemScaleAnim = scaleAnims[index] || new Animated.Value(1);
    return (
      <Animated.View
        style={[
          // styles.cardContainer,
          {
            transform: [{scale: itemScaleAnim}], // Apply scale animation to the view
          },
        ]}>
        <TouchableOpacity
          style={[
            styles.cardContainer,
            {
              backgroundColor: item?.color_code!=null?item?.color_code:colors.card3,
              width:
                data?.franchise_services.length == 1
                  ? wp(90)
                  : data?.franchise_services.length == 2
                  ? wp(45)
                  : wp(30),
            },
          ]}
          onPress={() => handleItemClick(index)}>
          <Image
            source={
              item.logo
                ? {uri: `${Imagepath.Path}${item.logo}`}
                : require('../../../assets/image/Remedies/Image-not.png')
            }
            style={styles.image}
          />
          <Text style={styles.text}>{item.services_name}</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };
  const [showAll, setShowAll] = useState(false);
  const filteredReviews = showAll ? data?.reviews : data?.reviews?.slice(0, 3);
  const renderItem3 = ({item}) => {
    return (
      <TouchableOpacity
       
        style={[styles.cardContainer1]}>
        <View style={styles.reviewCard}>
          <View style={{paddingLeft: 5}}>
            <Image style={styles.reviewImage} source={
              item?.images?
              {uri:`${Imagepath?.Path}${item.images}`}:
              require('../../../assets/image/Remedies/Image-not.png')
              } />
            <Rating
              type="custom"
              tintColor={colors.white}
              ratingCount={5}
              imageSize={wp(3.5)}
              startingValue={item.star}
              ratingColor="#52B1E9"
              readonly
              ratingBackgroundColor={colors.lightGrey} // Unfilled star color
            />
          </View>
          <View style={[styles.card, {paddingLeft: 10}]}>
            <Text style={styles.third1}>{item.customer_name}</Text>

            <Text style={[styles.third2, {marginTop: -8}]}>{item?.comment}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };



  const calculateAverageRating = reviews => {
    const totalRatings = reviews?.reduce(
      (sum, review) => sum + JSON.parse(review.star),
      0,
    );
    
    const averageRating =
      reviews?.length > 0 ? totalRatings / reviews.length : 0;
    return averageRating.toFixed(1);
  };


  const averageRating = calculateAverageRating(data?.reviews);
  console.log(averageRating,'averageRating');
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
          <Text style={styles.logoText}>Profile</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.servicesContainer}>
        <View style={styles.cardContainer1}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
            }}>
            <View style={styles.imgContainer}>
              {/* <Image
                style={styles.cardImage}
                source={require('../../../assets/image/Rectangle.png')}
              /> */}
              <Image
                source={
                  data?.logo
                    ? {uri: `${Imagepath.Path}${data?.logo}`}
                    : require('../../../assets/image/Remedies/Image-not.png')
                }
                style={styles.cardImage}
              />
              <View style={styles.direction}>
                <Rating
                  type="custom"
                  tintColor={colors.white}
                  ratingCount={5}
                  imageSize={wp(3.8)}
                  startingValue={averageRating}
                  ratingColor="#52B1E9"
                  readonly
                  ratingBackgroundColor={colors.lightGrey} // Unfilled star color
                />
              </View>
            </View>
            <View style={styles.card}>
              <Text style={styles.third1}>{data?.franchise_name}</Text>

              <Text style={[styles.third2, {marginBottom: 3}]}>
                Services:{' '}
                {data?.franchise_services
                  ?.map(service => service.services_name) // Extract all services_name
                  .join(', ')}
              </Text>

              <Text style={styles.third2}>{data?.language}</Text>
              <Text style={styles.third2}>Exp: {data?.experience_of_year}</Text>
              {/* <Text style={styles.priceText}>
                Price: {data?.franchise_services?.services_price}
              </Text> */}
              <Text style={styles.priceText}>
                Price: ₹{' '}
                {/* {data?.franchise_services?.reduce(
                  (total, service) => total + service.services_price,
                  0,
                )} */}
                {data?.charges}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.contain}>
          <Text style={styles.service}>Specialist</Text>
        </View>
        <FlatList
          // data={data2}
          data={data?.franchise_services || [].slice(0, 3)}
          renderItem={renderItem}
          scrollEnabled={false}
          keyExtractor={item => item.id}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          // contentContainerStyle={{
          //   alignSelf: 'center',
          //   justifyContent:"center",
          //   gap: 15,
          //   paddingHorizontal: 0,
          //   width:"100%",
          //   borderWidth:1
          // }}
          contentContainerStyle={{
            flexDirection: 'row',
            justifyContent: 'center',
            // justifyContent: data?.franchise_services.length == 1 ? "center" : "space-between", // Adjust based on item count
            // paddingHorizontal:  data?.franchise_services?.length == 1 ? 0 : 10, // Adjust padding
            width: '100%',
          }}
        />
        <View style={{paddingHorizontal: 10}}>
          <Text style={styles.cont}>{data?.short_description}</Text>
        </View>

        <View style={{paddingHorizontal: 10}}>
          <Text style={styles.cont}>{data?.content}</Text>
        </View>

        <View style={styles.shareview}>
          <View style={styles.rowSection}>
            <TouchableOpacity style={styles.shareIcon} onPress={() => share()}>
              <Image
                style={styles.shareIcon}
                source={require('../../../assets/otherApp/share.png')}
              />
            </TouchableOpacity>

            <Text style={[styles.cont, {marginTop: 0}]}>{'Share it :'}</Text>
            {/* <Image
              style={styles.socialImg}
              source={require('../../..//assets/drawer/fb.png')}
            /> */}
            <TouchableOpacity
              onPress={() => openApp('fb://profile', 'https://facebook.com')}>
              <Image
                style={styles.socialImg}
                source={require('../../..//assets/drawer/fb.png')}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                openApp('instagram://app', 'https://instagram.com')
              }>
              <Image
                style={styles.socialImg}
                source={require('../../../assets/drawer/instagram.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>copyToClipboard()}>
              <Image
                style={styles.socialImg}
                source={require('../../../assets/drawer/copy.png')}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.btext}>Write a Review</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.reviewSection}>
          {data?.reviews?.length!=0? 
          <>
          <View style={styles.contain}>
            <Text style={styles.service}>User Reviews ({data?.reviews?.length})</Text>
          </View>
          <FlatList
            data={filteredReviews}
            scrollEnabled={false}
            renderItem={renderItem3}
            keyExtractor={item => item.id}
            //   numColumns={3}
            showsVerticalScrollIndicator={false}
          />

        <TouchableOpacity onPress={() => setShowAll(!showAll)}>
          <Text style={styles.seeall}>{filteredReviews?.reviews?.length > 3 &&  'See all Reviews'}</Text>
        </TouchableOpacity>
     </>:null}
        </View>
      </ScrollView>
      <TouchableOpacity onPress={handlePress} activeOpacity={1}>
        <Animated.View
          style={[
            styles.book,
            {
              transform: [{scale: buttonAnimatedValue}],
              backgroundColor: colors.orange,
            },
          ]}>
          <Text style={styles.btext1}>BOOK NOW</Text>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

export default ResidentalScreen;

const data1 = [
  {
    id: '1',
    image: require('../../../assets/image/Ellipse1.png'),
    name: 'Vikash',
    msg: 'Thanku so much madam ji ',
  },
  {
    id: '3',
    image: require('../../../assets/image/Ellipse2.png'),
    name: 'Sudhir',
    msg: 'Thanku so much madam ',
  },
  {
    id: '5',
    image: require('../../../assets/image/Ellipse3.png'),
    name: 'Hemant',
    msg: 'VeryNice',
  },
];
