// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   FlatList,
//   Image,
//   TextInput,
// } from 'react-native';
// import React, {useEffect, useState} from 'react';
// import styles from './styles';

// import {colors} from '../../../Component/colors';
// import { CourceDetailApi, CourceLis } from '../../../Redux/Slice/HomeSlice';
// import { useDispatch, useSelector } from 'react-redux';
// import Loader from '../../../Component/Loader';
// import { useIsFocused } from '@react-navigation/native';
// import Imagepath from '../../../Component/Imagepath';
// import { widthPrecent } from '../../../Component/ResponsiveScreen/responsive';
// import AutoHeightImage from 'react-native-auto-height-image';

// const OtherCourses = ({navigation}) => {
//   const [isLiveCourse, setIsLiveCourse] = useState(true);
//   const Live_cource=useSelector(state=>state?.home?.Cource);
//   const isLoading = useSelector(state => state.home?.loading);
//   const focus = useIsFocused();
//  const  dispatch =useDispatch();
//   const CouseDetail1 =async(item)=>{

//     await dispatch(CourceDetailApi({url:'fetch-courses-details',course_id:item?.course_category_id,navigation}))
//   }

//     useEffect(() => {
//       if (focus) {
//         apicall();
//       }
//     }, [focus]);

//     const apicall = async () => {

//       await dispatch(CourceLis({url:'fetch-courses',slug:'live'}))
//     };
//   const LiveCourseData = [
//     {id: 1, image: require('../../../assets/otherApp/courseCard1.png')},
//     {id: 2, image: require('../../../assets/otherApp/courseCard1.png')},
//     {id: 3, image: require('../../../assets/otherApp/courseCard1.png')},
//     {id: 4, image: require('../../../assets/otherApp/courseCard1.png')},
//   ];
//   const RecordedCourseData = [
//     {id: 1, image: require('../../../assets/otherApp/courseCard2.png')},
//     {id: 2, image: require('../../../assets/otherApp/courseCard2.png')},
//     {id: 3, image: require('../../../assets/otherApp/courseCard2.png')},
//     {id: 4, image: require('../../../assets/otherApp/courseCard2.png')},
//   ];

//   const renderCard = ({item}) => {
//     return (
//       <View style={styles.card}>
//          <AutoHeightImage
//               source={ item.image == null
//                 ? require('../../../assets/otherApp/courseCard1.png')
//                 : { uri: `${Imagepath.Path}${item?.image}` }
//             }
//                width={widthPrecent(45)}
//               style={styles.cardImg}
//             />
//            {/* <Image
//           source={
//             item.image == null
//               ? require('../../../assets/otherApp/courseCard1.png')
//               : { uri: `${Imagepath.Path}${item?.image}` }
//           }
//           style={styles.cardImg}
//         /> */}

//         <View style={styles.cardInfo}>
//           <Text style={styles.DateText}>{item?.start_date}</Text>
//           <Text style={styles.titleText}>{item?.title}</Text>
//           <Text style={styles.regularText}>
//             While Vastu Shastra gives us data about our...
//           </Text>
//           <Text style={styles.price}>{`₹ ${item?.price}`}</Text>
//           <TouchableOpacity onPress={() => CouseDetail1(item)}>
//             <Text style={styles.cardBtn}>View Details</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   };
//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.openDrawer()}>
//           <Image source={require('../../../assets/image/Drawer.png')} />
//         </TouchableOpacity>
//         <Image source={require('../../../assets/image/header.png')} />
//         <TouchableOpacity
//          onPress={() => navigation.navigate('Home', {screen: 'MyCart'})}

//         style={styles.bagIcon}>
//           <Image source={require('../../../assets/image/Group.png')} />
//         </TouchableOpacity>
//       </View>
// {/ {isLoading?<Loader/>:null} /}
//       <ScrollView contentContainerStyle={styles.scroll}>
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

//         <View style={styles.switchBtnContainer}>
//           <TouchableOpacity
//             style={[
//               styles.switchBtn,
//              isLiveCourse ? styles.activeBtn : null,
//             ]}
//             disabled={isLiveCourse}
//             onPress={async() =>{
//               setIsLiveCourse(true);
//               await dispatch(CourceLis({url:'fetch-courses',slug:'live'}))
//             }

