import {
  StyleSheet,
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
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Collapsible from 'react-native-collapsible';
import styles from './styles';
import {colors} from '../../../Component/colors';
import {useSelector} from 'react-redux';
import Imagepath from '../../../Component/Imagepath';
import {widthPrecent} from '../../../Component/ResponsiveScreen/responsive';
import RenderHTML from 'react-native-render-html';
import Video from 'react-native-video';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width} = Dimensions.get('window');

const CourseDetail = ({navigation}) => {
  const [userType, setUserType] = useState('');
  const CourceDetailA = useSelector(state => state?.home?.CourceDetailA);
  const isLoading = useSelector(state => state.home?.loading);
  const [videoPlay, setVideoPlay] = useState(true);
  const [videoState, setVideoState] = useState({
    isPlaying: true,
    controlsVisible: false,
  });
  const buttonAnimatedValue = useRef(new Animated.Value(1)).current;

  const images = [
    require('../../../assets/otherApp/reviewslider.png'),
    require('../../../assets/otherApp/reviewslider.png'),
    require('../../../assets/otherApp/reviewslider.png'),
    require('../../../assets/otherApp/reviewslider.png'),
    // Add more images as needed
  ];

  const dummyDatas = [
    {
      id: '1',
      title: 'Benefits to Join',
      subItems: [
        'Benefit 1: In-depth study of topic A',
        'Benefit 2: In-depth study of topic B',
        'Benefit 3: In-depth study of topic C',
      ],
    },
    {
      id: '2',
      title: 'Vastu Course Content',
      subItems: [
        'Topic 1: Introduction to Vastu',
        'Topic 2: Advanced Vastu Practices',
        'Topic 3: Practical Vastu Applications',
      ],
    },
    {
      id: '3',
      title: 'Numerology Course Content',
      subItems: [
        'Topic 1: Basics of Numerology',
        'Topic 2: Advanced Numerology Concepts',
        'Topic 3: Numerology Applications',
      ],
    },
  ];

  const dummyData = [
    {
      id: '1',
      title: 'Course Description',
      subItems: [
        '● : In-depth study of Five Elements.',
        '● : Understanding Control Cycles.',
        '● : Practical Applications.',
        '● : Practical Applications.',
        '● : Practical Applications.',
        '● : Practical Applications.',
        '● : Practical Applications.',
      ],
    },
    {
      id: '2',
      title: 'Numerology Expertise',
      subItems: ['Numerology Basics', 'Advanced Numerology Techniques'],
    },
    {
      id: '3',
      title: 'Rudraksha Science',
      subItems: ['Introduction to Rudraksha', 'Types and Significance'],
    },
  ];

  useEffect(() => {
    getUserType();
    // setVideoPlay(false
    setVideoState(prevState => ({
      ...prevState,
      isPlaying: false,
    }));
  }, []);

  const getUserType = async () => {
    const userStatus = await AsyncStorage.getItem('user_data');
    const userData = userStatus ? JSON.parse(userStatus) : null;
    const userType = userData?.user_type;
    setUserType(userType);
  };

  const toggleCollapsed = index => {
    setCollapsedStates(prevStates => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };
  const [currentIndex, setCurrentIndex] = useState(0);
  const [collapsedStates, setCollapsedStates] = useState(
    dummyData?.map(() => true),
  ); // Initialize all collapsed
  const handleImageChange = index => {
    setCurrentIndex(index);
  };

  const [expandedSection, setExpandedSection] = useState(null);
  const videoData = CourceDetailA?.demo_video
    ? JSON.parse(CourceDetailA.demo_video)
    : [];

  let videoFileName = null;

  // Find the video file or URL
  videoData.forEach(videoItem => {
    if (!videoFileName) {
      const fileItem = videoItem.find(
        item => item.key === 'file' && item.value !== null,
      );
      const urlItem = videoItem.find(
        item => item.key === 'url' && item.value !== null,
      );

      if (fileItem) {
        videoFileName = `${Imagepath.Path}${fileItem.value}`; // Prepend Imagepath for files
      } else if (urlItem) {
        videoFileName = urlItem.value; // Use URL directly
      }
    }
  });

  const videoDat = CourceDetailA?.course_video
    ? JSON.parse(CourceDetailA.course_video)
    : [];

  let videoFileName1 = null;

  // Find the video file or URL
  videoDat.forEach(videoItem => {
    if (!videoFileName1) {
      const fileItem = videoItem.find(
        item => item.key === 'file' && item.value !== null,
      );
      const urlItem = videoItem.find(
        item => item.key === 'url' && item.value !== null,
      );

      // If a file is found, assign its path with Imagepath
      if (fileItem) {
        videoFileName1 = `${Imagepath.Path}${fileItem.value}`; // Prepend Imagepath for files
      }
      // If a URL is found, assign the URL directly
      else if (urlItem) {
        videoFileName1 = urlItem.value;
      }
    }
  });

  // console.log(CourceDetailA, 'virendra sir....');

  const toggleSection = sectionId => {
    setExpandedSection(prevSection =>
      prevSection === sectionId ? null : sectionId,
    );
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
        navigation.navigate('PaymentCourse', {data1: CourceDetailA});
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

  const phoneNumber = '+919153300111';

  const openWhatsApp = async () => {
    const appUrl = `whatsapp://send?phone=${phoneNumber}`;
    const webUrl = `https://wa.me/${phoneNumber}`;

    try {
      // Check if WhatsApp is installed
      const supported = await Linking.canOpenURL(appUrl);
      if (supported) {
        console.log('appUrl ...', appUrl);
        await Linking.openURL(appUrl);
      } else {
        // Fallback to WhatsApp Web
        console.log('ghghdghdio', webUrl);

        await Linking.openURL(webUrl);
      }
    } catch (error) {
      // Handle errors
      Alert.alert('Error', 'Unable to open WhatsApp. Please try again later.');
      console.error('Failed to open WhatsApp:', error);
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
        <TouchableOpacity
        onPress={handleVideoPress}
        style={styles.firstimgview}>
          <Video
            source={{
              uri: videoFileName1,
            }}
            style={styles.img1}
            resizeMode="contain"
            controls={videoState.controlsVisible}
            paused={videoState.isPlaying}
            repeat={true}
            onError={error => console.error('Video Error:', error)} // Debug video errors
          />
          {/* <Image
            source={
              CourceDetailA?.image
                ? {uri: `${Imagepath.Path}${CourceDetailA?.image}`}
                : require('../../../assets/otherApp/coursedetail.png')
            }
            style={styles.img1}
            /> */}
        </TouchableOpacity>
        <View style={styles.advanceview}>
          <Text style={styles.advancetext}>{CourceDetailA?.title} </Text>
          {/* Advance Vastu Course */}

          <Text style={styles.learntext}>
            {CourceDetailA?.short_description != null
              ? CourceDetailA?.short_description
              : 'Learn The Most Effective Numero Vastu Techniques'}
          </Text>
          <View style={styles.direction}>
            {/* <Text style={styles.ruppestext}>{`₹ ${CourceDetailA?.price}`}</Text> */}
            <View style={{flexDirection: 'row', gap: 10}}>
              {userType &&
              (CourceDetailA?.sale_price < CourceDetailA?.price ||
                CourceDetailA?.student_price < CourceDetailA?.price ||
                CourceDetailA?.franchise_price < CourceDetailA?.price) &&
              (CourceDetailA?.sale_price ||
                CourceDetailA?.student_price ||
                CourceDetailA?.franchise_price) ? (
                <Text
                  style={[
                    styles.ruppestext,
                    {textDecorationLine: 'line-through', color: 'gray'},
                  ]}>
                  ₹ {CourceDetailA?.price}
                </Text>
              ) : null}

              <Text style={[styles.ruppestext]}>
                {`₹ ${
                  userType === 'customers' && CourceDetailA?.sale_price
                    ? CourceDetailA?.sale_price
                    : userType === 'student' && CourceDetailA?.student_price
                    ? CourceDetailA?.student_price
                    : userType === 'franchise' && CourceDetailA?.franchise_price
                    ? CourceDetailA?.franchise_price
                    : CourceDetailA?.price
                }`}
              </Text>
            </View>
            <Image
              source={require('../../../assets/otherApp/share.png')}
              style={styles.shareimage}
            />
          </View>
        </View>
        <View style={styles.horizontalLine} />
        {/* Card Component */}
        <View style={styles.card}>
          <View style={styles.cardItem}>
            <Image
              source={require('../../../assets/otherApp/cardimg1.png')}
              style={styles.cardimg1}
            />
            <Text style={styles.languagetext}>Languages</Text>
            {/* Hindi, English */}
            <Text style={styles.languagetext1}>{CourceDetailA?.language}</Text>
          </View>
          <View style={styles.verticalLine} />
          <View style={styles.cardItem}>
            <Image
              source={require('../../../assets/otherApp/cardimg1.png')}
              style={styles.cardimg1}
            />
            <Text style={styles.languagetext}>Date</Text>
            <Text style={styles.languagetext1}>
              {CourceDetailA?.start_date}
            </Text>
          </View>
          <View style={styles.verticalLine} />
          <View style={styles.cardItem}>
            <Image
              source={require('../../../assets/otherApp/cardimg1.png')}
              style={styles.cardimg1}
            />
            <Text style={styles.languagetext}>Time</Text>
            <Text style={styles.languagetext1}>6:40 to 8:30</Text>
          </View>
          <View style={styles.verticalLine} />
          <View style={styles.cardItem}>
            <Image
              source={require('../../../assets/otherApp/cardimg1.png')}
              style={styles.cardimg1}
            />
            <Text style={styles.languagetext}>Trained</Text>
            <Text style={styles.languagetext1}>2000+ Students</Text>
          </View>
        </View>

        <FlatList
          data={CourceDetailA?.desc_data?.filter(
            item => item.description !== null && item.label !== null,
          )}
          keyExtractor={item => item.desc_data_id.toString()}
          renderItem={({item, index}) => (
            <View style={styles.paddings}>
              <TouchableOpacity
                onPress={() => toggleSection(item.desc_data_id)}
                style={[
                  styles.courseToggle1,
                  expandedSection === item.desc_data_id &&
                    styles.activeCourseToggle,
                ]}>
                <View style={styles.direction1}>
                  <Text
                    style={[
                      styles.coursetext2,
                      expandedSection === item.desc_data_id &&
                        styles.activeTitleColor,
                    ]}>
                    {item.label}
                  </Text>
                </View>
                <Image
                  source={
                    expandedSection === item.desc_data_id
                      ? require('../../../assets/otherApp/updown1.png')
                      : require('../../../assets/image/arrow_icon.png')
                  }
                  style={[
                    styles.toggleIcon2,
                    // expandedSection !== item.desc_data_id
                    //   ? {resizeMode: 'contain'}
                    //   : null,
                  ]}
                />
              </TouchableOpacity>

              <Collapsible collapsed={expandedSection !== item.desc_data_id}>
                <View style={styles.subItemContainer}>
                  <RenderHTML
                    contentWidth={width}
                    source={{
                      html: item.description,
                    }}
                  />
                </View>
              </Collapsible>
            </View>
          )}
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
          <Video
            source={{
              uri: videoFileName,
            }}
            style={styles.img1}
            resizeMode="contain"
            controls={true}
            onError={error => console.error('Video Error:', error)} // Debug video errors
          />

          {/* <Image
            source={require('../../../assets/otherApp/coursedetail.png')}
            style={styles.img1}
            /> */}
        </View>
        <FlatList
          data={CourceDetailA?.desc_demo_data?.filter(
            item => item.description !== null && item.label !== null,
          )}
          keyExtractor={item => item?.desc_data_id.toString()}
          renderItem={({item, index}) => (
            <View style={styles.paddings}>
              <TouchableOpacity
                onPress={() => toggleSection(item.desc_data_id)}
                style={[
                  styles.courseToggle1,
                  expandedSection === item.desc_data_id &&
                    styles.activeCourseToggle,
                ]}>
                <View style={styles.direction1}>
                  <Text
                    style={[
                      styles.coursetext2,
                      expandedSection === item.desc_data_id &&
                        styles.activeTitleColor,
                    ]}>
                    {item.label}
                  </Text>
                </View>
                <Image
                  source={
                    expandedSection === item.desc_data_id
                      ? require('../../../assets/otherApp/updown1.png')
                      : require('../../../assets/image/arrow_icon.png')
                  }
                  style={[
                    styles.toggleIcon2,
                    // expandedSection !== item.desc_data_id
                    //   ? {resizeMode: 'contain'}
                    //   : null,
                  ]}
                />
              </TouchableOpacity>

              <Collapsible collapsed={expandedSection !== item.desc_data_id}>
                <View style={styles.subItemContainer}>
                  <RenderHTML
                    contentWidth={width}
                    source={{
                      html: item.description,
                    }}
                  />
                </View>
              </Collapsible>
            </View>
          )}
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
          <View>
            <Text style={styles.acharya}>{CourceDetailA?.trainer?.title}</Text>
            <Text style={styles.acharya1}>
              {CourceDetailA?.trainer?.subtitle}
            </Text>
          </View>
        </View>

        <View style={styles.journeyview}>
          <RenderHTML
            contentWidth={width}
            source={{
              html: CourceDetailA?.trainer?.description,
            }}
          />
          {/* <Text style={styles.journeytext}>
            His journey of occultism began in year 2012 which gradually acted as
            a gamechanger when he realized the potential of occult field.
            </Text>
            <Text style={styles.journeytext}>
            His journey of occultism began in year 2012 which gradually acted as
            a gamechanger when he realized the potential of occult field began
            in year 2012 which gradually acted as a gamechanger when he realized
            the potential of occult field.
            </Text>
            <Text style={styles.journeytext}>
            His journey of occultism began in year 2012 which gradually acted as
            a gamechanger when he realized the potential of occult field.
            </Text>
            <Text style={styles.journeytext}>
            His journey of occultism began in year 2012 which gradually acted as
            a gamechanger when he realized began in year 2012 which gradually
            acted as a gamechanger when he realized the potential of occult
            field the potential of occult field.
            </Text>
            <Text style={styles.journeytext}>
            His journey of occultism began in year 2012 which gradually acted as
            a gamechanger when he realized the potential of occult field.
            </Text>
            <Text style={styles.journeytext}>
            His journey of began in year 2012 which gradually acted as a
            gamechanger when he realized the potential of occult field occultism
            began in year 2012 which gradually acted as a gamechanger when he
            realized the potential of occult field.
            </Text> */}
        </View>
        <View style={styles.courseview}>
          <Text style={styles.demotext}>Course Review By Student</Text>

          <FlatList
            data={images}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
              <View style={styles.imageContainer}>
                <Image source={item} style={styles.reviewImage} />
              </View>
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={e => {
              const contentOffsetX = e.nativeEvent.contentOffset.x;
              const currentIndex = Math.round(
                contentOffsetX / widthPrecent(70),
              ); // Calculate index based on item width
              setCurrentIndex(currentIndex); // Update the current index state
            }}
          />

          <View style={styles.dotContainer}>
            {images.map((_, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.dot, currentIndex === index && styles.activeDot]}
                onPress={() => handleImageChange(index)}
              />
            ))}
          </View>
        </View>

        <View style={{marginTop: 15}}>
          <FlatList
            data={data1}
            numColumns={2} // Display items in 2 columns
            keyExtractor={item => item.id}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
        </View>

        <View style={styles.listItem}>
          <Text style={styles.listItemText}>{CourceDetailA?.title}</Text>
          {/* <Text style={styles.listitem1}>₹ {CourceDetailA.price}</Text> */}
          {/* {userType &&
          (CourceDetailA?.sale_price < CourceDetailA?.price ||
          CourceDetailA?.student_price < CourceDetailA?.price ||
            CourceDetailA?.franchise_price < CourceDetailA?.price) &&
            (CourceDetailA?.sale_price ||
            CourceDetailA?.student_price ||
            CourceDetailA?.franchise_price) ? (
              <Text
              style={[
                styles.listitem1,
                {textDecorationLine: 'line-through', color: 'gray'},
                ]}>
                ₹ {CourceDetailA?.price}
                </Text>
                ) : null} */}{' '}
          <Text style={[styles.listitem1]}>
            {`₹ ${
              userType === 'customers' && CourceDetailA?.sale_price
                ? CourceDetailA?.sale_price
                : userType === 'student' && CourceDetailA?.student_price
                ? CourceDetailA?.student_price
                : userType === 'franchise' && CourceDetailA?.franchise_price
                ? CourceDetailA?.franchise_price
                : CourceDetailA?.price
            }`}
          </Text>
        </View>
        <Animated.View
          style={[
            {
              transform: [{scale: buttonAnimatedValue}], // स्केल एनिमेशन
            },
          ]}>
          <TouchableOpacity onPress={handleJoinCourse} style={styles.book}>
            <Text style={styles.btext1}>Join Course</Text>
          </TouchableOpacity>
        </Animated.View>
        {/* <TouchableOpacity
          onPress={() => {
            userType
            ? navigation.navigate('PaymentCourse', {data1: CourceDetailA})
            : navigation.navigate('Login', {from: 'CourseDetails'});
            }}
            style={styles.book}>
            <Text style={styles.btext1}>Join Course</Text>
            </TouchableOpacity> */}
      </ScrollView>
    </View>
  );
};

export default CourseDetail;

const data1 = [
  {
    id: '1',
    icon: require('../../../assets/otherApp/trusted.png'), // Replace with actual icon
    title: 'Trusted Content',
    description:
      'Content specially created to understand Vastu Techniques in easy way.',
  },
  {
    id: '2',
    icon: require('../../../assets/otherApp/trusted1.png'), // Replace with actual icon
    title: 'Experienced Teachers',
    description:
      'Content specially created to understand Vastu Techniques in easy way.',
  },
  {
    id: '3',
    icon: require('../../../assets/otherApp/trusted2.png'), // Replace with actual icon
    title: 'Lifetime Access',
    description:
      'Content specially created to understand Vastu Techniques in easy way.',
  },
  {
    id: '4',
    icon: require('../../../assets/otherApp/trusted3.png'), // Replace with actual icon
    title: 'Certification',
    description:
      'Content specially created to understand Vastu Techniques in easy way.',
  },
];
