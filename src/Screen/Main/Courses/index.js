import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';

import {colors} from '../../../Component/colors';

const OtherCourses = ({navigation}) => {
  const [isLiveCourse, setIsLiveCourse] = useState(true);

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
        <Image source={item.image} style={styles.cardImg} />
        <View style={styles.cardInfo}>
          <Text style={styles.DateText}>20 Nov 2024</Text>
          <Text style={styles.titleText}>ADVANCE VASTU COURSE</Text>
          <Text style={styles.regularText}>
            While Vastu Shastra gives us data about our...
          </Text>
          <Text style={styles.price}>₹ 7250.00</Text>
          <TouchableOpacity onPress={() => navigation.navigate('CourseDetail')}>
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
        <TouchableOpacity style={styles.bagIcon}>
          <Image source={require('../../../assets/image/Group.png')} />
        </TouchableOpacity>
      </View>

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
            onPress={() => setIsLiveCourse(true )}>
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
            onPress={() => setIsLiveCourse(false)}>
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
          data={isLiveCourse ? LiveCourseData : RecordedCourseData}
          renderItem={renderCard}
          // numColumns={2}
        />
      </ScrollView>
   
    </View>
  );
};

export default OtherCourses;
