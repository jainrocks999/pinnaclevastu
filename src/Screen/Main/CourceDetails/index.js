import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
  Linking,
  Dimensions,
  Animated,
  Share,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Collapsible from 'react-native-collapsible';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import Imagepath from '../../../Component/Imagepath';
import {widthPrecent} from '../../../Component/ResponsiveScreen/responsive';
import RenderHTML from 'react-native-render-html';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import WebView from 'react-native-webview';
import constants from '../../../Redux/constant/constants';
import {checkout} from '../../../models/Checkout';
import {convertVariantId} from '../../../common/shopifyConverter';
import Toast from 'react-native-simple-toast';
import {fetchProduct, InitProduct} from '../../../Redux/Slice/productSlice';
import {getProductMetafieldsApiCall} from '../../../Redux/Api';
import Loader from '../../../Component/Loader';
const {width} = Dimensions.get('window');

const CourseDetail = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const coursetype = route?.params?.coursetype;
  const Detail1 = useSelector(state => state?.Product?.productDetails);
  const [metaData, setMetaData] = useState([]);
  const [userType, setUserType] = useState('');
  const CourceDetailA = useSelector(state => state?.home?.CourceDetailA);
  const isLoading = useSelector(state => state.home?.loading);
  const [isMetaDataLoading, setIsMetaDataLoading] = useState(false);
  const [videoPlay, setVideoPlay] = useState(true);
  const [videoState, setVideoState] = useState({
    isPlaying: true,
    controlsVisible: false,
  });
  const buttonAnimatedValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    getUserType();
    handleApi(route?.params?.itemId);
    setVideoState(prevState => ({
      ...prevState,
      isPlaying: false,
    }));
  }, []);

  const handleApi = async itemId => {
    setIsMetaDataLoading(true);
    dispatch(InitProduct());
    dispatch(fetchProduct(itemId));

    const data = await getProductMetafieldsApiCall(itemId);
    setMetaData(data?.metafields);
    setIsMetaDataLoading(false);
  };

  console.log(metaData, 'meta data');

  const groupedMeta = metaData
    ?.filter(item => item?.key?.includes('question'))
    ?.map(question => {
      const keyPrefix = question?.key?.match(/\d+/)?.[0];
      const answer = metaData
        ?.filter(item => item?.key?.includes('answer'))
        ?.find(ans => ans?.key?.includes(`${keyPrefix}_answer`));

      return {
        question,
        answer,
      };
    });

  const getUserType = async () => {
    const userStatus = await AsyncStorage.getItem('user_data');
    const userData = userStatus ? JSON.parse(userStatus) : null;
    const userType = userData?.user_type;
    setUserType(userType);
  };
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleImageChange = index => {
    setCurrentIndex(index);
  };

  const [expandedSection, setExpandedSection] = useState(null);

  // const videoData = CourceDetailA?.demo_video
  //   ? JSON.parse(CourceDetailA.demo_video)
  //   : [];

  // let videoFileName = null;
  // videoData.forEach(videoItem => {
  //   if (!videoFileName) {
  //     const fileItem = videoItem.find(
  //       item => item.key === 'file' && item.value !== null,
  //     );
  //     const urlItem = videoItem.find(
  //       item => item.key === 'url' && item.value !== null,
  //     );

  //     if (fileItem) {
  //       videoFileName = `${Imagepath.Path}${fileItem.value}`;
  //     } else if (urlItem) {
  //       videoFileName = urlItem.value;
  //     }
  //   }
  // });
  // const isYouTubeUrl1 =
  //   videoFileName?.includes('youtube.com') ||
  //   videoFileName?.includes('youtu.be');
  // let finalUrl1 = videoFileName;

  // if (isYouTubeUrl1) {
  //   let videoId = videoFileName?.split('youtu.be/')[1]?.split('?')[0];
  //   if (!videoId) {
  //     videoId = videoFileName?.split('v=')[1]?.split('&')[0];
  //   }
  //   finalUrl1 = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=1&autohide=1&enablejsapi=1`;
  // }

  // const videoDat = CourceDetailA?.course_video
  //   ? JSON.parse(CourceDetailA.course_video)
  //   : [];

  // let videoFileName1 = null;

  // videoDat.forEach(videoItem => {
  //   if (!videoFileName1) {
  //     const fileItem = videoItem.find(
  //       item => item.key === 'file' && item.value !== null,
  //     );
  //     const urlItem = videoItem.find(
  //       item => item.key === 'url' && item.value !== null,
  //     );
  //     if (fileItem) {
  //       videoFileName1 = `${Imagepath.Path}${fileItem.value}`;
  //     } else if (urlItem) {
  //       videoFileName1 = urlItem.value;
  //     }
  //   }
  // });

  // const isYouTubeUrl =
  //   videoFileName1?.includes('youtube.com') ||
  //   videoFileName1?.includes('youtu.be');
  // let finalUrl = videoFileName1;

  // if (isYouTubeUrl) {
  //   let videoId = videoFileName1?.split('youtu.be/')[1]?.split('?')[0];
  //   if (!videoId) {
  //     videoId = videoFileName1.split('v=')[1]?.split('&')[0];
  //   }
  //   finalUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=1&autohide=1&enablejsapi=1`;
  // }

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }

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
 
  const toggleSection = id => {
    setExpandedSection(prevSection => (prevSection == id ? null : id));
  };

  const handleJoinCourse = () => {
    Animated.sequence([
      Animated.timing(buttonAnimatedValue, {
        toValue: 0.94,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(buttonAnimatedValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (userType) {
        if (Detail1?.variants?.length != 0) {
          const image = Detail1?.images[0]?.src;
          let product = {...Detail1};

          product.selectedVarient = product?.variants?.[0];

          let productTemp = {
            ...product,
            image,
            qty: 1,
            productId: product?.id,
            compareAtPrice: product?.variants?.[0]?.compare_at_price,
            price: product?.variants?.[0]?.price,
            id: isNaN(product?.selectedVarient.id)
              ? convertVariantId(product?.selectedVarient.id)
              : convertVariantId(product?.selectedVarient.id),

            properties: {},
          };

          if (productTemp?.availableForSale) {
            checkout([productTemp], navigation);
          } else {
            Toast.show('This course is currently not available for sale');
          }
        }
      } else {
        navigation.navigate('Login', {from: 'CourseDetails'});
      }
    });
  };

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Image source={item.icon} style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );

  const renderItems = ({item, index}) => (
    <View style={styles.paddings}>
      <TouchableOpacity
        onPress={() => toggleSection(item.id)}
        style={[
          styles.courseToggle1,
          expandedSection === item.id && styles.activeCourseToggle,
        ]}>
        <View style={styles.direction1}>
          <Text
            style={[
              styles.coursetext2,
              expandedSection === item.id && styles.activeTitleColor,
            ]}>
            {item.title}
          </Text>
        </View>
        <Image
          source={
            expandedSection === item.id
              ? require('../../../assets/otherApp/updown1.png')
              : require('../../../assets/image/arrow_icon.png')
          }
          style={styles.toggleIcon2}
        />
      </TouchableOpacity>

      <Collapsible collapsed={expandedSection !== item.id}>
        <View style={styles.subItemContainer}>
          {item.subItems.map((subItem, subIndex) => (
            <Text key={subIndex} style={styles.subItemText}>
              {subItem}
            </Text>
          ))}
        </View>
      </Collapsible>
    </View>
  );

  const renderCollapsibleItem = item => {
    return (
      <View style={styles.paddings}>
        <TouchableOpacity
          onPress={() => toggleSection(item?.question?.id)}
          style={[
            styles.courseToggle1,
            expandedSection == item?.question?.id && styles.activeCourseToggle,
          ]}>
          <View style={styles.direction1}>
            <Text
              style={[
                styles.coursetext2,
                expandedSection == item?.question?.id &&
                  styles.activeTitleColor,
              ]}>
              {item?.question?.value}
            </Text>
          </View>
          <Image
            source={
              expandedSection == item?.question?.id
                ? require('../../../assets/otherApp/updown1.png')
                : require('../../../assets/image/arrow_icon.png')
            }
            style={[styles.toggleIcon2]}
          />
        </TouchableOpacity>

        <Collapsible collapsed={expandedSection != item?.question?.id}>
          <View style={styles.subItemContainer}>
            <Text style={styles.subItemTitle}>{item?.answer?.value}</Text>
          </View>
        </Collapsible>
      </View>
    );
  };

  const phoneNumber = '+919153300111';

  const openWhatsApp = async () => {
    const appUrl = `whatsapp://send?phone=${phoneNumber}`;
    const webUrl = `https://wa.me/${phoneNumber}`;

    try {
      // Check if WhatsApp is installed
      const supported = await Linking.canOpenURL(appUrl);
      if (supported) {
        await Linking.openURL(appUrl);
      } else {
        await Linking.openURL(webUrl);
      }
    } catch (error) {
      // Handle errors
      Alert.alert('Error', 'Unable to open WhatsApp. Please try again later.');
      console.error('Failed to open WhatsApp:', error);
    }
  };

  const handleShare = async () => {
    try {
      const product = `${constants?.mainUrl}fetch-courses-details?course_id=${CourceDetailA?.id}`;
      const result = await Share.share({
        message: `Check out this awesome app! ${product}`, // Text to share
        url: product,
        title: 'Share this App', // Title of the share dialog
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared with activity type: ', result.activityType);
        } else {
          console.log('Shared successfully!', product);
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed!');
      }
    } catch (error) {
      console.error('Error sharing content: ', error.message);
    }
  };
  const handleVideoPress = () => {
    setVideoState(prevState => ({
      isPlaying: !prevState.isPlaying,
      controlsVisible: !prevState.controlsVisible,
    }));
  };

  return (
    <View style={styles.container}>
      {isLoading || isMetaDataLoading ? <Loader /> : null}
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
          <Text style={styles.logoText}>Course Detail</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollview}>
        <TouchableOpacity style={styles.firstimgview}>
          {metaData?.find(item => item?.key?.includes('lecture')) ? (
            <WebView
              source={{
                uri: getYouTubeEmbedUrl(
                  metaData?.find(item => item?.key?.includes('lecture'))?.value,
                ),
              }}
              style={styles.img1}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              allowsFullscreenVideo={true}
            />
          ) : (
            <Image
              source={
                Detail1?.images?.[0]?.src
                  ? {uri: Detail1?.images?.[0]?.src}
                  : require('../../../assets/image/Remedies/Image-not.png')
              }
              resizeMode="cover"
              style={styles.img1}
            />
          )}
        </TouchableOpacity>
        <View style={styles.advanceview}>
          <Text style={styles.advancetext}>{Detail1?.title} </Text>

          <Text style={styles.learntext}>
            {metaData.find(item => item.key?.includes('description'))?.value ||
              ''}
          </Text>
          <View style={styles.direction}>
            <View style={{flexDirection: 'row', gap: 10}}>
              {Detail1?.variants?.[0]?.price && (
                <Text style={[styles.ruppestext]}>
                  {`₹ ${Detail1?.variants?.[0]?.price}`}
                </Text>
              )}
              {Detail1?.variants?.[0]?.compare_at_price >
                Detail1?.variants?.[0]?.price &&
                Detail1?.variants?.[0]?.compare_at_price >= 0 && (
                  <Text
                    style={[
                      styles.ruppestext,
                      {textDecorationLine: 'line-through', color: 'gray'},
                    ]}>
                    {`₹ ${Detail1?.variants?.[0]?.compare_at_price}`}
                  </Text>
                )}
            </View>
            <TouchableOpacity onPress={() => handleShare()}>
              <Image
                source={require('../../../assets/otherApp/share.png')}
                style={styles.shareimage}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.horizontalLine} />
        <View style={styles.card}>
          {metaData?.find(item => item?.key?.includes('language')) && (
            <>
              <View style={styles.cardItem}>
                <Image
                  source={require('../../../assets/otherApp/cardimg1.png')}
                  style={styles.cardimg1}
                />
                <Text style={styles.languagetext}>Languages</Text>
                <Text style={styles.languagetext1}>
                  {
                    metaData?.find(item => item?.key?.includes('language'))
                      ?.value
                  }
                </Text>
              </View>
              <View style={styles.verticalLine} />
            </>
          )}
          {metaData?.find(item => item?.key?.includes('date')) && (
            <>
              <View style={styles.cardItem}>
                <Image
                  source={require('../../../assets/otherApp/cardimg1.png')}
                  style={styles.cardimg1}
                />
                <Text style={styles.languagetext}>Date</Text>
                <Text style={styles.languagetext1}>
                  {formatDate(
                    metaData?.find(item => item?.key?.includes('date'))?.value,
                  )}
                </Text>
              </View>
              <View style={styles.verticalLine} />
            </>
          )}
          {metaData?.find(item => item?.key?.includes('time')) && (
            <>
              <View style={styles.cardItem}>
                <Image
                  source={require('../../../assets/otherApp/cardimg1.png')}
                  style={styles.cardimg1}
                />
                <Text style={styles.languagetext}>Time</Text>
                <Text style={styles.languagetext1}>
                  {metaData?.find(item => item?.key?.includes('time'))?.value}
                </Text>
              </View>
              <View style={styles.verticalLine} />
            </>
          )}
          {metaData?.find(item => item?.key?.includes('trained')) && (
            <View style={styles.cardItem}>
              <Image
                source={require('../../../assets/otherApp/cardimg1.png')}
                style={styles.cardimg1}
              />
              <Text style={styles.languagetext}>Trained</Text>
              <Text style={styles.languagetext1}>
                {metaData?.find(item => item?.key?.includes('trained'))?.value}
              </Text>
            </View>
          )}
        </View>

        <FlatList
          scrollEnabled={false}
          data={groupedMeta?.slice(0, 3) || []}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => renderCollapsibleItem(item)}
        />

        <View style={styles.needview}>
          <Text style={styles.needtext}>Need Help? Get in Touch</Text>
          <Text style={styles.havetext}>
            Have questions about teaching and career opportunities?
          </Text>
        </View>

        <View style={styles.whatsview}>
          <TouchableOpacity
            onPress={() => openWhatsApp()}
            style={styles.whatsapp}>
            <Image source={require('../../../assets/otherApp/whatsapp.png')} />
            <Text style={styles.textnumber}>+91 915 330 01 11</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(`tel:${'+919056611064'}`).catch(err =>
                console.error('Error opening dialer:', err),
              );
            }}
            style={styles.call}>
            <Image source={require('../../../assets/otherApp/call.png')} />
            <Text style={styles.textnumber}>+91 905 661 10 64</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.firstimgview}>
          <Text style={styles.demotext}>Demo Lecture</Text>
          {metaData?.find(item => item?.key?.includes('lecture')) ? (
            <WebView
              source={{
                uri: getYouTubeEmbedUrl(
                  metaData?.find(item => item?.key?.includes('lecture'))?.value,
                ),
              }}
              style={styles.img1}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              allowsFullscreenVideo={true}
            />
          ) : (
            <Image
              source={
                CourceDetailA?.image
                  ? {uri: `${Imagepath.Path}${CourceDetailA?.image}`}
                  : require('../../../assets/image/Remedies/Image-not.png')
              }
              style={styles.img1}
            />
          )}
        </View>
        <FlatList
          scrollEnabled={false}
          data={groupedMeta?.slice(3, 6) || []}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => renderCollapsibleItem(item)}
        />

        <View style={styles.trainerview}>
          <Text style={styles.demotext}>Know Your Trainer</Text>
        </View>

        <View style={styles.knowview}>
          <View style={styles.acharyaview}>
            <Image
              source={
                CourceDetailA?.trainer?.image
                  ? {uri: `${Imagepath.Path}${CourceDetailA?.trainer?.image}`}
                  : require('../../../assets/otherApp/trainer.png')
              }
              style={styles.imgtrainer}
            />
          </View>

          <Text style={styles.acharya1}>
            {
              metaData?.find(item => item?.key?.includes('know_your_trainer'))
                ?.value
            }
          </Text>
        </View>

        <View style={styles.journeyview}>
          {/* <RenderHTML
            contentWidth={width}
            source={{
              html: CourceDetailA?.trainer?.description,
            }}
          /> */}
          <Text style={styles.journeytext}>
            {
              metaData?.find(item =>
                item?.key?.includes('know_your_trainer_description'),
              )?.value
            }
          </Text>
        </View>
        {CourceDetailA?.reviews ? (
          <View style={styles.courseview}>
            <Text style={styles.demotext}>Course Review By Student</Text>

            <FlatList
              data={CourceDetailA?.reviews}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => (
                <View
                  style={[
                    styles.imageContainer,
                    {
                      width:
                        CourceDetailA?.reviews?.length == 1
                          ? widthPrecent(90)
                          : widthPrecent(70),
                    },
                  ]}>
                  <WebView
                    source={{uri: item?.videos}}
                    style={styles.reviewImage}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    allowsFullscreenVideo={true}
                  />
                </View>
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={e => {
                const contentOffsetX = e.nativeEvent.contentOffset.x;
                const currentIndex = Math.round(
                  contentOffsetX / widthPrecent(70),
                );
                setCurrentIndex(currentIndex);
              }}
            />

            <View style={styles.dotContainer}>
              {CourceDetailA?.reviews?.map((_, index) => (
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
        ) : null}
        <View style={{marginTop: 15}}>
          <FlatList
            data={data1}
            numColumns={2}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </ScrollView>

      <View style={styles.scrollview}>
        <View style={styles.listItem}>
          <Text style={styles.listItemText}>{Detail1?.title}</Text>
          <Text style={[styles.listitem1]}>
            {`₹ ${Detail1?.variants?.[0]?.price}`}
          </Text>
        </View>
        <Animated.View
          style={[
            {
              transform: [{scale: buttonAnimatedValue}],
            },
          ]}>
          <TouchableOpacity
            onPress={() => handleJoinCourse()}
            style={styles.book}>
            <Text style={styles.btext1}>
              {coursetype ? 'Join Course' : 'Get An Instant Access Now'}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

export default CourseDetail;

const data1 = [
  {
    id: '1',
    icon: require('../../../assets/otherApp/trusted.png'),
    title: 'Trusted Content',
    description:
      'Content specially created to understand Vastu Techniques in easy way.',
  },
  {
    id: '2',
    icon: require('../../../assets/otherApp/trusted1.png'),
    title: 'Experienced Teachers',
    description:
      'Content specially created to understand Vastu Techniques in easy way.',
  },
  {
    id: '3',
    icon: require('../../../assets/otherApp/trusted2.png'),
    title: 'Lifetime Access',
    description:
      'Content specially created to understand Vastu Techniques in easy way.',
  },
  {
    id: '4',
    icon: require('../../../assets/otherApp/trusted3.png'),
    title: 'Certification',
    description:
      'Content specially created to understand Vastu Techniques in easy way.',
  },
];