//            }>
//             <Text  style={[
//                 styles.switchText,
//                isLiveCourse ? {color: '#fff'} : null,
//               ]}>Live Course</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={[
//               styles.switchBtn,
//             !isLiveCourse? styles.activeBtn : null,
//             ]}
//             disabled={!isLiveCourse}
//              onPress={async() =>
//               {
//                 setIsLiveCourse(false);
//                 await dispatch(CourceLis({url:'fetch-courses',slug:'recorded'}))
//               }}>
//             <Text
//               style={[
//                 styles.switchText,
//                !isLiveCourse ? {color: '#fff'} : null,
//               ]}>
//               Recorded Courses
//             </Text>
//           </TouchableOpacity>
//         </View>
//         <FlatList
//           contentContainerStyle={styles.cardContainer}
//           data={ Live_cource?Live_cource:[] }
//           renderItem={renderCard}
//           // numColumns={2}
//         />
//       </ScrollView>

//     </View>
//   );
// };

// export default OtherCourses;
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';

import {colors} from '../../../Component/colors';
import {CourceDetailApi, CourceLis} from '../../../Redux/Slice/HomeSlice';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../../Component/Loader';
import {useIsFocused} from '@react-navigation/native';
import Imagepath from '../../../Component/Imagepath';
import {widthPrecent} from '../../../Component/ResponsiveScreen/responsive';
import AutoHeightImage from 'react-native-auto-height-image';
import AsyncStorage from '@react-native-async-storage/async-storage';
import style from '../HomeScreen/style';

const OtherCourses = ({navigation}) => {
  const [isLiveCourse, setIsLiveCourse] = useState(true);
  const [userType, setUserType] = useState('');
  const placeholderText = 'Search';
  const [displayedText, setDisplayedText] = useState('');
  const Live_cource = useSelector(state => state?.home?.Cource);
  const isLoading = useSelector(state => state.home?.loading);
  const cartTotalQuantity = useSelector(
    state => state?.cart?.cartTotalQuantity,
  );
  const focus = useIsFocused();
  const dispatch = useDispatch();
  const CouseDetail1 = async item => {
    await dispatch(
      CourceDetailApi({
        url: 'fetch-courses-details',
        course_id: item?.id,
        navigation,
        isLiveCourse,
      }),
    );
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

  const apicall = async () => {
    await dispatch(CourceLis({url: 'fetch-courses', slug: 'live'}));
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

  const renderCard = ({item}) => {
    return (
      <View style={styles.card}>
        <TouchableOpacity onPress={() => CouseDetail1(item)} style={{flex: 1}}>
          <Image
            source={
              item?.image == null
                ? require('../../../assets/image/Remedies/Image-not.png')
                : {uri: `${Imagepath.Path}${item?.image}`}
            }
            width={widthPrecent(45)}
            style={[
              styles.cardImg,
              {
                height:
                  imageHeights[item.id] || widthPrecent(isLiveCourse ? 45 : 25),
              },
            ]}
            onLoad={e => handleImageLoad(e, item.id)}
            resizeMode="cover"
          />

          <View style={styles.cardInfo}>
            {!isLiveCourse ? null : (
              <Text style={styles.DateText}>{item?.start_date}</Text>
            )}
            <Text style={styles.titleText}>{item?.title}</Text>
            <Text style={[styles.regularText,styles.shortDescription]}>
              {item?.short_description
                ? item?.short_description.length > 45
                  ? `${item?.short_description.substring(0, 45)}...`
                  : item?.short_description
                : ''}
            </Text>
            {/*  <Text style={styles.price}>{`₹ ${item?.price}`}</Text> */}
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

             <TouchableOpacity onPress={() => CouseDetail1(item)}> 
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
          <Image source={require('../../../assets/image/Group.png')} />
        </TouchableOpacity>
      </View>
      {/*  {isLoading ? <Loader /> : null} */}
      <ScrollView contentContainerStyle={styles.scroll}>
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
            style={[styles.switchBtn, !isLiveCourse ? styles.activeBtn : null]}
            disabled={!isLiveCourse}
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
        <FlatList
          contentContainerStyle={styles.cardContainer}
          data={Live_cource ? Live_cource : []}
          renderItem={renderCard}
          scrollEnabled={false}
          // numColumns={2}
        />
      </ScrollView>
    </View>
  );
};

export default OtherCourses;
