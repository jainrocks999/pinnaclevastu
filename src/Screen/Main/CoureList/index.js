import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  FlatList,
} from 'react-native';
import React from 'react';
import styles from './styles';
import {colors} from '../../../Component/colors';
import { heightPercent } from '../../../Component/ResponsiveScreen/responsive';


const CoureList = ({navigation}) => {
  const myCourseData = [
    {id: 1, image: require('../../../assets/otherApp/courseCard1.png')},
    {id: 2, image: require('../../../assets/otherApp/courseCard2.png')},
    {id: 3, image: require('../../../assets/otherApp/courseCard1.png')},
    {id: 4, image: require('../../../assets/otherApp/courseCard2.png')},
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity  
        //  onPress={() =>
        //     navigation.reset({
        //       index: 0,
        //       routes: [{name: 'UserProfile'}],
        //     })}
         onPress={() => navigation.goBack()}
          >
          <Image
            style={styles.backBtn}
            source={require('../../../assets/drawer/Back1.png')}
          />
        </TouchableOpacity>

        <View style={styles.headerview}>
          <Text style={styles.logoText}>My Courses</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={{margin: 20, paddingBottom:heightPercent(8)}}>
        <View style={styles.searchContainer}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image source={require('../../../assets/image/SearchIcon.png')} />
            <TextInput
              placeholder="Search..."
              style={styles.searchInput}
              placeholderTextColor={colors.searchBarTextColor}
            />
          </View>
        </View>
        <Text style={[styles.headingText, {marginVertical: 8}]}>
          Continue Learning
        </Text>

        <FlatList
          contentContainerStyle={{
            gap: 10,
          }}
          data={myCourseData}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('CourceListDownload')}
              style={styles.card}>
              <View style={styles.cardInfo}>
                <Text style={styles.headingText}>Advance Vastu Course</Text>
                <Text style={styles.dateText}>
                  Date: <Text style={styles.smallText}>20 Nov 2024</Text>
                </Text>
                <View style={styles.progressSection}>
                  <View style={styles.prograssbarContainer}>
                    <View style={[styles.prograss, {width: '30%'}]}></View>
                  </View>
                  <Text style={styles.lightText}>30%</Text>
                </View>
              </View>

              <Image style={styles.cardImg} source={item.image} />
            </TouchableOpacity>
          )}
        />
        <View style={styles.cardContainer}></View>
      </ScrollView>
 
    </View>
  );
};

export default CoureList;
