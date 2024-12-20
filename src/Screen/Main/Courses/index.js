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
import { CourceDetailApi, CourceLis } from '../../../Redux/Slice/HomeSlice';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../Component/Loader';
import { useIsFocused } from '@react-navigation/native';
import Imagepath from '../../../Component/Imagepath';
import { widthPrecent } from '../../../Component/ResponsiveScreen/responsive';
import AutoHeightImage from 'react-native-auto-height-image';

const OtherCourses = ({navigation}) => {
  const [isLiveCourse, setIsLiveCourse] = useState(true);
  const Live_cource=useSelector(state=>state?.home?.Cource);
  const isLoading = useSelector(state => state.home?.loading);
  const focus = useIsFocused();
 const  dispatch =useDispatch();
  const CouseDetail1 =async(item)=>{
  
    await dispatch(CourceDetailApi({url:'fetch-courses-details',course_id:item?.course_category_id,navigation}))
  }
  
  
    useEffect(() => {
      if (focus) {
        apicall();
      }
    }, [focus]);
  
    const apicall = async () => {
     
      await dispatch(CourceLis({url:'fetch-courses',slug:'live'}))
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

  const renderCard = ({item}) => {
    return (
      <View style={styles.card}>
         {/* <AutoHeightImage
              source={ item.image == null 
                ? require('../../../assets/otherApp/courseCard1.png') 
                : { uri: `${Imagepath.Path}${item?.image}` }
            } 
               width={widthPrecent(45)}
              style={styles.cardImg}
            />  */}
           <Image 
          source={
            item.image == null 
              ? require('../../../assets/otherApp/courseCard1.png') 
              : { uri: `${Imagepath.Path}${item?.image}` }
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
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image source={require('../../../assets/image/Drawer.png')} />
        </TouchableOpacity>
        <Image source={require('../../../assets/image/header.png')} />
        <TouchableOpacity 
         onPress={() => navigation.navigate('Home', {screen: 'MyCart'})}
        
        style={styles.bagIcon}>
          <Image source={require('../../../assets/image/Group.png')} />
        </TouchableOpacity>
      </View>
{isLoading?<Loader/>:null}
      <ScrollView contentContainerStyle={styles.scroll}>
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

        <View style={styles.switchBtnContainer}>
          <TouchableOpacity
            style={[
              styles.switchBtn,
             isLiveCourse ? styles.activeBtn : null,
            ]}
            disabled={isLiveCourse}
            onPress={async() =>{
              setIsLiveCourse(true);
              await dispatch(CourceLis({url:'fetch-courses',slug:'live'}))
            }
            
           }>
            <Text  style={[
                styles.switchText,
               isLiveCourse ? {color: '#fff'} : null,
              ]}>Live Course</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.switchBtn,
            !isLiveCourse? styles.activeBtn : null,
            ]}
            disabled={!isLiveCourse}
             onPress={async() => 
              {
                setIsLiveCourse(false);
                await dispatch(CourceLis({url:'fetch-courses',slug:'recorded'}))
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
          data={ Live_cource?Live_cource:[] }
          renderItem={renderCard}
          // numColumns={2}
        />
      </ScrollView>
   
    </View>
  );
};

export default OtherCourses;
